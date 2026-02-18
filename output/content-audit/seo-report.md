# SEO Audit Report: TC Insurance Agency Services, LLC

**Audit Date:** February 9, 2026
**Site URL:** https://www.tcinsurance-llc.com
**Estimated Overall SEO Score:** 72/100 (Good foundation, several high-impact improvements available)

---

## Executive Summary

TC Insurance has a solid SEO foundation with proper meta tags on all pages, structured data (LocalBusiness + FAQ + Article + BreadcrumbList), a dynamic sitemap, and well-structured heading hierarchy. The site correctly targets Spanish-speaking audiences in Texas with `lang="es"` and `locale: "es_US"`.

**Key Strengths:**
- Complete JSON-LD structured data graph (LocalBusiness, WebSite, WebPage, FAQPage, Article, BreadcrumbList)
- Dynamic sitemap with all pages and blog posts
- Canonical URLs on key pages
- OpenGraph + Twitter Card meta tags on all pages
- Proper heading hierarchy (single H1 per page)
- Good alt text on images
- Geo meta tags for local SEO

**Critical Gaps:**
- No `robots.txt` disallow rules for API routes
- Missing canonical URLs on `/servicios`, `/sobre-mi`, `/privacidad`, `/terminos`
- No `hreflang` tags for bilingual targeting
- Blog content is thin (some posts under 100 words)
- Missing `dateModified` differentiation from `datePublished` in Article schema
- LocalBusiness schema missing key properties (openingHours, priceRange, image, logo)
- No Review/AggregateRating schema despite testimonials
- `sameAs` array in LocalBusiness is effectively empty

---

## 1. Meta Tags Audit

### 1.1 Title Tags

| Page | Title | Length | Assessment |
|------|-------|--------|------------|
| Home | "TC Insurance Agency Services, LLC \| Seguros de Vida, Salud y Gastos Finales en Texas" | ~86 chars | HIGH -- Too long (recommended: 50-60 chars). Will be truncated in SERPs. |
| /servicios | "Servicios \| TC Insurance Agency Services, LLC" | ~48 chars | OK |
| /sobre-mi | "Sobre Mi \| TC Insurance Agency Services, LLC" | ~46 chars | OK, but missing accent on "Mi" |
| /blog | "Blog \| TC Insurance" | ~22 chars | MEDIUM -- Short; add descriptive keywords |
| /blog/[slug] | "{Post Title} \| TC Insurance" | Variable | OK |
| /privacidad | "Politica de Privacidad \| TC Insurance Agency Services, LLC" | ~59 chars | OK |
| /terminos | "Terminos de Uso \| TC Insurance Agency Services, LLC" | ~53 chars | OK |

**File references:**
- `src/config/site.ts:87-88` -- default title definition
- `src/app/layout.tsx:39` -- home page title
- `src/app/servicios/page.tsx:8` -- services page title
- `src/app/sobre-mi/page.tsx:8` -- about page title
- `src/app/blog/page.tsx:13` -- blog index title

**Recommendations:**
1. **[CRITICAL]** Shorten home page title to ~55 chars: `"Seguros de Salud, Vida y Gastos Finales en Texas | TC Insurance"`
2. **[MEDIUM]** Expand blog index title: `"Blog de Seguros en Texas | TC Insurance"` to include target keywords
3. **[LOW]** Fix accent: `"Sobre Mi"` should be `"Sobre Mi"` (already correct with accent in rendered HTML, but verify)

### 1.2 Meta Descriptions

| Page | Description | Length | Assessment |
|------|-------------|--------|------------|
| Home | "Asesoria bilingue en seguros de salud, vida y gastos finales para familias y duenos de negocio en Texas..." | ~145 chars | OK -- Good keywords, natural reading |
| /servicios | "Catalogo tecnico de coberturas: salud, vida, gastos finales, dental, Medicare, vision y polizas de indemnizacion." | ~113 chars | OK |
| /sobre-mi | "Conoce a Yuri Tatiana Castaneda Carmona, agente integral de seguros de salud y vida en Dallas, Texas." | ~101 chars | OK -- Could be slightly longer (aim for 150-160) |
| /blog | "Educacion en seguros de salud, vida y gastos finales para familias en Texas." | ~76 chars | MEDIUM -- Too short, missing CTA or value prop |
| /privacidad | "Politica de privacidad de TC Insurance, LLC para el tratamiento de datos personales en Texas, Estados Unidos." | ~110 chars | OK |
| /terminos | "Terminos de uso y alcance informativo de los servicios de asesoria en seguros de TC Insurance, LLC." | ~100 chars | OK |

