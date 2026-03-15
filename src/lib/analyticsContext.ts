export interface AnalyticsContext {
  clientId?: string;
}

function readCookieValue(cookieName: string, cookieSource: string) {
  const encodedName = encodeURIComponent(cookieName);
  const match = cookieSource
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encodedName + "="));

  if (!match) return null;

  const [, rawValue = ""] = match.split("=", 2);
  if (!rawValue) return null;

  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
}

export function normalizeGaClientId(value: string | null | undefined) {
  const normalized = value?.trim();
  if (!normalized) return null;
  return /^\d+\.\d+$/.test(normalized) ? normalized : null;
}

export function readGaClientId(cookieSource: string) {
  const rawValue = readCookieValue("_ga", cookieSource);
  if (!rawValue) return null;

  const parts = rawValue.split(".");
  if (parts.length < 4) return null;

  return normalizeGaClientId(parts.slice(-2).join("."));
}

export function readAnalyticsContext(): AnalyticsContext {
  if (typeof document === "undefined") return {};

  const clientId = readGaClientId(document.cookie);
  return clientId ? { clientId } : {};
}
