#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { chromium } from "playwright";

/* ------------------------------------------------------------------ */
/*  CLI arg parsing (same pattern as playwright-audit.mjs)            */
/* ------------------------------------------------------------------ */

function parseArgs(argv) {
  /** @type {Record<string, string | boolean>} */
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const raw = argv[i];
    if (!raw.startsWith("--")) continue;
    const trimmed = raw.slice(2);
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex !== -1) {
      args[trimmed.slice(0, eqIndex)] = trimmed.slice(eqIndex + 1);
      continue;
    }
    const key = trimmed;
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i++;
    } else {
      args[key] = true;
    }
  }
  return args;
}

function todayStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* ------------------------------------------------------------------ */
/*  Scroll helper (reused from playwright-audit.mjs)                  */
/* ------------------------------------------------------------------ */

async function scrollPageToBottom(page) {
  await page
    .evaluate(async () => {
      await new Promise((resolve) => {
        const distance = 600;
        const delay = 25;
        const maxSteps = 220;
        let steps = 0;
        const timer = window.setInterval(() => {
          window.scrollBy(0, distance);
          steps++;
          const atBottom =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;
          if (atBottom || steps >= maxSteps) {
            window.clearInterval(timer);
            resolve(true);
          }
        }, delay);
      });
    })
    .catch(() => {});
}

/* ------------------------------------------------------------------ */
/*  Sitemap fetching                                                  */
/* ------------------------------------------------------------------ */

async function fetchSitemapUrls(baseUrl) {
  const sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    console.warn(`Could not fetch sitemap at ${sitemapUrl} (${res.status})`);
    return [];
  }
  const xml = await res.text();
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

/* ------------------------------------------------------------------ */
/*  Per-page SEO data extraction                                      */
/* ------------------------------------------------------------------ */

async function extractPageData(page, url, baseUrl) {
  const consoleErrors = [];
  const networkFailures = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("requestfailed", (req) => {
    networkFailures.push({
      url: req.url(),
      error: req.failure()?.errorText ?? "unknown",
    });
  });

  const start = Date.now();
  let statusCode = null;

  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    statusCode = response?.status() ?? null;
    await page.waitForLoadState("load", { timeout: 30_000 }).catch(() => {});
    await page
      .waitForLoadState("networkidle", { timeout: 15_000 })
      .catch(() => {});
  } catch (err) {
    consoleErrors.push(`Navigation error: ${String(err)}`);
  }

  const loadTime = Date.now() - start;

  // Scroll to trigger lazy-loaded content
  await scrollPageToBottom(page);
  await page.waitForTimeout(300).catch(() => {});

  // Collect known internal origins: the crawl base + the production URL from canonical/OG
  const productionOrigin = await page.evaluate(() => {
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute("content") || "";
    const href = canonical || ogUrl;
    try { return new URL(href).origin; } catch { return null; }
  });

  const internalOrigins = [new URL(baseUrl).origin];
  if (productionOrigin && !internalOrigins.includes(productionOrigin)) {
    internalOrigins.push(productionOrigin);
  }

  const data = await page.evaluate((origins) => {
    // --- Meta ---
    const title = (document.title || "").trim();
    const metaDescription = (
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || ""
    ).trim();
    const canonical = (
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
      ""
    ).trim();
    const lang = (document.documentElement.getAttribute("lang") || "").trim();
    const viewport = (
      document
        .querySelector('meta[name="viewport"]')
        ?.getAttribute("content") || ""
    ).trim();
    const robots = (
      document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content") || ""
    ).trim();

    // --- Headings ---
    const headings = {};
    for (const level of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
      const els = document.querySelectorAll(level);
      headings[level] = Array.from(els).map((el) => el.textContent.trim());
    }

    // --- Links ---
    const internalLinks = [];
    const externalLinks = [];
    for (const a of document.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim().slice(0, 100);
      try {
        const resolved = new URL(href, document.location.href);
        if (origins.includes(resolved.origin)) {
          internalLinks.push({
            href: resolved.pathname + resolved.search + resolved.hash,
            text,
          });
        } else {
          externalLinks.push({ href: resolved.href, text });
        }
      } catch {
        // relative or malformed
        internalLinks.push({ href, text });
      }
    }

    // --- Images ---
    const images = Array.from(document.querySelectorAll("img")).map((img) => ({
      src: img.getAttribute("src") || "",
      alt: img.getAttribute("alt"),
      hasAlt: img.hasAttribute("alt"),
      isNextImage:
        img.hasAttribute("data-nimg") ||
        img.closest("[data-nimg]") !== null,
      width: img.naturalWidth || null,
      height: img.naturalHeight || null,
    }));

    // --- Structured Data ---
    const structuredData = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    ).map((script) => {
      try {
        return JSON.parse(script.textContent || "");
      } catch {
        return { _parseError: true, raw: (script.textContent || "").slice(0, 500) };
      }
    });

    // --- Word count (visible text) ---
    const bodyText = (document.body?.innerText || "").trim();
    const wordCount = bodyText
      ? bodyText.split(/\s+/).filter((w) => w.length > 0).length
      : 0;

    // --- OG / Twitter meta ---
    const ogTitle = document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content") || "";
    const ogDescription = document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content") || "";
    const ogImage = document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content") || "";
    const ogType = document
      .querySelector('meta[property="og:type"]')
      ?.getAttribute("content") || "";
    const twitterCard = document
      .querySelector('meta[name="twitter:card"]')
      ?.getAttribute("content") || "";

    return {
      title,
      metaDescription,
      canonical,
      lang,
      viewport,
      robots,
      headings,
      internalLinks,
      externalLinks,
      images,
      structuredData,
      wordCount,
      og: { title: ogTitle, description: ogDescription, image: ogImage, type: ogType },
      twitter: { card: twitterCard },
    };
  }, internalOrigins);

  // --- Performance timing ---
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paints = performance
      .getEntriesByType("paint")
      .map((p) => ({ name: p.name, startTime: Math.round(p.startTime) }));
    if (!nav) return { fcp: null, lcp: null, totalLoad: null, paints };

    const fcp = paints.find((p) => p.name === "first-contentful-paint");
    return {
      fcp: fcp ? fcp.startTime : null,
      lcp: null, // LCP requires PerformanceObserver, approximated by loadEventEnd
      totalLoad: Math.round(nav.loadEventEnd),
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
      transferSize: nav.transferSize ?? null,
      paints,
    };
  });

  const urlPath = new URL(url).pathname;

  return {
    url: urlPath,
    fullUrl: url,
    statusCode,
    ...data,
    timing: { ...timing, wallClockLoadMs: loadTime },
    consoleErrors,
    networkFailures,
  };
}