**Recommendations:**
1. **[MEDIUM]** Expand blog description to ~150 chars with CTA: `"Guias practicas sobre seguros de salud, vida y gastos finales en Texas. Aprende a comparar planes y proteger a tu familia. Lee nuestro blog."`
2. **[MEDIUM]** Expand about page description: `"Conoce a Tatiana Castaneda, agente bilingue de seguros en Dallas, TX. Asesoria personalizada en salud, vida y gastos finales para familias en Texas."`

### 1.3 Canonical URLs

| Page | Has Canonical | Assessment |
|------|---------------|------------|
| Home (`/`) | Yes -- `src/app/layout.tsx:42` | OK |
| /blog | Yes -- `src/app/blog/page.tsx:17` | OK |
| /blog/[slug] | Yes -- `src/app/blog/[slug]/page.tsx:147` | OK |
| /servicios | **No** | CRITICAL -- Missing |
| /sobre-mi | **No** | CRITICAL -- Missing |
| /privacidad | **No** | HIGH -- Missing |
| /terminos | **No** | HIGH -- Missing |

**Recommendation:**
- **[CRITICAL]** Add `alternates: { canonical: "..." }` to metadata exports in `/servicios`, `/sobre-mi`, `/privacidad`, and `/terminos` pages. Without canonicals, search engines may index duplicate URL variants.

**Fix example for `src/app/servicios/page.tsx`:**
```tsx
export const metadata: Metadata = {
  title: `Servicios | ${siteConfig.brand.name}`,
  description: "...",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/servicios`,
  },
};
```

---

## 2. Heading Hierarchy Audit

### 2.1 Home Page (`/`)

| Level | Text | Source |
|-------|------|--------|
| H1 | "Seguros de salud, vida y gastos finales para familias en Texas." | `HeroSection.tsx:120-131` |
| H2 | "Servicios para cada etapa de vida" | `Services.tsx:196` |
| H3 | (7 service cards with H3 titles) | `ServiceCard.tsx:22` |
| H2 | "Como funciona" | `Process.tsx:101` |
| H3 | (4 process step H3 titles) | `Process.tsx:110` |
| H2 | (Stats section -- NO H2) | `Stats.tsx` -- **MISSING** |
| H2 | "Historias de clientes en Texas" | `Testimonials.tsx:138` |
| H2 | "Guias recientes para decidir mejor" | `BlogList.tsx:128` |
| H3 | (Blog post titles) | `BlogList.tsx:162, 212` |
| H2 | "Resolvemos dudas antes de decidir" | `FAQ.tsx:115` |
| H3 | (FAQ questions) | `FAQ.tsx:129` |
| H2 | "Asesoria gratuita." | `Contact.tsx:261-268` |
| H3 | (Footer: Oficina, Navegacion, Legal, Social) | `Footer.tsx:165-215` |

**Assessment:** Generally excellent heading hierarchy. One H1 on the page, logical H2/H3 nesting.

**Issues:**
1. **[MEDIUM]** Stats section (`Stats.tsx`) has no H2 heading -- only a `<p>` kicker "Confianza". This breaks the semantic document outline. Add an H2 like "Indicadores de confianza" or "Nuestro compromiso".
2. **[LOW]** Blog post page (`[slug]/page.tsx:51-53`): Content `####` renders as H3 and `###` renders as H2. This is semantically correct within the article context but could confuse the outline since the page already has an H1 and H2 ("Articulos relacionados"). This is acceptable.

### 2.2 Other Pages

