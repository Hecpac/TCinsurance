# SEO Report: Analytics — 2026-03-31

## Summary

- **Score:** 82/100
- **Issues found:** 0 critical | 3 important | 4 minor
- **Platforms audited:** GTM, GA4 (browser + Measurement Protocol), Meta Pixel, Google Ads, Vercel Analytics, Consent Mode v2

All previously reported P0 issues have been resolved since the last audit. Meta Pixel now has a proper component (`MetaPixelHead`), `__tcGtagEventsEnabled` is correctly updated on consent accept/reject in `ConsentBanner`, the duplicate `qualify_lead` client-side event has been removed from `Contact.tsx`, scroll depth tracking is implemented via `ScrollDepthTracker` + `useScrollDepth`, and the `.env.example` now documents all server-side analytics vars. The remaining issues are meaningful but lower severity.

---

## P0 — Critical Issues

None.

---

## P1 — Important Issues

### GTM noscript fallback is absent from `<body>`

- **File(s):** `src/components/GoogleTagManager.tsx`, `src/app/layout.tsx`
- **Impact:** The GTM implementation guidelines require a `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-...">` tag immediately after the opening `<body>` tag. Without it, GTM does not fire for users with JavaScript disabled. For an insurance site, this matters less than for e-commerce, but the omission is a deviation from Google's required implementation and can cause inconsistencies when auditing GTM setup via tools like Google Tag Assistant.
- **Current state:** `GoogleTagManagerHead` renders only the `<script>` init inside `<head>`. No `noscript` `<iframe>` is added to `<body>` anywhere in `layout.tsx` or a dedicated `GoogleTagManagerBody` component.
- **Suggested fix:** Export a second component `GoogleTagManagerBody` from `GoogleTagManager.tsx` and render it as the first child inside `<body>` in `layout.tsx`:

```tsx
// In GoogleTagManager.tsx
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

// In layout.tsx — first element inside <body>
<body className="bg-swiss-paper text-swiss-black antialiased">
  <GoogleTagManagerBody gtmId={siteConfig.analytics.gtmId} />
  <ScrollSnapProvider>
    ...
```

---

### GA4 is never configured directly — 100% dependent on GTM having the correct tag

- **File(s):** `src/components/GoogleTagManager.tsx`, `src/app/layout.tsx`
- **Impact:** The `GoogleConsentModeHead` inline script initialises `window.gtag` as a `dataLayer.push` stub and sets consent defaults. However, `gtag('config', 'G-185FZ7T8CS')` is never called from Next.js code. `pushGa4()` in `tracking.ts` calls `window.gtag("event", ...)`, which pushes to `dataLayer` but will not reach GA4 unless GTM has a GA4 Configuration tag that fires on All Pages and registers the measurement ID. If that GTM tag is misconfigured, paused, or accidentally deleted, all browser-side GA4 tracking stops silently — including the `__tcGtagEventsEnabled` flag logic, which assumes GTM has already called `gtag('config', ...)`.

  Additionally, the Measurement Protocol calls in `api/lead/route.ts` send `qualify_lead` server-side with a `clientId`. For session stitching to work, the same GA4 property must have received the browser session from the same client. If GA4 is not configured in GTM, those server-side events will still land but will be orphaned (no matching sessions to stitch to).
- **Current state:** `siteConfig.analytics.ga4Id` (`G-185FZ7T8CS`) is stored but never passed to a `gtag('config', ...)` call in application code. The only place `gtag` receives this ID is inside GTM — which is not verifiable from the codebase.
- **Suggested fix:** Add a direct GA4 initialisation alongside GTM. This makes GA4 independently operational regardless of GTM state, and allows local verification without GTM preview mode:

```tsx
// In GoogleTagManager.tsx — add alongside GoogleTagManagerHead
interface Ga4Props { ga4Id?: string; }

function isGa4Enabled(id?: string) {
  return Boolean(id && id !== "G-XXXXXXXXXX");
}

export function Ga4Head({ ga4Id }: Ga4Props) {
  if (!isGa4Enabled(ga4Id)) return null;
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
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            gtag('js', new Date());
            gtag('config', '${ga4Id}', { send_page_view: true });
          `,
        }}
      />
    </>
  );
}
```

If the decision is to rely on GTM exclusively, this dependency must be documented and the GTM container must be treated as a deployment artifact (export + version control the GTM workspace JSON).

---

### Meta Pixel is implemented but `NEXT_PUBLIC_META_PIXEL_ID` is blank in `.env.local`

- **File(s):** `src/components/MetaPixel.tsx`, `.env.local`
- **Impact:** `MetaPixelHead` is correctly implemented with `fbq('init', ...)`, `fbq('track', 'PageView')`, and a noscript fallback. The `isEnabled()` guard correctly rejects the `"000000000000000"` placeholder. However, `.env.local` has `NEXT_PUBLIC_META_PIXEL_ID=` (empty), which means the guard will also reject it. The Pixel is not firing in the local dev environment and will not fire in any deployed environment where this env var is unset or empty. All `pushMeta()` calls in `tracking.ts` are silently no-ops.
- **Current state:** `NEXT_PUBLIC_META_PIXEL_ID` is empty in `.env.local`. The Vercel production value is unknown from the codebase alone.
- **Suggested fix:** Set `NEXT_PUBLIC_META_PIXEL_ID=<real_pixel_id>` in Vercel production environment variables and in `.env.local` for local development testing. Verify via the Meta Pixel Helper browser extension that PageView fires on page load.

---

## P2 — Improvements

### Google Ads conversion labels are not defined in code

- **File(s):** `src/components/GoogleTagManager.tsx` (`GoogleAdsHead`), `src/config/site.ts`
- **Impact:** `GoogleAdsHead` loads `gtag/js?id=AW-18016740134` and calls `gtag('config', googleAdsId, { send_page_view: false })`. The Ads account tag is correctly initialised with `send_page_view: false`. However, no `gtag('event', 'conversion', { send_to: 'AW-ID/LABEL' })` calls exist anywhere in the codebase. Without conversion labels, Google Ads cannot optimise bids for lead generation or track ROAS. The campaign is running blind on conversion data from the website.
- **Suggested fix:** Obtain conversion label IDs from the Google Ads account (under Conversions > Web > Tag setup), define them in `src/config/site.ts`, and fire them from `Contact.tsx` on successful lead submission:

```ts
// In siteConfig.analytics
googleAdsConversions: {
  leadSubmit: "AW-18016740134/YOUR_LABEL_HERE",
}

// In Contact.tsx after successful lead_submit
if (typeof window.gtag === "function" && siteConfig.analytics.googleAdsConversions?.leadSubmit) {
  window.gtag("event", "conversion", {
    send_to: siteConfig.analytics.googleAdsConversions.leadSubmit,
    value: 0,
    currency: "USD",
  });
}
```

---

### Consent banner sets cookie with `SameSite=Lax` but no `Secure` flag

- **File(s):** `src/components/ConsentBanner.tsx`
- **Impact:** The `setCookie()` function in `ConsentBanner.tsx` sets the `tc_consent` cookie with `SameSite=Lax` but without the `Secure` flag. On HTTPS (production), browsers will still accept this, but the absence of `Secure` is a minor security practice gap. For a site exclusively served over HTTPS, adding `Secure` is a best-practice improvement. Contrast with the server-side `tc_geo_country` cookie set in `middleware.ts` which also lacks `Secure` — but middleware uses `response.cookies.set()` which inherits the request's security context.
- **Suggested fix:**

```ts
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax;Secure`;
}
```

---

### Scroll depth deduplication window (60s) may miss re-scrolling on SPAs

- **File(s):** `src/hooks/useScrollDepth.ts`
- **Impact:** `useScrollDepth` tracks 25/50/75/90% milestones using a local `Set<number>` that persists for the lifetime of the component. This means milestones only fire once per mount, which is correct for the root layout. However, the `dedupeWindowMs: 60_000` passed to `trackEvent()` creates a 60-second cross-page deduplication window in the module-level `recentEvents` Map. If a user navigates to a second page within 60 seconds and scrolls to 50%, the `scroll_depth` event for that milestone will be suppressed. For a multi-page Next.js app with App Router client-side navigation, this could under-report scroll depth on the second page of a session.
- **Suggested fix:** Either remove the `dedupeWindowMs` override (fall back to the 900ms default) or include the pathname in the `dedupeKey` to scope deduplication per page:

```ts
trackEvent(
  "scroll_depth",
  { percent: milestone, page: window.location.pathname },
  {
    dedupeKey: `scroll_depth_${milestone}_${window.location.pathname}`,
    dedupeWindowMs: 60_000,
  }
);
```

---

### `contact_click_email` is not mapped to a Meta standard event

- **File(s):** `src/lib/tracking.ts`
- **Impact:** The `META_STANDARD_EVENTS` map in `tracking.ts` correctly maps `contact_click_phone` and `contact_click_whatsapp` to Meta's `Contact` standard event. `contact_click_email` is not included, so email clicks are tracked as `fbq("trackCustom", "contact_click_email")` instead of `fbq("track", "Contact")`. This is an inconsistency — all three are contact intent signals and should be treated identically by Meta.
- **Suggested fix:**

