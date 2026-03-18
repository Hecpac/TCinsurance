export const CONSENT_COOKIE_NAME = "tc_consent";
export const GEO_COUNTRY_COOKIE_NAME = "tc_geo_country";
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;
export const GEO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const CONSENT_REQUIRED_COUNTRY_CODES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
] as const;

export const CONSENT_REQUIRED_COUNTRIES: ReadonlySet<string> = new Set(
  CONSENT_REQUIRED_COUNTRY_CODES
);

export type ConsentState = "accepted" | "rejected";

const CONSENT_GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

const CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

export function normalizeCountryCode(value: string | null | undefined) {
  const normalized = value?.trim().toUpperCase();
  return normalized && /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

export function readRequestCountry(headersLike: Headers) {
  const headerKeys = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "cloudfront-viewer-country",
    "x-country-code",
    "x-geo-country",
  ];

  for (const key of headerKeys) {
    const countryCode = normalizeCountryCode(headersLike.get(key));
    if (countryCode) return countryCode;
  }

  return null;
}

export function readCookieValue(cookieName: string, cookieSource: string) {
  const encodedName = encodeURIComponent(cookieName) + "=";

  for (const part of cookieSource.split(";")) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(encodedName)) continue;

    const rawValue = trimmed.slice(encodedName.length);
    if (!rawValue) return null;

    try {
      return decodeURIComponent(rawValue);
    } catch {
      return rawValue;
    }
  }

  return null;
}

export function isConsentRequiredCountry(countryCode: string | null | undefined) {
  const normalized = normalizeCountryCode(countryCode);
  return normalized ? CONSENT_REQUIRED_COUNTRIES.has(normalized) : false;
}

export function parseConsentState(value: string | null | undefined): ConsentState | null {
  return value === "accepted" || value === "rejected" ? value : null;
}

export function getConsentModeState(consentState: ConsentState | null, requiresConsent: boolean) {
  if (!requiresConsent) return CONSENT_GRANTED;
  if (consentState === "accepted") return CONSENT_GRANTED;
  return CONSENT_DENIED;
}