| Page | H1 | H2+ | Assessment |
|------|-----|------|------------|
| /servicios | "Servicios especializados." | (services cards with H3) | OK -- one H1 |
| /sobre-mi | "Sobre Yuri." | (Philosophy section headings) | OK |
| /blog | "Blog estrategico." | (no additional headings in page itself) | OK |
| /blog/[slug] | "{post.title}" | "Articulos relacionados" | OK |
| /privacidad | "Politica de Privacidad" | None | OK for legal page |
| /terminos | "Terminos de Uso" | None | OK for legal page |

---

## 3. Keyword Strategy Audit

### 3.1 Primary Keywords (Spanish)

| Keyword | Home | /servicios | /sobre-mi | /blog | Blog Posts |
|---------|------|------------|-----------|-------|------------|
| "seguros de salud en Texas" | H1 | description | description | -- | content |
| "seguro de vida Texas" | H1 | description | -- | -- | title |
| "gastos finales" | H1 | description | -- | -- | title |
| "asesoria de seguros" | meta desc | -- | -- | -- | -- |
| "seguro bilingue" / "asesoria bilingue" | meta desc | -- | description | -- | -- |
| "seguros para familias" | H1 + body | -- | body | -- | -- |
| "Dallas TX seguros" | -- | -- | body | -- | -- |
| "Medicare Texas" | -- | card | -- | -- | -- |
| "seguro dental Texas" | -- | card | -- | -- | -- |

**Assessment:** The site has reasonable keyword coverage for core terms but several opportunities are missed.

### 3.2 Missing Keyword Opportunities

**[HIGH] Missing from content and headings:**
- "comparar seguros en Texas" -- high-intent keyword matching the value prop
- "agente de seguros en Dallas" / "agente de seguros hispanohablante" -- local intent
- "mejor seguro de salud Texas" -- transactional keyword
- "seguro de vida para familias" -- long-tail with commercial intent
- "cuanto cuesta un seguro de salud en Texas" -- informational, blog opportunity
- "ACA/Obamacare Texas" -- high-volume informational keyword
- "Open Enrollment Texas" -- seasonal, high-volume

**[MEDIUM] LSI (Latent Semantic Indexing) terms to weave in:**
- "prima mensual", "deducible", "copago", "red medica"
- "beneficiario", "poliza de vida permanente", "poliza temporal"
- "plan Advantage", "Part D", "suplemento Medicare"
- "subsidio de salud", "Marketplace"

### 3.3 Blog Keyword Targeting

| Blog Post | Target Keyword | In Title | In Content | Assessment |
|-----------|----------------|----------|------------|------------|
| gastos-finales-arquitectura-financiera | "gastos finales" | Yes | Yes | OK |
| como-elegir-plan-de-salud-en-texas | "plan de salud en Texas" | Yes | Yes | GOOD |
| seguro-de-vida-liquidez-familiar | "seguro de vida" | Yes | Yes | OK |

**Recommendations:**
1. **[HIGH]** Create new blog posts targeting high-volume keywords: "Medicare para hispanos en Texas", "Que cubre el seguro de salud en Texas", "Como funciona el Open Enrollment"
2. **[HIGH]** Add "Texas" and "Dallas" to more page titles and headings for local SEO signal
3. **[MEDIUM]** Include English equivalent keywords in a natural way (e.g., "health insurance" alongside "seguro de salud") since many bilingual users search in both languages

---

## 4. Structured Data Audit

### 4.1 LocalBusiness JSON-LD (`LocalBusinessJsonLd.tsx`)

**Present fields:**
- @type: "InsuranceAgency" -- Correct
- name, url, telephone, areaServed, address (PostalAddress)
- geo (conditional on env vars)
- sameAs (empty array + social URLs)
- WebSite node with publisher reference
- WebPage node with about reference

