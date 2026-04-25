# i18n Migration Plan — Fase 3 split

## Estado: 3a complete (foundation only)

## What 3a delivered (this PR)
- `next-intl@4` installed
- `src/i18n/locales.ts` — locale constants (`es` default, `en` secondary), cookie name, helpers
- `src/i18n/messages.ts` — typed dictionary loader
- `src/i18n/getLocale.ts` — server-side locale resolver (cookie → Accept-Language → default)
- `messages/es.json` + `messages/en.json` — initial dictionaries (Brand/Nav/Cta/Hero/Services/Footer/Cotizador)
- `src/components/LanguageSwitcher.tsx` — cookie-based ES/EN toggle (NOT yet wired into Navbar; activates in 3b)

**Zero user-visible changes.** No routes moved, no copy swapped. This is pure scaffolding.

## What 3b will deliver (next PR — needs explicit OK)
- Wire `LanguageSwitcher` into `Navbar` desktop + mobile menus
- Replace hardcoded strings in `Navbar`, `Footer`, `Hero`, `FloatingCTA`, `ConsentBanner`, `Process`, `Stats`, `Philosophy` with `getMessages(locale)` lookups
- Set `<html lang>` dynamically from server-resolved locale
- Update `LocalBusinessJsonLd` + `siteConfig.seo` with `inLanguage`
- Update OG metadata `locale` field per request

**Why staged:** every component swap is a risk surface. 3b stays at root URL (no `[locale]/` prefix yet) — locale lives only in cookie. URLs unchanged, SEO unchanged.

## What 3c will deliver (final PR — irreversible)
- Move all `app/*` routes to `app/[locale]/*`
- Add 301 redirects from current ES URLs → `/es/...` in `next.config.ts`
- Update sitemap + robots with `hreflang`
- Translate remaining body copy (services pages, sobre-mi, blog metadata)
- Schema.org with `inLanguage` per route

**Why last:** redirects are irreversible for SEO. Site needs to ship 3b first to validate translations don't break layout.

## Decision log
- **Library:** `next-intl@4` chosen over `next-i18next` (App Router native, server-component support, smaller bundle).
- **Default locale:** `es` (current site is Spanish, no SEO loss).
- **Routing strategy 3c:** `as-needed` (default locale `es` at `/`, `en` at `/en/...`) to preserve existing ES URLs and avoid mass 301s.
- **Cookie name:** `TIC_LOCALE` (separate from `next-intl` defaults to avoid collisions with future i18n libraries).

## Out of scope of Fase 3
- Translating individual blog posts (those are content, not strings — keep as-is unless author writes EN versions).
- Translating dynamic Resend email templates.
- Multi-region currency or address formatting (not needed: Texas-only business).