/* ------------------------------------------------------------------ */
/*  Main                                                              */
/* ------------------------------------------------------------------ */

const args = parseArgs(process.argv);

const baseUrl = args.localhost
  ? "http://localhost:3000"
  : typeof args.url === "string"
    ? args.url
    : "http://localhost:3000";

const outputDir =
  typeof args.output === "string"
    ? args.output
    : path.join(process.cwd(), "docs", "seo", "data");

await fs.mkdir(outputDir, { recursive: true });

console.log(`SEO Crawl starting...`);
console.log(`  Base URL: ${baseUrl}`);
console.log(`  Output:   ${outputDir}`);

// Fetch URLs from sitemap
const sitemapUrls = await fetchSitemapUrls(baseUrl);
if (!sitemapUrls.length) {
  console.error("No URLs found in sitemap. Falling back to homepage only.");
  sitemapUrls.push(new URL("/", baseUrl).toString());
}

console.log(`  Pages to crawl: ${sitemapUrls.length}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});

const pages = [];

try {
  for (const url of sitemapUrls) {
    const page = await context.newPage();
    const shortPath = new URL(url).pathname;
    process.stdout.write(`  Crawling ${shortPath} ... `);

    try {
      const pageData = await extractPageData(page, url, baseUrl);
      pages.push(pageData);
      console.log(
        `OK (${pageData.statusCode}, ${pageData.wordCount} words, ${pageData.timing.wallClockLoadMs}ms)`
      );
    } catch (err) {
      console.log(`ERROR: ${String(err).slice(0, 100)}`);
      pages.push({
        url: shortPath,
        fullUrl: url,
        statusCode: null,
        error: String(err),
      });
    }

    await page.close();
  }
} finally {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});
}

// Build summary stats
const totalPages = pages.length;
const pagesWithErrors = pages.filter((p) => p.consoleErrors?.length > 0).length;
const pagesWithMissingAlt = pages.filter(
  (p) => p.images?.some((img) => !img.hasAlt)
).length;
const pagesWithoutH1 = pages.filter(
  (p) => !p.headings?.h1?.length
).length;
const pagesWithMultipleH1 = pages.filter(
  (p) => (p.headings?.h1?.length ?? 0) > 1
).length;

const crawlData = {
  crawlDate: new Date().toISOString(),
  baseUrl,
  summary: {
    totalPages,
    pagesWithErrors,
    pagesWithMissingAlt,
    pagesWithoutH1,
    pagesWithMultipleH1,
  },
  pages,
};

const outputFile = path.join(outputDir, `crawl-${todayStamp()}.json`);
await fs.writeFile(outputFile, JSON.stringify(crawlData, null, 2));

console.log(`\nCrawl complete!`);
console.log(`  Pages crawled: ${totalPages}`);
console.log(`  Output: ${path.relative(process.cwd(), outputFile)}`);