**Missing fields:**
1. **[CRITICAL]** `image` -- Google recommends logo/image for rich results
2. **[CRITICAL]** `logo` -- Required for Knowledge Panel
3. **[HIGH]** `openingHours` -- Important for local SEO
4. **[HIGH]** `priceRange` -- Google uses for local pack
5. **[HIGH]** `description` -- The business description
6. **[MEDIUM]** `hasOfferCatalog` -- Could list service types
7. **[MEDIUM]** `founder` -- Named person for E-E-A-T signals
8. **[LOW]** `aggregateRating` -- Testimonials exist but not in schema

**Fix example for `src/components/LocalBusinessJsonLd.tsx`:**
```tsx
{
  "@type": siteConfig.business.type,
  "@id": organizationId,
  name: siteConfig.business.name,
  url: siteConfig.seo.siteUrl,
  telephone: siteConfig.business.telephone,
  areaServed: siteConfig.business.areaServed,
  image: `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultOgImage}`,
  logo: `${siteConfig.seo.siteUrl}${siteConfig.brand.logoPath}`,
  description: siteConfig.seo.defaultDescription,
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  founder: {
    "@type": "Person",
    name: "Yuri Tatiana Castaneda Carmona",
  },
  // ... rest
}
```

### 4.2 FAQ Schema (`FaqJsonLd.tsx`)

**Assessment:** Correct FAQPage schema with all 8 questions plus an extra "Como empiezo?" question. Properly formatted with Question/Answer pairs.

**Issue:**
- **[LOW]** The extra hardcoded question at `FaqJsonLd.tsx:17-23` ("Como empiezo?") is not in the visible FAQ section, creating a minor mismatch between visible content and schema (Google prefers 1:1 match).

### 4.3 Article Schema (`src/app/blog/[slug]/page.tsx:213-238`)

**Assessment:** Good Article schema with headline, description, datePublished, author, publisher, wordCount, articleSection, and inLanguage.

**Issues:**
1. **[MEDIUM]** `dateModified` is identical to `datePublished` (`page.tsx:219`). If content is updated, this should reflect the actual modification date. For now, consider removing `dateModified` if it can't be tracked separately.
2. **[MEDIUM]** `keywords` field only contains the category (e.g., "LEGADO"). Should include more specific keywords related to the article.
3. **[LOW]** Missing `thumbnailUrl` field.

### 4.4 BreadcrumbList Schema (`src/app/blog/[slug]/page.tsx:189-212`)

**Assessment:** Correctly implemented for blog post pages with Inicio > Blog > Post Title. Good.

**Missing:**
- **[MEDIUM]** No breadcrumb schema on `/servicios`, `/sobre-mi` pages. These would benefit from BreadcrumbList for search appearance.

### 4.5 Missing Schema Opportunities

1. **[HIGH]** **Review/AggregateRating** -- 6 testimonials exist with ratings. Adding AggregateRating to LocalBusiness would enable star ratings in search results.
2. **[MEDIUM]** **Service schema** -- Could add `Service` or `FinancialProduct` schema for each insurance type.
3. **[LOW]** **Person schema** for the founder (Tatiana Castaneda) -- would strengthen E-E-A-T signals.

---

## 5. Internal Linking Audit

### 5.1 Navigation Links

**Global navigation** (`Navbar.tsx:12-17`):
- Servicios -> `/#servicios`
- Sobre mi -> `/sobre-mi`
- Blog -> `/blog`
- Contacto -> `/#contacto`

**Footer** (`Footer.tsx:172-195`): Mirrors navigation + adds legal links.

**Assessment:** Navigation is functional but minimal.

### 5.2 Cross-Page Links

| From | To | Anchor Text | Assessment |
|------|-----|-------------|------------|
| Home (HeroSection) | /#contacto | "Agenda asesoria gratuita" | OK - CTA |
| Home (HeroSection) | /#servicios | "Ver servicios" | OK |
| Home (BlogList) | /blog/{slug} | "Leer articulo" | OK |
| Home (BlogList) | /blog | "Ver archivo completo" | OK |
| /servicios | /#contacto | "Solicitar asesoria gratuita" | OK |
| /sobre-mi | /#contacto | "Agendar conversacion" | OK |
| /blog | / | "Volver a inicio" | OK |
| /blog/[slug] | /blog | "Volver al blog" | OK |
| /blog/[slug] | /blog/{related-slug} | Post titles | GOOD - contextual links |
| /blog/[slug] | /#contacto | "Solicitar asesoria privada" | OK |

