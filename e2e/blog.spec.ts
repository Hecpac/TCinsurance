import { test, expect } from "./helpers/fixtures";

test.describe("Blog", () => {
  test.describe("Blog listing page", () => {
    test("displays blog posts", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "load" });

      // Should show at least one article or blog card
      const articles = page.locator("article, [data-testid*='blog']");
      const count = await articles.count();
      // If no article tags, look for links to blog posts
      if (count === 0) {
        const blogLinks = page.locator('a[href*="/blog/"]');
        expect(await blogLinks.count()).toBeGreaterThan(0);
      } else {
        expect(count).toBeGreaterThan(0);
      }
    });

    test("blog post links navigate to post pages", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "load" });

      const firstLink = page.locator('a[href*="/blog/"]').first();
      const href = await firstLink.getAttribute("href");
      expect(href).toBeTruthy();

      await firstLink.click();
      await page.waitForURL("**/blog/**");
      expect(page.url()).toContain("/blog/");
    });
  });

  test.describe("Blog post page", () => {
    const SLUG = "gastos-finales-arquitectura-financiera";

    test("displays post title", async ({ page }) => {
      await page.goto(`/blog/${SLUG}`, { waitUntil: "load" });
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text?.length).toBeGreaterThan(10);
    });

    test("displays post content", async ({ page }) => {
      await page.goto(`/blog/${SLUG}`, { waitUntil: "load" });
      // The post should have substantial content
      const main = page.locator("main, article").first();
      const text = await main.textContent();
      expect(text?.length).toBeGreaterThan(200);
    });

    test("has post metadata (author, date, category)", async ({ page }) => {
      await page.goto(`/blog/${SLUG}`, { waitUntil: "load" });
      const body = await page.textContent("body");
      // Check that some metadata is present
      expect(body).toContain("Tatiana");
    });

    test("has navigation to other posts or back to blog", async ({ page }) => {
      await page.goto(`/blog/${SLUG}`, { waitUntil: "load" });
      // Should have a link back to blog or to related posts
      const blogLinks = page.locator('a[href="/blog"], a[href*="/blog/"]');
      expect(await blogLinks.count()).toBeGreaterThan(0);
    });
  });
});