```ts
const META_STANDARD_EVENTS: Record<string, string> = {
  qualify_lead: "Lead",
  lead_submit: "Lead",
  contact_click_phone: "Contact",
  contact_click_whatsapp: "Contact",
  contact_click_email: "Contact",  // add this line
};
```

---

## Quick Wins

1. **Add `contact_click_email` to `META_STANDARD_EVENTS` in `src/lib/tracking.ts`.** One-line change. Ensures all three contact channel clicks are reported as Meta `Contact` events consistently.

2. **Add `GoogleTagManagerBody` noscript iframe to `layout.tsx`.** Completes the GTM implementation per Google's spec. Low-risk, two-file change.

3. **Set `NEXT_PUBLIC_META_PIXEL_ID` in Vercel production env vars.** Unblocks the entire Meta Pixel platform. The code is already correct — only the env var is missing.

4. **Add `contact_click_email` to `META_STANDARD_EVENTS`.** Already listed above as item 1 — single-line change in `tracking.ts`.

5. **Define Google Ads conversion labels.** Obtain labels from the Ads account and wire them to the `lead_submit` success callback in `Contact.tsx`. Immediately enables conversion-optimised bidding.

---

## Next Steps

### Immediate (this sprint)

1. Set `NEXT_PUBLIC_META_PIXEL_ID` in Vercel production environment variables and verify with Meta Pixel Helper.
2. Add `GoogleTagManagerBody` noscript component and render it at the top of `<body>` in `layout.tsx`.
3. Add `contact_click_email` to `META_STANDARD_EVENTS` in `tracking.ts`.

### Short-term (next sprint)

4. Verify in GTM that a GA4 Configuration tag exists for `G-185FZ7T8CS` and fires on All Pages — or add a direct `Ga4Head` component to make GA4 independent of GTM.
5. Obtain Google Ads conversion labels and wire them to `Contact.tsx` lead submission.
6. Add `Secure` flag to `setCookie()` in `ConsentBanner.tsx`.

### Verification

7. After Meta Pixel goes live: confirm `PageView`, `Lead`, and `Contact` events in Meta Events Manager.
8. After GA4 verification: confirm `qualify_lead` events in GA4 > Reports > Conversions with correct `lead_id` parameter.
9. Cross-check `qualify_lead` server-side (Measurement Protocol) and browser-side GTM counts monthly to confirm no double-firing regression.

---

## Appendix: Current State Summary

### Platform Operational Status

| Platform | Status | Notes |
|---|---|---|
| GTM | Operational | `GTM-N7GLR99F` loads on all pages. noscript body tag missing. |
| GA4 (browser) | Dependent on GTM | No direct `gtag('config', ...)` in app code. GTM tag assumed. |
| GA4 (Measurement Protocol) | Operational | `api/lead` fires `qualify_lead` server-side. `GA4_API_SECRET` configured. |
| Meta Pixel | Not firing | Component exists, env var empty in `.env.local`, production status unknown. |
| Google Ads | Partially operational | Tag loads (`AW-18016740134`). No conversion labels defined. |
| Vercel Analytics | Operational | `<Analytics />` from `@vercel/analytics/next` in layout. |
| Consent Mode v2 | Operational | Correct default deny for GDPR countries, grant for US. `wait_for_update: 500`. |

### Event Coverage

| Event | dataLayer (GTM) | gtag (GA4) | fbq (Meta) | Measurement Protocol |
|---|---|---|---|---|
| `lead_submit` | Yes | Yes* | No (pixel inactive) | No |
| `qualify_lead` | No | No | No | Yes (`api/lead`) |
| `cta_click_header` | Yes | Yes* | No | No |
| `cta_click_inline_hero` | Yes | Yes* | No | No |
| `cta_click_inline_floating_mobile` | Yes | Yes* | No | No |
| `contact_click_email` | Yes | Yes* | No (not mapped + pixel inactive) | No |
| `contact_click_phone` | Yes | Yes* | No (pixel inactive) | No |
| `contact_click_whatsapp` | Yes | Yes* | No (pixel inactive) | No |
| `newsletter_signup` | Yes | Yes* | No | No |
| `faq_open_N` | Yes | Yes* | No | No |
| `social_click` | Yes | Yes* | No | No |
| `scroll_depth` | Yes | Yes* | No | No |
| Page views | Via GTM** | Via GTM** | No (pixel inactive) | No |

\* `gtag` calls depend on `window.__tcGtagEventsEnabled = true` (correct for consented users) and on GTM having configured a GA4 property.

\*\* Page views depend entirely on GTM container having a GA4 Configuration tag. Not verifiable from codebase alone.