**Issues:**
1. **[HIGH]** No internal links FROM blog posts TO service pages or specific service sections. Blog content about "gastos finales" should link to `/#servicios` or ideally a dedicated service page.
2. **[HIGH]** No link from Home to `/sobre-mi` in the main content area (only in nav). Adding a contextual link from the Philosophy/About preview section would help.
3. **[MEDIUM]** No internal links between blog posts within body content. Cross-linking related articles in the content itself (not just the "related posts" section) would strengthen topical authority.
4. **[MEDIUM]** Footer's "Journal" link text (`Footer.tsx:241`) uses English "Journal" instead of "Blog" -- inconsistent and confusing for Spanish-speaking users/crawlers.

---

## 6. Image SEO Audit

### 6.1 Alt Text Quality

| Image | Alt Text | Assessment |
|-------|----------|------------|
| Hero portrait | "Retrato profesional de Tatiana Castaneda en blanco y negro" | GOOD -- descriptive |
| Navbar logo | "TC Insurance" | OK -- concise |
| Footer logo | "TC Insurance" | OK |
| Process image | "Consultoria personalizada en seguros para familias en Texas" | GOOD -- keyword-rich |
| About portrait | "Yuri Tatiana Castaneda Carmona en sesion de asesoria" | GOOD -- descriptive |
| Blog featured | "Textura de piedra minimalista en blanco y negro con contraste suave" | MEDIUM -- decorative, not keyword-relevant |
| Related posts | Falls back to post title if no alt specified | OK |

**Recommendations:**
1. **[MEDIUM]** Blog featured image alt should include the topic keyword: `"Seguro de gastos finales - planificacion financiera familiar"` instead of a texture description
2. **[LOW]** Consider adding `width` and `height` attributes to all Image components (already handled by `next/image`).

### 6.2 Image Optimization

- All images use `next/image` with `fill`, `sizes`, and proper `priority` flags -- **GOOD**
- Hero image has `quality={72}` for performance -- **GOOD**
- `sizes` attributes are well-configured for responsive loading -- **GOOD**

---

## 7. Content Length Audit

| Page/Post | Estimated Word Count | Assessment |
|-----------|---------------------|------------|
| Home page (all sections combined) | ~800-1000 words | OK for a landing page |
| /servicios | ~50 words (intro) + services cards | MEDIUM -- Thin intro; service cards add content |
| /sobre-mi | ~30 words (intro) + about data | MEDIUM -- Depends on aboutProfile data |
| /blog (index) | ~50 words | OK for an index page |
| Blog: gastos-finales | ~300 words | HIGH -- Below recommended 600+ for SEO |
| Blog: como-elegir-plan-de-salud | ~80 words | CRITICAL -- Extremely thin content |
| Blog: seguro-de-vida-liquidez | ~80 words | CRITICAL -- Extremely thin content |
| /privacidad | ~120 words | OK for legal |
| /terminos | ~100 words | OK for legal |

**Critical Issue:** Two of three active blog posts have under 100 words of body content. This is well below the minimum recommended 300 words and will likely hurt rankings. Google may view these as thin content.

**Recommendations:**
1. **[CRITICAL]** Expand `como-elegir-plan-de-salud-en-texas` to 600+ words. Add sections on: types of plans (PPO vs HMO), how to evaluate networks, deductible strategies, and a comparison table.
2. **[CRITICAL]** Expand `seguro-de-vida-liquidez-familiar` to 600+ words. Add sections on: term vs whole life, how to calculate coverage, beneficiary considerations, and cost factors.
3. **[HIGH]** Target 800-1200 words for pillar blog posts to compete in search results.

---

## 8. Local SEO Audit

### 8.1 NAP (Name, Address, Phone) Consistency

