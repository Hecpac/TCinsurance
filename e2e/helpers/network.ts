import { Page } from "@playwright/test";

export interface BadResponse {
  url: string;
  status: number;
}

export interface FailedRequest {
  url: string;
  error: string;
}

/**
 * Monitor network for 4xx/5xx responses and failed requests.
 * Returns getters for each list.
 */
export function monitorNetwork(page: Page) {
  const badResponses: BadResponse[] = [];
  const failedRequests: FailedRequest[] = [];

  page.on("response", (res) => {
    if (res.status() >= 400) {
      badResponses.push({ url: res.url(), status: res.status() });
    }
  });

  page.on("requestfailed", (req) => {
    failedRequests.push({
      url: req.url(),
      error: req.failure()?.errorText ?? "unknown",
    });
  });

  return {
    getBadResponses: () => badResponses,
    getFailedRequests: () => failedRequests,
  };
}
