import Script from "next/script";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_REQUIRED_COUNTRIES,
  GEO_COUNTRY_COOKIE_NAME,
} from "@/lib/consent";

interface GoogleTagManagerProps {
  gtmId?: string;
}

function isEnabled(gtmId?: string) {
  return Boolean(gtmId && gtmId !== "GTM-XXXXXXX");
}

export function GoogleConsentModeHead() {
  const consentRequiredCountries = JSON.stringify([...CONSENT_REQUIRED_COUNTRIES]);
  const script = `
    (function() {
      var consentCookieName = ${JSON.stringify(CONSENT_COOKIE_NAME)};
      var geoCookieName = ${JSON.stringify(GEO_COUNTRY_COOKIE_NAME)};
      var consentRequiredCountries = new Set(${consentRequiredCountries});

      function readCookieValue(cookieName) {
        var encodedName = encodeURIComponent(cookieName) + '=';
        var parts = document.cookie.split(';');

        for (var index = 0; index < parts.length; index += 1) {
          var part = parts[index].trim();
          if (!part.startsWith(encodedName)) continue;

          var rawValue = part.slice(encodedName.length);
          if (!rawValue) return null;

          try {
            return decodeURIComponent(rawValue);
          } catch {
            return rawValue;
          }
        }

        return null;
      }

      function normalizeCountryCode(value) {
        var normalized = typeof value === 'string' ? value.trim().toUpperCase() : '';
        return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
      }

      function parseConsentState(value) {
        return value === 'accepted' || value === 'rejected' ? value : null;
      }

      var countryCode = normalizeCountryCode(readCookieValue(geoCookieName));
      var consentState = parseConsentState(readCookieValue(consentCookieName));
      var countryKnown = countryCode !== null;
      var requiresConsent = countryKnown && consentRequiredCountries.has(countryCode);
      var consentGranted = !requiresConsent || consentState === 'accepted';
      var waitForUpdate = requiresConsent && consentState === null ? 500 : 0;
      var consentDefaults = consentGranted
        ? {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            wait_for_update: waitForUpdate,
          }
        : {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: waitForUpdate,
          };

      window.__tcConsentCountryCode = countryCode;
      window.__tcConsentState = consentState;
      window.__tcConsentRequiresConsent = requiresConsent;
      window.__tcGtagEventsEnabled = consentGranted;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
      window.gtag('consent', 'default', consentDefaults);
    })();
  `;

  return <script id="google-consent-mode" dangerouslySetInnerHTML={{ __html: script }} />;
}

export function GoogleTagManagerHead({ gtmId }: GoogleTagManagerProps) {
  if (!isEnabled(gtmId)) return null;

  const script = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;

  return (
    <Script id="gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />
  );
}

interface GoogleAdsProps {
  googleAdsId?: string | null;
}

function isGoogleAdsEnabled(id?: string | null) {
  return Boolean(id && id !== "AW-XXXXXXXXX");
}

export function GoogleTagManagerBody({ gtmId }: GoogleTagManagerProps) {
  if (!isEnabled(gtmId)) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm-noscript"
      />
    </noscript>
  );
}

export function GoogleGA4Head({ ga4Id }: { ga4Id?: string }) {
  if (!ga4Id || ga4Id === "G-XXXXXXXXXX") return null;
  return (
    <>
      <Script
        id="ga4-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${ga4Id}', { send_page_view: true });
          `,
        }}
      />
    </>
  );
}

export function GoogleAdsHead({ googleAdsId }: GoogleAdsProps) {
  if (!isGoogleAdsEnabled(googleAdsId)) return null;

  return (
    <>
      <Script
        id="gads-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
      />
      <Script
        id="gads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${googleAdsId}', { send_page_view: false });
          `,
        }}
      />
    </>
  );
}