| Element | Value | Source | Consistent |
|---------|-------|--------|------------|
| Name | "TC Insurance Agency Services, LLC" | `site.ts:42, 94` | Yes |
| Address | "14951 Dallas Pkwy Suite 240, Dallas, TX 75254" | `site.ts:58` | Yes |
| Phone | "+1 (203) 993-2369" | `site.ts:21` | Yes |

**Assessment:** NAP is consistent across the site. However:
- **[MEDIUM]** The phone area code (203) is a Connecticut area code, not a Texas area code. This could create confusion or trust issues for local SEO in Dallas/Texas. If this is the actual business number, it's fine, but consider adding a local Texas number.

### 8.2 Geo Meta Tags

Present in `layout.tsx:93-106`:
- `geo.region`: "US-TX" -- Correct
- `geo.placename`: Full address -- Correct
- `geo.position`: Conditional on env vars -- **ISSUE: env vars may be empty in production**
- `ICBM`: Same conditional

**Recommendation:**
- **[HIGH]** Ensure `NEXT_PUBLIC_GEO_LAT` and `NEXT_PUBLIC_GEO_LNG` are set in production. Without these, the geo meta tags and LocalBusiness geo coordinates are omitted, weakening local SEO signals.

### 8.3 Local Keywords

**Present:** "Dallas", "Texas", "TX", "familias en Texas"
**Missing:**
- **[HIGH]** DFW metro area cities (Plano, Irving, Lewisville, Fort Worth, Denton, Arlington) -- these appear in testimonials but not in headings or meta tags
- **[MEDIUM]** "Dallas-Fort Worth", "DFW" as explicit keywords
- **[MEDIUM]** "seguros cerca de mi" / "agente de seguros cerca de mi" -- common voice search query

### 8.4 Google Business Profile Signals

- **[HIGH]** `sameAs` array in LocalBusiness is effectively empty (`site.ts:112` -- `[] as string[]`). Social URLs are appended but only Instagram and Facebook have default values; LinkedIn is null. This weakens the Knowledge Panel connection.
- **[MEDIUM]** No Google Business Profile URL in `sameAs`. If the business has a GBP listing, it should be added.

---

## 9. Bilingual SEO Audit

### 9.1 Language Tags

- `<html lang="es">` -- `layout.tsx:88` -- Correct for Spanish content
- `locale: "es_US"` in OpenGraph -- Correct
- `inLanguage: "es-US"` in JSON-LD -- Correct

### 9.2 Hreflang Tags

**[CRITICAL]** No hreflang tags present anywhere. The site serves Spanish content to a US audience that also searches in English.

**Recommendation:**
At minimum, add self-referencing hreflang and x-default:
```html
<link rel="alternate" hreflang="es-US" href="https://www.tcinsurance-llc.com/" />
<link rel="alternate" hreflang="x-default" href="https://www.tcinsurance-llc.com/" />
```

This tells Google this is the Spanish version targeting the US market and is also the default version. Even without an English version of the site, this helps Google understand targeting.

### 9.3 Bilingual Keyword Coverage

The site content is entirely in Spanish, which is correct for the target audience. However:
- **[MEDIUM]** English keywords like "health insurance", "life insurance", "final expense" appear only in service card subtitles (`ServiceCard.tsx:23`). Consider adding them to meta descriptions or alt text where natural.
- **[MEDIUM]** Blog posts could include parenthetical English terms (e.g., "gastos finales (*final expense*)") -- the featured blog post already does this effectively.

---

## 10. Technical SEO Audit

### 10.1 robots.ts (`src/app/robots.ts`)

```ts
rules: [{ userAgent: "*", allow: "/" }],
sitemap: `${siteConfig.seo.siteUrl}/sitemap.xml`,
```

**Issues:**
1. **[HIGH]** No `disallow` for `/api/` routes. API endpoints (`/api/contact`, `/api/lead`, `/api/newsletter`) should be blocked from crawling.
2. **[LOW]** Consider disallowing `/_next/` if not already handled by Next.js defaults.

**Fix:**
```ts
rules: [
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/"],
  },
],
```

### 10.2 Sitemap (`src/app/sitemap.ts`)

