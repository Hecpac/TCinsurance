#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { chromium } from "playwright";

function parseArgs(argv) {
  /** @type {Record<string, string | boolean>} */
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const raw = argv[i];
    if (!raw.startsWith("--")) continue;

    const trimmed = raw.slice(2);
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex !== -1) {
      const key = trimmed.slice(0, eqIndex);
      const value = trimmed.slice(eqIndex + 1);
      args[key] = value;
      continue;
    }

    const key = trimmed;
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i++;
      continue;
    }

    args[key] = true;
  }
  return args;
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate()),
    "-",
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds()),
  ].join("");
}

function routeToFileStem(route) {
  if (route === "/") return "home";
  return route
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .replaceAll("/", "__")
    .replaceAll("?", "_")
    .replaceAll("=", "_")
    .replaceAll("&", "_");
}

function toMarkdownCode(text) {
  return String(text ?? "").replaceAll("`", "\\`");
}

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

          const scrolledToBottom =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;

          if (scrolledToBottom || steps >= maxSteps) {
            window.clearInterval(timer);
            resolve(true);
          }
        }, delay);
      });
    })
    .catch(() => {});
}

async function getAxeSource() {
  const mod = await import("axe-core");
  // axe-core is CJS; depending on Node settings, it may show up under default.
  return mod?.source ?? mod?.default?.source ?? null;
}

const args = parseArgs(process.argv);

const baseUrl =
  (typeof args["base-url"] === "string" && args["base-url"]) ||
  process.env.BASE_URL ||
  "http://localhost:3000";

const paths =
  typeof args.paths === "string"
    ? args.paths.split(",").map((p) => p.trim())
    : [
        "/",
        "/servicios",
        "/sobre-mi",
        "/blog",
        "/blog/gastos-finales-arquitectura-financiera",
        "/privacidad",
        "/terminos",
      ];

const outRoot =
  (typeof args["out-dir"] === "string" && args["out-dir"]) ||
  path.join(process.cwd(), "output", "playwright", `audit-${nowStamp()}`);

const headless = args.headed ? false : true;

await fs.mkdir(outRoot, { recursive: true });

const axeSource = await getAxeSource();
if (!axeSource) {
  console.error("No se pudo cargar axe-core (axeSource).");
  process.exitCode = 1;
  process.exit();
}

/** @type {Array<any>} */
const results = [];

const browser = await chromium.launch({ headless });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});

await context.addInitScript(axeSource);

