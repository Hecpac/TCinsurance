import { test, expect } from "./helpers/fixtures";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    // Scroll to the contact section
    await page.locator("#contacto").first().scrollIntoViewIfNeeded();
  });

  test("displays required form fields", async ({ page }) => {
    const form = page.locator("[data-testid='contact-section'] form");
    await expect(form).toBeVisible();

    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#phone")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#insuranceType")).toBeVisible();
  });

  test("shows validation error for empty name", async ({ page }) => {
    // Fill phone so only name fails
    await page.locator("#phone").fill("4691234567");
    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await submitButton.click();

    // Should show an error about the name
    const errorText = page.locator("[role='status'].form-error");
    await expect(errorText).toContainText("nombre");
  });

  test("shows error when no contact info provided", async ({ page }) => {
    // Fill only name, leave phone and email empty
    await page.locator("#name").fill("Test User");
    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await submitButton.click();

    const errorText = page.locator("[role='status'].form-error");
    await expect(errorText).toContainText("contacto");
  });

  test("shows error for invalid phone number", async ({ page }) => {
    await page.locator("#name").fill("Test User");
    await page.locator("#phone").fill("123"); // Too short
    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await submitButton.click();

    const errorText = page.locator("[role='status'].form-error");
    await expect(errorText).toContainText("teléfono", { ignoreCase: true });
  });

  test("shows error for invalid email", async ({ page }) => {
    await page.locator("#name").fill("Test User");
    await page.locator("#email").fill("not-an-email");
    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await submitButton.click();

    const errorText = page.locator("[role='status'].form-error");
    await expect(errorText).toContainText("email", { ignoreCase: true });
  });

  test("fires qualify_lead after a successful submit", async ({ page }) => {
    await page.route("**/api/lead", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, leadId: "lead_test_123" }),
      });
    });

    await page.locator("#name").fill("Test User");
    await page.locator("#phone").fill("4691234567");

    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await submitButton.click();

    const statusMessage = page.locator("[data-testid='contact-section'] [role='status']").first();
    await expect(statusMessage).toContainText("Gracias.");

    const events = await page.evaluate(() =>
      (window.dataLayer ?? [])
        .filter((entry) => typeof entry === "object" && entry !== null)
        .map((entry) => entry.event)
    );

    expect(events).toContain("lead_submit");
    expect(events).toContain("qualify_lead");

    const qualifyLeadEvent = await page.evaluate(() =>
      (window.dataLayer ?? []).find(
        (entry) => typeof entry === "object" && entry !== null && entry.event === "qualify_lead"
      )
    );

    expect(qualifyLeadEvent).toMatchObject({
      event: "qualify_lead",
      lead_id: "lead_test_123",
      insurance_type: "Salud",
      source: "/",
    });
  });

  test("insurance type dropdown has options", async ({ page }) => {
    const select = page.locator("#insuranceType");
    const options = select.locator("option");
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(5);

    // Check some known options
    await expect(options.filter({ hasText: "Salud" })).toHaveCount(1);
    await expect(options.filter({ hasText: "Vida" })).toHaveCount(1);
    await expect(options.filter({ hasText: "Gastos Finales" })).toHaveCount(1);
  });

  test("optional message toggle works", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /agregar mensaje/i });
    await expect(toggle).toBeVisible();
    await toggle.click();

    const textarea = page.locator("#message");
    await expect(textarea).toBeVisible();
  });

  test("submit button is present and enabled", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /solicitar/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });
});
