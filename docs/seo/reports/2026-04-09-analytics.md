# SEO Report: Analytics — 2026-04-09

## Summary
- **Score:** 78/100
- **Issues found:** 1 critical | 4 important | 3 minor
- **Platforms audited:** GTM, GA4 (client + Measurement Protocol), Meta Pixel, Google Ads, Vercel Analytics, Consent Mode v2

---

## P0 — Critical Issues

### Meta Pixel ID is empty in production environment
- **File:** `/Users/hector/Projects/TC Insurance/.env.local` line 6
- **Impact:** Zero Meta Pixel events are firing in the current local environment. Because `NEXT_PUBLIC_META_PIXEL_ID` is blank, `isEnabled()` in `MetaPixel.tsx` returns false and the entire pixel script is suppressed. If the same empty value is deployed to Vercel, every Meta Ads conversion and audience is silently lost.
- **Current state:** `NEXT_PUBLIC_META_PIXEL_ID=` (empty string). The `MetaPixelHead` component correctly guards against the placeholder `"000000000000000"` but an empty string bypasses that check — `Boolean("") === false` so the guard works here, but the intent is clearly to have a real ID configured.
- **Suggested fix:** Provide a real Meta Pixel ID in the Vercel environment variables:
  ```
  NEXT_PUBLIC_META_PIXEL_ID=<real_pixel_id>
  ```
  Verify `isEnabled` in `MetaPixel.tsx` also guards against empty string explicitly:
  ```tsx
  function isEnabled(id?: string) {
    return Boolean(id && id !== "000000000000000" && id.trim() !== "");
  }
  ```

---

## P1 — Important Issues

### GA4 page views rely entirely on GTM — no standalone gtag GA4 config
- **File:** `/Users/hector/Projects/TC Insurance/src/components/GoogleTagManager.tsx`
- **Impact:** There is no `gtag('config', 'G-185FZ7T8CS')` call anywhere in the codebase for the GA4 property. `GoogleAdsHead` configures the Google Ads ID with `send_page_view: false`, but GA4 page view configuration is completely absent client-side. This means GA4 data depends entirely on GTM being configured to fire a GA4 tag. If the GTM container does not have a GA4 configuration tag set up, page views will never reach GA4.
- **Current state:** `NEXT_PUBLIC_GA4_ID=G-185FZ7T8CS` is set and used in `pushGa4()` for custom events via `window.gtag("event", ...)`, but `gtag('config', 'G-185FZ7T8CS')` is never called, so the GA4 stream is not initialized client-side. The `pushGa4` function also requires `window.__tcGtagEventsEnabled === true`, which means if consent is not yet resolved, custom events are also suppressed.
- **Suggested fix:** Add a `GoogleGA4Head` component that initializes GA4 with `send_page_view: true`:
  ```tsx
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
  ```
  Then add `<GoogleGA4Head ga4Id={siteConfig.analytics.ga4Id} />` in `layout.tsx` `<head>`.

### Consent Mode: US visitors receive `denied` defaults until geo cookie is set
- **File:** `/Users/hector/Projects/TC Insurance/src/components/GoogleTagManager.tsx` lines 56–74
- **Impact:** The consent default logic sets `requiresConsent = true` when the country code is unknown (`countryKnown === false`). On a US user's first visit before the `tc_geo_country` cookie is written by any server middleware, they will be defaulted to `denied` for all consent signals, blocking GA4 and Google Ads data collection until the cookie eventually appears (if it ever does). This is a data loss risk for the primary audience.
- **Current state:**
  ```js
  var requiresConsent = !countryKnown || consentRequiredCountries.has(countryCode);
  var consentGranted = countryKnown && (!requiresConsent || consentState === 'accepted');
  ```
  When `tc_geo_country` cookie is absent on the first hit: `countryKnown = false`, `requiresConsent = true`, `consentGranted = false` → all signals `denied`.
