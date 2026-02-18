import { Page } from "@playwright/test";

export interface ConsoleEntry {
  type: string;
  text: string;
}

/**
 * Attach a console listener to the page. Returns a function to retrieve
 * collected console errors.
 */
export function captureConsoleErrors(page: Page) {
  const errors: ConsoleEntry[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({ type: msg.type(), text: msg.text() });
    }
  });

  page.on("pageerror", (err) => {
    errors.push({ type: "pageerror", text: String(err.message ?? err) });
  });

  return () => errors;
}
