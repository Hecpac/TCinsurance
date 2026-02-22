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
  consoleErrors: async ({ page }, runFixture) => {
    const getErrors = captureConsoleErrors(page);
    await runFixture(getErrors);
  },
  badResponses: async ({ page }, runFixture) => {
    const { getBadResponses } = monitorNetwork(page);
    await runFixture(getBadResponses);
  },
  failedRequests: async ({ page }, runFixture) => {
    const { getFailedRequests } = monitorNetwork(page);
    await runFixture(getFailedRequests);
  },
});

export { expect };
