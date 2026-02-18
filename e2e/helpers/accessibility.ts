import AxeBuilder from "@axe-core/playwright";
import { expect, Page } from "@playwright/test";

/**
 * Run axe-core accessibility checks on the current page.
 * Fails the test if any violations are found.
 */
export async function checkAccessibility(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  const violations = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodes: v.nodes.length,
  }));

  expect(violations, `Accessibility violations found: ${JSON.stringify(violations, null, 2)}`).toHaveLength(0);
}