**Present routes:**
- All 6 static pages (/, /servicios, /sobre-mi, /blog, /privacidad, /terminos)
- All 7 blog posts (including legacy/archived ones)

**Issues:**
1. **[MEDIUM]** Legacy blog posts (status: "legacy") are included in the sitemap but hidden from the blog listing. This is inconsistent -- either include them in the listing or exclude them from the sitemap. If they are intentionally archived, consider setting `priority: 0.3` or excluding them.
2. **[LOW]** `lastModified` for static routes uses `new Date()` which changes on every build. Consider using actual file modification dates or a fixed date for truly static pages.

### 10.3 OpenGraph Tags

**All pages have OG tags.** Good coverage:
- `og:type` -- "website" for pages, "article" for blog posts
- `og:title`, `og:description`, `og:url`, `og:site_name`, `og:locale`
- `og:image` with dimensions (1200x630)
- Twitter cards with `summary_large_image`

**Issues:**
1. **[MEDIUM]** `/servicios` and `/sobre-mi` pages don't have explicit OpenGraph tags -- they inherit from the root layout. This means their OG title/description will be the home page's values rather than their own. Add explicit `openGraph` to their metadata exports.

### 10.4 Font Loading

- Archivo: `display: "optional"` -- Good for CLS prevention
- IBM Plex Mono: `display: "swap"` -- Acceptable

### 10.5 Performance Signals

- GSAP and ScrollTrigger are lazy-loaded via dynamic `import()` -- Good
- Lenis smooth scroll respects `prefers-reduced-motion` -- Good
- Images use `priority` on above-the-fold content -- Good
- Google Maps iframe is lazy-loaded with user opt-in (`Contact.tsx:506-528`) -- Excellent

---

## 11. Priority-Ranked Recommendations

### CRITICAL (Immediate Action Required)

| # | Issue | File | Fix |
|---|-------|------|-----|
| C1 | Home title too long (~86 chars) | `src/config/site.ts:87-88` | Shorten to ~55 chars: "Seguros de Salud, Vida y Gastos Finales en Texas \| TC Insurance" |
| C2 | Missing canonical URLs on 4 pages | `src/app/servicios/page.tsx`, `sobre-mi/page.tsx`, `privacidad/page.tsx`, `terminos/page.tsx` | Add `alternates: { canonical: "..." }` to each |
| C3 | Blog posts critically thin | `src/data/blogPosts.ts` | Expand 2 posts from ~80 words to 600+ words each |
| C4 | LocalBusiness missing `image` and `logo` | `src/components/LocalBusinessJsonLd.tsx` | Add image URL and logo URL to the schema |
| C5 | No hreflang tags | `src/app/layout.tsx` | Add self-referencing hreflang="es-US" and x-default |

### HIGH (Fix This Week)

| # | Issue | File | Fix |
|---|-------|------|-----|
| H1 | robots.txt allows crawling of /api/ routes | `src/app/robots.ts` | Add `disallow: ["/api/"]` |
| H2 | LocalBusiness missing openingHours, priceRange, description | `src/components/LocalBusinessJsonLd.tsx` | Add these properties |
| H3 | Geo coordinates likely empty in production | `.env` / deployment config | Ensure GEO_LAT and GEO_LNG are set |
| H4 | No internal links from blog content to service sections | `src/data/blogPosts.ts` | Add contextual links within blog content |
| H5 | sameAs array empty in LocalBusiness | `src/config/site.ts:112` | Add Google Business Profile URL and verify social URLs |
| H6 | No AggregateRating schema | `src/components/LocalBusinessJsonLd.tsx` | Add AggregateRating from testimonial data |
| H7 | Stats section missing H2 heading | `src/components/Stats.tsx` | Add semantic H2 heading |
| H8 | Missing breadcrumb schema on /servicios, /sobre-mi | These page files | Add BreadcrumbList JSON-LD |

### MEDIUM (Fix This Month)

