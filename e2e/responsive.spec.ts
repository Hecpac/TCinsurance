import { test, expect } from "./helpers/fixtures";

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const bp of BREAKPOINTS) {
  test.describe(`Responsive: ${bp.name} (${bp.width}px)`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    test("home page renders without horizontal overflow", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // 1px tolerance
    });

    test("navigation is usable", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();

      if (bp.width < 768) {
        // Mobile: menu button should exist
        const menuButton = nav.locator("button").first();
        await expect(menuButton).toBeVisible();
      } else {
        // Desktop/tablet: links should be directly visible
        await expect(nav.getByText("Blog")).toBeVisible();
      }
    });

    test("blog page renders properly", async ({ page }) => {
      await page.goto("/blog", { waitUntil: "load" });
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });

    test("servicios page renders properly", async ({ page }) => {
      await page.goto("/servicios", { waitUntil: "load" });
      const h1 = page.locator("h1");
      await expect(h1).toBeVisible();

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
    });
  });
}