- **Suggested fix:** Change the fail-safe direction for unknown country to `granted` (appropriate for a US-only business), with a short `wait_for_update` to allow the geo cookie to resolve:
  ```js
  var requiresConsent = countryKnown && consentRequiredCountries.has(countryCode);
  var consentGranted = !requiresConsent || consentState === 'accepted';
  var waitForUpdate = requiresConsent && consentState === null ? 500 : 0;
  ```
  Alternatively, set the geo cookie via Vercel Edge Middleware on every request before the page renders, eliminating the unknown-country window.

### `newsletter_signup` event fires client-side but has no server-side GA4 Measurement Protocol counterpart
- **File:** `/Users/hector/Projects/TC Insurance/src/components/Footer.tsx` line 83, `/Users/hector/Projects/TC Insurance/src/app/api/newsletter/route.ts`
- **Impact:** Newsletter signups are tracked only via `trackEvent("newsletter_signup", ...)` in the browser. The newsletter API route (`/api/newsletter`) does not call `sendGa4MeasurementEvent`, so if the event fires before consent is granted (or the pixel is disabled), it is silently lost with no server-side fallback. The `/api/lead` route has Measurement Protocol coverage; newsletter does not.
- **Suggested fix:** Add a `sendGa4MeasurementEvent` call to `/api/newsletter/route.ts` after a successful email send, mirroring the pattern used in `/api/lead/route.ts`.

### Google Ads conversion label not configured — AW ID is set but no conversion actions
- **File:** `/Users/hector/Projects/TC Insurance/src/components/GoogleTagManager.tsx` `GoogleAdsHead`, `/Users/hector/Projects/TC Insurance/.env.local`
- **Impact:** `NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18016740134` is present and the `GoogleAdsHead` component is active. The Ads tag is loaded with `send_page_view: false`. However, there are no `gtag('event', 'conversion', { send_to: 'AW-xxx/yyy' })` calls anywhere in the codebase. Lead form submissions and phone clicks are not sending Ads conversion events, so Google Ads cannot optimize bids or report conversions.
- **Suggested fix:** Add conversion event calls inside `trackEvent` for `lead_submit` and `contact_click_phone`:
  ```ts
  // In tracking.ts or in Contact.tsx after lead_submit succeeds
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-18016740134/CONVERSION_LABEL',
    value: 1.0,
    currency: 'USD',
  });
  ```
  The conversion label (`/CONVERSION_LABEL`) must be obtained from Google Ads Admin > Conversions.

---

## P2 — Improvements

### `trackEvent` deduplication key for scroll_depth uses 60s window — risks missing milestone fires on SPA navigation
- **File:** `/Users/hector/Projects/TC Insurance/src/hooks/useScrollDepth.ts` line 25
- **Impact:** `dedupeWindowMs: 60_000` on scroll depth milestones means that if a user navigates to another page and back within 60 seconds, the milestone is not re-fired for the new page. The `dedupeKey` correctly includes `window.location.pathname`, so this is partially mitigated, but the 60-second window is unnecessarily conservative for a key engagement metric.
- **Suggested fix:** Reduce to `dedupeWindowMs: 0` (no dedup, rely on the per-page `dedupeKey` alone) or use `30_000`.

### ConsentBanner never fires an analytics event on accept/reject
- **File:** `/Users/hector/Projects/TC Insurance/src/components/ConsentBanner.tsx`
- **Impact:** There is no `trackEvent('consent_accepted')` or `trackEvent('consent_rejected')` call when the user interacts with the banner. This means consent interaction rate and consent split cannot be measured in GA4 or GTM.
- **Suggested fix:** Add `trackEvent` calls in `handleAccept` and `handleReject` after updating the cookie and gtag consent state.

