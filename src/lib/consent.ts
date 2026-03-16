/** Cookie and consent constants used by GoogleTagManager and consent UI. */

export const CONSENT_COOKIE_NAME = "tc_consent";

export const GEO_COUNTRY_COOKIE_NAME = "tc_geo_country";

/**
 * ISO 3166-1 alpha-2 codes for countries where explicit cookie consent
 * is required before firing analytics/ad tags (GDPR, ePrivacy, etc.).
 */
export const CONSENT_REQUIRED_COUNTRIES: ReadonlySet<string> = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA
  "IS", "LI", "NO",
  // UK
  "GB",
]);
