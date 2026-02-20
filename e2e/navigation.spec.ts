import { test, expect } from "./helpers/fixtures";

test.describe("Navigation", () => {
  test.describe("Navbar", () => {
    test("displays the brand logo", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const logo = page.locator("nav img").first();
      await expect(logo).toBeVisible();
    });

    test("has links to main sections", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const nav = page.locator("nav");

      // Check for key navigation links
      await expect(nav.getByText("Servicios")).toBeVisible();
      await expect(nav.getByText("Sobre mí")).toBeVisible();
      await expect(nav.getByText("Blog")).toBeVisible();
      await expect(nav.getByText("Contacto")).toBeVisible();
    });

    test("navigates to Servicios page", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      // Use the navbar link — it may be a hash link on home
      const serviciosLink = page.locator("nav").getByText("Servicios").first();
      const href = await serviciosLink.getAttribute("href");

      // If it's a hash link, it stays on the same page
      if (href?.includes("#")) {
        await serviciosLink.click();
        await page.waitForURL("**/#*");
        expect(page.url()).toContain("#");
      } else {
        await serviciosLink.click();
        await page.waitForURL("**/servicios");
        expect(page.url()).toContain("/servicios");
      }
    });

    test("navigates to Blog page", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const blogLink = page.locator("nav").getByText("Blog").first();
      await blogLink.click();
      await page.waitForURL("**/blog");
      expect(page.url()).toContain("/blog");
    });
  });

  test.describe("Mobile menu", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("opens and closes mobile menu", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });

      // Find the mobile menu button (hamburger)
      const menuButton = page.locator("nav button").first();
      await expect(menuButton).toBeVisible();
      await menuButton.click();

      // After clicking, navigation links should be visible
      const mobileLink = page.locator("#mobile-nav-panel").getByText("Servicios").first();
      await expect(mobileLink).toBeVisible();

      // Close with Escape
      await page.keyboard.press("Escape");
    });
  });

  test.describe("Footer", () => {
    test("has legal links", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const footer = page.locator("footer");

      await expect(footer.getByText("Privacidad", { exact: false })).toBeVisible();
      await expect(footer.getByText("Términos", { exact: false })).toBeVisible();
    });

    test("privacy link navigates correctly", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const privacyLink = page.locator("footer").getByRole("link", { name: /privacidad/i }).first();
      await privacyLink.click();
      await page.waitForURL("**/privacidad");
      expect(page.url()).toContain("/privacidad");
    });

    test("terms link navigates correctly", async ({ page }) => {
      await page.goto("/", { waitUntil: "load" });
      const termsLink = page.locator("footer").getByRole("link", { name: /término/i }).first();
      await termsLink.click();
      await page.waitForURL("**/terminos");
      expect(page.url()).toContain("/terminos");
    });
  });
});