try {
  for (const route of paths) {
    const url = new URL(route, baseUrl).toString();
    const page = await context.newPage();

    /** @type {Array<any>} */
    const consoleMessages = [];
    /** @type {Array<any>} */
    const pageErrors = [];
    /** @type {Array<any>} */
    const requestFailures = [];
    /** @type {Array<any>} */
    const badResponses = [];
    /** @type {{count: number, totalContentLength: number}} */
    const networkSummary = { count: 0, totalContentLength: 0 };

    page.on("console", (msg) => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
      });
    });
    page.on("pageerror", (err) => {
      pageErrors.push({ message: String(err?.message ?? err) });
    });
    page.on("requestfailed", (req) => {
      requestFailures.push({
        url: req.url(),
        type: req.resourceType(),
        errorText: req.failure()?.errorText ?? "unknown",
      });
    });
    page.on("response", (res) => {
      networkSummary.count++;
      const len = res.headers()["content-length"];
      if (len) {
        const parsed = Number.parseInt(len, 10);
        if (Number.isFinite(parsed)) networkSummary.totalContentLength += parsed;
      }
      if (res.status() >= 400) {
        badResponses.push({
          url: res.url(),
          status: res.status(),
          type: res.request().resourceType(),
        });
      }
    });

    const start = Date.now();
    let mainStatus = null;
    let mainFinalUrl = url;
    try {
      const mainResponse = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      mainStatus = mainResponse?.status?.() ?? null;
      mainFinalUrl = page.url();
      await page.waitForLoadState("load", { timeout: 60_000 }).catch(() => {});
      await page
        .waitForLoadState("networkidle", { timeout: 15_000 })
        .catch(() => {});
    } catch (err) {
      pageErrors.push({ message: `Navigation error: ${String(err)}` });
    }
    const durationMs = Date.now() - start;

    await scrollPageToBottom(page);
    await page
      .waitForLoadState("networkidle", { timeout: 10_000 })
      .catch(() => {});
    await page.waitForTimeout(300).catch(() => {});

    const seo = await page.evaluate(() => {
      const title = (document.title || "").trim();
      const description = (
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
        document.querySelector('meta[name="viewport"]')?.getAttribute("content") ||
        ""
      ).trim();
      const h1Count = document.querySelectorAll("h1").length;
      return { title, description, canonical, lang, viewport, h1Count };
    });

    const contentChecks = await page.evaluate(() => {
      const imagesMissingAlt = Array.from(document.querySelectorAll("img")).filter(
        (img) => !img.hasAttribute("alt"),
      ).length;

      const linksWithoutName = Array.from(document.querySelectorAll("a")).filter(
        (a) => {
          const text = (a.textContent || "").trim();
          const ariaLabel = (a.getAttribute("aria-label") || "").trim();
          const title = (a.getAttribute("title") || "").trim();
          const imgAlt = (a.querySelector("img")?.getAttribute("alt") || "").trim();
          return !text && !ariaLabel && !title && !imgAlt;
        },
      ).length;

      const buttonsWithoutName = Array.from(
        document.querySelectorAll("button"),
      ).filter((b) => {
        const text = (b.textContent || "").trim();
        const ariaLabel = (b.getAttribute("aria-label") || "").trim();
        const title = (b.getAttribute("title") || "").trim();
        return !text && !ariaLabel && !title;
      }).length;

      const inputsWithoutLabel = Array.from(
        document.querySelectorAll("input, textarea, select"),
      ).filter((el) => {
        const ariaLabel = (el.getAttribute("aria-label") || "").trim();
        const ariaLabelledBy = (el.getAttribute("aria-labelledby") || "").trim();
        if (ariaLabel || ariaLabelledBy) return false;
        const id = (el.getAttribute("id") || "").trim();
        if (!id) return true;
        const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
        return !label;
      }).length;

      return {
        imagesMissingAlt,
        linksWithoutName,
        buttonsWithoutName,
        inputsWithoutLabel,
      };
    });

    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const paints = performance
        .getEntriesByType("paint")
        .map((p) => ({ name: p.name, startTime: p.startTime }));
      if (!nav) return { nav: null, paints };
      // NavigationTiming has many fields; pick a small stable subset.
      return {
        nav: {
          duration: nav.duration,
          domContentLoaded: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd,
          responseEnd: nav.responseEnd,
          transferSize: nav.transferSize,
        },
        paints,
      };
    });

    const axe = await page.evaluate(async () => {
      // @ts-expect-error runtime axe is injected in browser context
      if (!window.axe) return { error: "axe_not_loaded" };
      // @ts-expect-error runtime axe typing is not available in this file
      const res = await window.axe.run(document, { resultTypes: ["violations"] });
      return {
        url: document.location.href,
        violations: res.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          help: v.help,
          helpUrl: v.helpUrl,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            html: n.html,
            failureSummary: n.failureSummary,
          })),
        })),
      };
    });

    const fileStem = routeToFileStem(route);
    const screenshotPath = path.join(outRoot, `${fileStem}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
    await page.close();

    results.push({
      route,
      url,
      finalUrl: mainFinalUrl,
      status: mainStatus,
      durationMs,
      seo,
      contentChecks,
      timing,
      networkSummary,
      consoleMessages,
      pageErrors,
      requestFailures,
      badResponses,
      axe,
      artifacts: { screenshot: path.relative(process.cwd(), screenshotPath) },
    });
  }
} finally {
  await context.close().catch(() => {});
  await browser.close().catch(() => {});
}

const auditJsonPath = path.join(outRoot, "audit.json");
await fs.writeFile(auditJsonPath, JSON.stringify({ baseUrl, results }, null, 2));

function countAxeViolations(pageResult) {
  if (!pageResult?.axe?.violations) return 0;
  return pageResult.axe.violations.length;
}

function groupTopAxeViolations(allResults) {
  /** @type {Map<string, {id: string, impact: string | null, count: number, nodes: number, pages: Set<string>}>} */
  const map = new Map();
  for (const r of allResults) {
    for (const v of r?.axe?.violations ?? []) {
      const current = map.get(v.id) ?? {
        id: v.id,
        impact: v.impact ?? null,
        count: 0,
        nodes: 0,
        pages: new Set(),
      };
      current.count += 1;
      current.nodes += (v.nodes?.length ?? 0);
      current.pages.add(r.route);
      map.set(v.id, current);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.nodes - a.nodes);
}

const pagesWithConsoleErrors = results.filter((r) =>
  (r.consoleMessages ?? []).some((m) => m.type === "error"),
);
const pagesWithBadResponses = results.filter((r) => (r.badResponses ?? []).length);
const pagesWithRequestFailures = results.filter(
  (r) => (r.requestFailures ?? []).length,
);
const topAxe = groupTopAxeViolations(results).slice(0, 10);

const mdLines = [];
mdLines.push(`# Auditoría (Playwright)`);
mdLines.push(``);
mdLines.push(`- Base URL: \`${toMarkdownCode(baseUrl)}\``);
mdLines.push(`- Output: \`${toMarkdownCode(path.relative(process.cwd(), outRoot))}\``);
mdLines.push(`- Páginas auditadas: **${results.length}**`);
mdLines.push(
  `- Con errores en consola: **${pagesWithConsoleErrors.length}** | Con respuestas 4xx/5xx: **${pagesWithBadResponses.length}** | Con fallos de request: **${pagesWithRequestFailures.length}**`,
);
mdLines.push(``);

mdLines.push(`## Resumen por página`);
mdLines.push(``);
for (const r of results) {
  const axeCount = countAxeViolations(r);
  const consoleErrs = (r.consoleMessages ?? []).filter((m) => m.type === "error")
    .length;
  const bad = (r.badResponses ?? []).length;
  const reqFail = (r.requestFailures ?? []).length;
  mdLines.push(
    `- \`${toMarkdownCode(r.route)}\` (status: ${r.status ?? "?"}, ${r.durationMs}ms) | axe: ${axeCount} | console errors: ${consoleErrs} | 4xx/5xx: ${bad} | req failed: ${reqFail}`,
  );
}
mdLines.push(``);

if (topAxe.length) {
  mdLines.push(`## Accesibilidad (top violaciones)`);
  mdLines.push(``);
  for (const v of topAxe) {
    mdLines.push(
      `- \`${toMarkdownCode(v.id)}\` (impact: ${toMarkdownCode(v.impact ?? "n/a")}) | nodos: ${v.nodes} | páginas: ${Array.from(v.pages).join(", ")}`,
    );
  }
  mdLines.push(``);
}

const seoIssues = [];
for (const r of results) {
  const issues = [];
  if (!r.seo?.title) issues.push("sin title");
  if (!r.seo?.description) issues.push("sin meta description");
  if (!r.seo?.lang) issues.push("sin lang en <html>");
  if (!r.seo?.viewport) issues.push("sin meta viewport");
  if (typeof r.seo?.h1Count === "number" && r.seo.h1Count !== 1)
    issues.push(`h1Count=${r.seo.h1Count}`);
  if (issues.length) seoIssues.push({ route: r.route, issues });
}

if (seoIssues.length) {
  mdLines.push(`## SEO/estructura`);
  mdLines.push(``);
  for (const s of seoIssues) {
    mdLines.push(
      `- \`${toMarkdownCode(s.route)}\`: ${s.issues.map(toMarkdownCode).join(", ")}`,
    );
  }
  mdLines.push(``);
}

const contentIssues = results
  .map((r) => ({
    route: r.route,
    ...r.contentChecks,
  }))
  .filter(
    (r) =>
      r.imagesMissingAlt ||
      r.linksWithoutName ||
      r.buttonsWithoutName ||
      r.inputsWithoutLabel,
  );

if (contentIssues.length) {
  mdLines.push(`## Contenido/semántica`);
  mdLines.push(``);
  for (const c of contentIssues) {
    mdLines.push(
      `- \`${toMarkdownCode(c.route)}\`: img sin alt=${c.imagesMissingAlt}, links sin nombre=${c.linksWithoutName}, botones sin nombre=${c.buttonsWithoutName}, inputs sin label=${c.inputsWithoutLabel}`,
    );
  }
  mdLines.push(``);
}

if (pagesWithConsoleErrors.length) {
  mdLines.push(`## Errores de consola (muestra)`);
  mdLines.push(``);
  for (const r of pagesWithConsoleErrors.slice(0, 5)) {
    const first = (r.consoleMessages ?? []).find((m) => m.type === "error");
    if (!first) continue;
    mdLines.push(
      `- \`${toMarkdownCode(r.route)}\`: ${toMarkdownCode(first.text).slice(0, 200)}`,
    );
  }
  mdLines.push(``);
}

if (pagesWithBadResponses.length || pagesWithRequestFailures.length) {
  mdLines.push(`## Network (muestra)`);
  mdLines.push(``);
  for (const r of results) {
    const bad = (r.badResponses ?? []).slice(0, 3);
    const fails = (r.requestFailures ?? []).slice(0, 3);
    if (!bad.length && !fails.length) continue;
    mdLines.push(`- \`${toMarkdownCode(r.route)}\``);
    for (const b of bad) {
      mdLines.push(
        `  - 4xx/5xx: ${b.status} ${toMarkdownCode(b.type)} ${toMarkdownCode(b.url)}`,
      );
    }
    for (const f of fails) {
      mdLines.push(
        `  - failed: ${toMarkdownCode(f.type)} ${toMarkdownCode(f.errorText)} ${toMarkdownCode(f.url)}`,
      );
    }
  }
  mdLines.push(``);
}

const auditMdPath = path.join(outRoot, "audit.md");
await fs.writeFile(auditMdPath, mdLines.join("\n"));

console.log(`OK: Reporte generado`);
console.log(`- ${path.relative(process.cwd(), auditMdPath)}`);
console.log(`- ${path.relative(process.cwd(), auditJsonPath)}`);
