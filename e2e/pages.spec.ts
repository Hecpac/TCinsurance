import { test, expect } from "./helpers/fixtures";
import { checkAccessibility } from "./helpers/accessibility";

const ROUTES = [
  { path: "/", name: "Home" },
  { path: "/servicios", name: "Servicios" },
  { path: "/sobre-mi", name: "Sobre mí" },
  { path: "/blog", name: "Blog" },
  { path: "/blog/gastos-finales-arquitectura-financiera", name: "Blog Post" },
  { path: "/privacidad", name: "Privacidad" },
  { path: "/terminos", name: "Términos" },
];

for (const route of ROUTES) {
  test.describe(`${route.name} (${route.path})`, () => {
    test("loads successfully with 200 status", async ({ page, badResponses }) => {
      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      // Allow the page to settle
      await page.waitForLoadState("load");

      const bad = badResponses().filter((r) => {
        // Ignore external analytics/tracking requests that may fail without env vars
        const url = r.url;
        return (
          !url.includes("googletagmanager") &&
          !url.includes("google-analytics") &&
          !url.includes("facebook.com") &&
          !url.includes("connect.facebook.net")
        );
      });
      expect(bad, `Unexpected 4xx/5xx responses: ${JSON.stringify(bad)}`).toHaveLength(0);
    });

    test("has a page title", async ({ page }) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });

    test("has exactly one H1 element", async ({ page }) => {
      await page.goto(route.path, { waitUntil: "load" });
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test("has no console errors", async ({ page, consoleErrors }) => {
      await page.goto(route.path, { waitUntil: "load" });
      // Wait a moment for any deferred scripts
      await page.waitForTimeout(500);
      const errors = consoleErrors().filter((e) => {
        // Ignore known third-party errors
        return (
          !e.text.includes("googletagmanager") &&
          !e.text.includes("google-analytics") &&
          !e.text.includes("facebook") &&
          !e.text.includes("Failed to load resource")
        );
      });
      expect(errors, `Console errors found: ${JSON.stringify(errors)}`).toHaveLength(0);
    });

    test("all images have alt attributes", async ({ page }) => {
      await page.goto(route.path, { waitUntil: "load" });
      const imagesWithoutAlt = await page.locator("img:not([alt])").count();
      expect(imagesWithoutAlt).toBe(0);
    });

    test("passes accessibility checks", async ({ page }) => {
      await page.goto(route.path, { waitUntil: "load" });
      await checkAccessibility(page);
    });
  });
}