| # | Issue | File | Fix |
|---|-------|------|-----|
| M1 | OG tags missing on /servicios, /sobre-mi | Page metadata exports | Add explicit openGraph to metadata |
| M2 | Blog index title too short | `src/app/blog/page.tsx:13` | Expand to "Blog de Seguros en Texas \| TC Insurance" |
| M3 | Blog description too short | `src/app/blog/page.tsx:15` | Expand to ~150 chars with CTA |
| M4 | Legacy posts in sitemap but hidden from listing | `src/app/sitemap.ts` | Lower priority or exclude |
| M5 | Article keywords only contain category | `src/app/blog/[slug]/page.tsx:238` | Add specific keywords array to blog posts |
| M6 | No cross-links between blog posts in body | `src/data/blogPosts.ts` | Add markdown links within content |
| M7 | Footer uses "Journal" instead of "Blog" | `src/components/Footer.tsx:241` | Change to "Blog" for consistency |
| M8 | Missing local city keywords in content | Various components | Mention DFW cities in body copy |
| M9 | Featured image alt text not keyword-relevant | `src/data/blogPosts.ts:30` | Use topic-relevant alt text |
| M10 | dateModified same as datePublished | `src/app/blog/[slug]/page.tsx:219` | Track actual modification dates or remove field |

### LOW (Backlog)

| # | Issue | File | Fix |
|---|-------|------|-----|
| L1 | Extra FAQ in schema not in visible content | `src/components/FaqJsonLd.tsx:17` | Remove or add to visible FAQ |
| L2 | No Service schema for insurance products | -- | Add Service/FinancialProduct schema |
| L3 | No Person schema for founder | -- | Add Person schema for E-E-A-T |
| L4 | CT area code (203) for TX business | `src/config/site.ts:19` | Consider adding local TX number |
| L5 | English terms only in service subtitles | `src/components/ServiceCard.tsx:23` | Weave into meta/alt where natural |

---

## 12. Keyword Recommendations by Page

### Home Page
**Primary:** "seguros de salud vida y gastos finales en Texas"
**Secondary:** "asesoria de seguros bilingue", "agente de seguros en Dallas", "comparar seguros Texas"
**Long-tail:** "mejor seguro de salud para familias en Texas", "seguro de gastos finales en Dallas TX"

### /servicios
**Primary:** "servicios de seguros en Texas", "tipos de seguros de salud"
**Secondary:** "seguro dental Texas", "Medicare Dallas TX", "seguro de vision"
**Long-tail:** "comparar planes de salud PPO HMO Texas", "seguro de indemnizacion que es"

### /sobre-mi
**Primary:** "agente de seguros en Dallas TX", "Tatiana Castaneda seguros"
**Secondary:** "agente bilingue de seguros", "asesoria personalizada seguros"
**Long-tail:** "agente de seguros de salud hispanohablante Dallas"

### /blog
**Primary:** "blog de seguros en Texas", "educacion en seguros de salud"
**Secondary:** "guias de seguros para familias", "articulos sobre seguros de vida"

### Blog Posts (New Content Opportunities)
1. "Que cubre el seguro de salud en Texas: Guia completa [2026]"
2. "Medicare para hispanohablantes: Todo lo que necesitas saber"
3. "Open Enrollment 2026: Fechas y como prepararte en Texas"
4. "Seguro de salud vs. indemnizacion: Cual necesitas?"
5. "5 errores al elegir seguro de vida (y como evitarlos)"

---

## 13. Competitor Content Gaps

Based on common insurance search patterns in Spanish for Texas, the site is missing content on:

1. **ACA/Marketplace/Obamacare** -- High-volume keyword cluster with zero coverage
2. **Cost-focused content** -- "cuanto cuesta un seguro de salud/vida en Texas" queries
3. **Comparison content** -- "HMO vs PPO", "term vs whole life", "Medicare Advantage vs Supplement"
4. **Seasonal content** -- Open Enrollment, tax season (1095 forms), Medicare Annual Enrollment
5. **FAQ-style blog posts** -- "Se puede tener dos seguros de salud?", "Que pasa si no tengo seguro"

---

*End of SEO Audit Report*
*Generated: February 9, 2026*