### `qualify_lead` (Measurement Protocol) fires with fallback-derived `clientId` when GA client ID is not passed from browser
- **File:** `/Users/hector/Projects/TC Insurance/src/lib/ga4MeasurementProtocol.ts` lines 83–84
- **Impact:** When the Contact form does not pass `analytics.clientId`, `deriveClientId()` generates a deterministic but artificial client ID from the event name and params. This means server-side `qualify_lead` events will appear as a different user than the browser-side `lead_submit` event in GA4, breaking the user journey path in funnels.
- **Suggested fix:** Verify that `Contact.tsx` always reads `_ga` cookie and passes it as `analytics.clientId` in the form submission payload. Add a visible warning log if `clientId` is missing before firing the Measurement Protocol event.

---

## Quick Wins

1. **Add real Meta Pixel ID to Vercel env** — zero-code change, recovers all Meta audience and conversion data immediately.
2. **Add standalone GA4 `gtag('config', ...)` call** — ensures GA4 page views are collected independent of GTM container configuration; 30 minutes of work.
3. **Fix consent default for unknown country** — change one boolean expression in `GoogleTagManager.tsx` to prevent US users from being denied on first load; 15 minutes of work.
4. **Add Google Ads conversion label** — get the label from Ads Admin and add one `gtag('event', 'conversion')` call in the lead submit success handler; 1 hour of work.
5. **Add `sendGa4MeasurementEvent` to newsletter API** — copy the 10-line pattern from `/api/lead/route.ts`; 30 minutes of work.

---

## Next Steps

1. Confirm production Vercel env has `NEXT_PUBLIC_META_PIXEL_ID` set to a real Pixel ID.
2. Add `GoogleGA4Head` component and mount in `layout.tsx` to make GA4 standalone-functional.
3. Fix unknown-country consent default to avoid penalizing the primary US audience.
4. Retrieve Google Ads conversion labels from Ads Admin and wire `lead_submit` and `contact_click_phone` to fire conversion events.
5. Add Measurement Protocol call to the newsletter API route for parity with leads.
6. Verify Contact form passes `_ga` cookie value as `analytics.clientId` to the lead API.
7. Consider adding consent interaction tracking (accept/reject) to the ConsentBanner for GDPR reporting.

---

## Platform Coverage Summary

| Platform | Configured | Firing | Server-side |
|---|---|---|---|
| GTM | Yes (GTM-N7GLR99F) | Yes (afterInteractive) | n/a |
| GA4 client | Partial (no gtag config call) | Via GTM only | Via Measurement Protocol |
| GA4 Measurement Protocol | Yes (qualify_lead) | Yes | Yes |
| Meta Pixel | No (empty ID in env) | No | No |
| Google Ads | Yes (AW-18016740134) | Script loads, no conversions | No |
| Vercel Analytics | Yes (`<Analytics />` in layout) | Yes | Yes |
| Consent Mode v2 | Yes (v2 signals present) | Partial (US users may start denied) | n/a |

---

## Event Coverage Summary

| Event | GTM dataLayer | GA4 | Meta | Notes |
|---|---|---|---|---|
| lead_submit | Yes | Yes (consent-gated) | Yes (standard: Lead) | Form submit |
| qualify_lead | n/a | Yes (Measurement Protocol) | No | Server-side only |
| contact_click_phone | Yes | Yes | Yes (standard: Contact) | |
| contact_click_whatsapp | Yes | Yes | Yes (standard: Contact) | |
| contact_click_email | Yes | Yes | Yes (standard: Contact) | |
| cta_click_header | Yes | Yes | Custom | Navbar CTA |
| cta_click_inline_hero | Yes | Yes | Custom | Hero CTAs |
| cta_click_inline_floating_mobile | Yes | Yes | Custom | Mobile float |
| cta_click_inline_* | Yes | Yes | Custom | CTAInline component |
| scroll_depth (25/50/75/90) | Yes | Yes | Custom | Per-page dedup |
| faq_open_* | Yes | Yes | Custom | Per-question |
| newsletter_signup | Yes | Yes (consent-gated) | Custom | No server fallback |
| social_click | Yes | Yes | Custom | Footer social links |
| Page views | Via GTM only | Via GTM only | Yes (fbq PageView) | No standalone GA4 config |
