import { test as base, expect } from "@playwright/test";
import { captureConsoleErrors, ConsoleEntry } from "./console";
import { monitorNetwork, BadResponse, FailedRequest } from "./network";

type Fixtures = {
  consoleErrors: () => ConsoleEntry[];
  badResponses: () => BadResponse[];
  failedRequests: () => FailedRequest[];
};

/**
 * Extended test fixture that automatically captures console errors and
 * monitors network failures on every test.
 */
export const test = base.extend<Fixtures>({
  consoleErrors: async ({ page }, use) => {
    const getErrors = captureConsoleErrors(page);
    await use(getErrors);
  },
  badResponses: async ({ page }, use) => {
    const { getBadResponses } = monitorNetwork(page);
    await use(getBadResponses);
  },
  failedRequests: async ({ page }, use) => {
    const { getFailedRequests } = monitorNetwork(page);
    await use(getFailedRequests);
  },
});

export { expect };
