# SEO Agent — Design Spec

**Date:** 2026-03-29
**Status:** Draft
**Scope:** Claude Code skill + specialized agents for automated SEO management of TC Insurance

---

## Context

TC Insurance (tcinsurancetx.com) is a local insurance agency in Texas serving Spanish-speaking families. The site already has solid SEO foundations: JSON-LD structured data, dynamic sitemap/robots.txt, GA4+GTM+Meta Pixel tracking, consent management, and a Playwright audit script. However, SEO management is manual — there's no systematic way to audit, track, or optimize SEO across all dimensions. This agent automates that workflow as a Claude Code skill.

---

## Architecture

### Skill: `/seo [sub-command]`

A Claude Code skill (`/.claude/skills/seo/SKILL.md`) that acts as router and orchestrator.

**Sub-commands:**

| Command | Agent Dispatched | Description |
|---------|-----------------|-------------|
| `/seo audit` | seo-technical (audit mode) | Technical SEO: crawlability, structured data, Core Web Vitals, site structure |
| `/seo onpage` | seo-technical (onpage mode) | On-Page SEO: title tags, meta descriptions, headings, internal linking |
| `/seo analytics` | seo-technical (analytics mode) | Analytics setup: GTM, GA4, Meta Pixel, event tracking, consent |
| `/seo content` | seo-content | Content SEO: topical authority, clusters, keywords, search intent, gaps |
| `/seo local` | seo-local | Local SEO: NAP consistency, LocalBusiness schema, location pages, GBP |
| `/seo ai` | seo-ai | AI SEO: GEO readiness, LLM visibility, E-E-A-T, citability |
| `/seo full` | ALL (parallel) | Run all agents, consolidate into comprehensive report |
| `/seo report` | none | Show latest report or compare with previous |

**Skill behavior:**
1. Parse sub-command from skill args
2. If the sub-command needs site data, run `scripts/seo-crawl.mjs` first
3. Dispatch the appropriate agent(s) via the Agent tool
4. Collect results and save report to `docs/seo/reports/YYYY-MM-DD-{type}.md`
5. Present summary to user with prioritized findings and suggested fixes

### File Structure

```
.claude/
├── skills/seo/SKILL.md              # Main skill (router + orchestrator)
├── agents/
│   ├── seo-technical.md             # Technical + On-Page + Analytics agent
│   ├── seo-content.md               # Content SEO agent
│   ├── seo-local.md                 # Local SEO agent
│   └── seo-ai.md                    # AI/GEO SEO agent
scripts/
│   └── seo-crawl.mjs               # Site crawler/data extractor
docs/seo/
│   └── reports/                     # Historical reports directory
```

---

## Agent Specifications

### Agent: seo-technical.md

**Model:** sonnet
**Tools:** Read, Glob, Grep, Bash, WebFetch, WebSearch

Handles three modes based on the prompt it receives:

#### Audit Mode (Technical SEO)
- Run `scripts/seo-crawl.mjs` and analyze the crawl data JSON
- Validate `robots.txt` rules (correct disallows, sitemap reference)
- Validate `sitemap.xml` completeness (all active pages included, no legacy/noindex pages, correct priorities)
- Verify structured data (JSON-LD) against schema.org requirements for each page type:
  - Home: Organization + WebSite + LocalBusiness + FAQPage
  - Blog posts: Article + BreadcrumbList + optional FAQPage
  - Service pages: BreadcrumbList + ItemList + Service
- Check canonical tags on every page (present, correct URL, no self-referencing loops)
- Analyze Core Web Vitals via Playwright navigation timing (FCP, LCP)
- Detect broken links (internal 404s, external dead links)
- Check mobile meta viewport, tap target sizes
- Verify image optimization (alt text presence, next/image usage, proper dimensions)
- Check for render-blocking resources

#### On-Page Mode
- Audit title tags: length (50-60 chars ideal), keyword presence, uniqueness across all pages
- Audit meta descriptions: length (150-160 chars ideal), relevance, uniqueness, call-to-action presence
- Analyze heading hierarchy per page: single H1, logical H2-H6 nesting
- Map internal linking: build link graph, identify orphan pages, calculate link depth
- Evaluate URL structure: slug readability, depth (max 3 levels), no parameters
- Detect thin content (pages with < 300 words)
- Check for content duplication between pages
- Evaluate keyword usage in titles, headings, first paragraph, alt text

#### Analytics Mode
- Verify GTM container loads correctly (check GoogleTagManager component)
- Verify GA4 tag fires (gtag script present, correct measurement ID)
- Verify Meta Pixel initialization (fbq script, correct pixel ID)
- Audit consent mode implementation (default denied for GDPR, grants on acceptance)
- Check event tracking coverage:
  - Form submissions (contact, lead, newsletter) → tracked?
  - CTA clicks (WhatsApp, phone, email) → tracked?
  - Navigation events → tracked?
- Verify conversion tracking setup (Google Ads conversions, Meta standard events)
- Check for duplicate event firing (deduplication config in tracking.ts)
- Verify Vercel Analytics integration

### Agent: seo-content.md

**Model:** sonnet
**Tools:** Read, Glob, Grep, Bash, WebSearch, WebFetch

#### Responsibilities
- **Topical Authority Analysis:**
  - Read all blog posts from `src/data/blogPosts.ts`
  - Map existing content against core business topics: health insurance, life insurance, final expense insurance, Medicare, ACA/Obamacare, business insurance
  - Identify topic gaps where no content exists
  - Rate topical depth (surface-level vs. comprehensive coverage)

- **Content Cluster Mapping:**
  - Group existing posts into semantic clusters
  - Identify pillar content candidates
  - Map supporting content to pillars
  - Recommend new cluster structures

- **Keyword Research:**
  - Use WebSearch to find what people search for related to "seguros [tipo] Texas", "insurance [type] Dallas/Fort Worth"
  - Identify long-tail keywords in Spanish + English
  - Map keywords to existing pages or recommend new pages
  - Analyze search intent per keyword (informational, transactional, navigational, commercial)

- **Content Gaps & Opportunities:**
  - Compare existing content against competitor topics (via web search)
  - Identify programmatic SEO opportunities:
    - `seguro-[tipo]-[ciudad]` pages (combinatorial)
    - Seasonal content (open enrollment, Medicare enrollment periods)
    - FAQ expansion based on common questions
  - Detect stale content that needs updating (posts older than 6 months without refresh)

- **Cannibalization Detection:**
  - Find pages targeting the same primary keyword
  - Recommend consolidation or differentiation

### Agent: seo-local.md

**Model:** sonnet
**Tools:** Read, Glob, Grep, Bash, WebSearch, WebFetch

#### Responsibilities
- **NAP Consistency:**
  - Extract business name, address, phone from: `src/config/site.ts`, `src/components/Footer.tsx`, `src/components/LocalBusinessJsonLd.tsx`, all page content
  - Flag any inconsistencies in formatting, data, or missing info
  - Check phone format consistency (E.164 vs display format)

- **LocalBusiness Schema Audit:**
  - Verify JSON-LD completeness against Google's requirements:
    - `@type: InsuranceAgency` (correct type for the business)
    - Opening hours (`openingHoursSpecification`)
    - `areaServed` (all cities listed)
    - `hasOfferCatalog` (services offered)
    - `paymentAccepted`, `priceRange`
    - `knowsLanguage` (English + Spanish)
    - `sameAs` (social profiles, must be correct URLs)
  - Validate against Google's Rich Results testing criteria

- **Service Area Pages:**
  - Evaluate existing location pages (Dallas, Fort Worth, Lewisville, Irving, Denton, etc.)
  - Check for unique content on each (not just city name swapped)
  - Verify local keywords in titles, headings, content
  - Recommend new location pages for underserved areas

- **Google Business Profile Checklist:**
  - Generate actionable checklist for GBP optimization (cannot automate GBP directly):
    - Categories, services, attributes
    - Photos, posts, Q&A
    - Review response strategy
  - Verify website info matches GBP info

- **Local Citation Opportunities:**
  - Search web for business listing directories relevant to insurance/Texas
  - Generate list of directories where business should be listed
  - Check if existing citations are consistent

- **Review/Testimonial Schema:**
  - Check if testimonials have appropriate schema markup
  - Verify `aggregateRating` if applicable
  - Recommend AggregateRating schema if enough reviews exist

### Agent: seo-ai.md

**Model:** sonnet
**Tools:** Read, Glob, Grep, Bash, WebSearch, WebFetch

#### Responsibilities
- **GEO (Generative Engine Optimization) Readiness:**
  - Analyze content format for AI consumption:
    - Clear, direct answers to questions in first paragraph
    - Structured data that AI can parse (schema.org)
    - Factual claims with citations/sources
    - Lists, tables, step-by-step formats
  - Score each page on GEO readiness (0-100)

- **LLM Visibility Analysis:**
  - Test: can an AI correctly extract from the site...
    - What the business does
    - Where it operates
    - What services it offers and their details
    - How to contact the business
    - Who runs it (E-E-A-T)
  - Verify the information is unambiguous and parseable

- **E-E-A-T Signals:**
  - Experience: case studies, testimonials, years in business
  - Expertise: author bios, credentials, license info
  - Authoritativeness: awards, associations, media mentions
  - Trust: privacy policy, terms, physical address, license numbers
  - Flag missing signals and recommend additions

- **FAQ Coverage for AI:**
  - Analyze existing FAQs against common questions users ask AI about insurance in Texas
  - Use web search to find "People Also Ask" style questions
  - Recommend new FAQ entries that AI assistants would source

- **Citability Score:**
  - Does the content contain unique data, statistics, or insights?
  - Are claims specific and verifiable?
  - Is the content structured so AI can quote it?
  - Recommend improvements to make content more citable

- **Schema Completeness for Knowledge Graph:**
  - Verify all business entities are defined in structured data
  - Check `sameAs` links to authoritative profiles
  - Verify founder/employee schemas if applicable
  - Recommend additional schema types (Service, Product, Event for enrollment periods)

---

## Script: seo-crawl.mjs

**Location:** `scripts/seo-crawl.mjs`

**Usage:**
```bash
node scripts/seo-crawl.mjs [--url https://tcinsurancetx.com] [--localhost] [--output docs/seo/data/]
```

**Defaults:** `--localhost` uses `http://localhost:3000`, `--url` uses production URL

**Process:**
1. Fetch sitemap.xml from target URL
2. Parse all URLs from sitemap
3. For each URL, use Playwright to:
   - Load the page (wait for networkidle)
   - Extract: `<title>`, `<meta name="description">`, `<link rel="canonical">`, all `<h1>`-`<h6>`, all `<a href>` (internal + external), all `<img>` (src, alt), all `<script type="application/ld+json">`, word count of visible text, response status code
   - Measure: navigation timing (FCP, LCP), total load time
   - Capture: console errors, network failures
4. Output: `docs/seo/data/crawl-YYYY-MM-DD.json`

**JSON Structure:**
```json
{
  "crawlDate": "2026-03-29T13:00:00Z",
  "baseUrl": "https://tcinsurancetx.com",
  "pages": [
    {
      "url": "/",
      "statusCode": 200,
      "title": "...",
      "metaDescription": "...",
      "canonical": "...",
      "headings": { "h1": [...], "h2": [...], ... },
      "internalLinks": [...],
      "externalLinks": [...],
      "images": [{ "src": "...", "alt": "..." }],
      "structuredData": [...],
      "wordCount": 1234,
      "timing": { "fcp": 800, "lcp": 1200, "totalLoad": 2100 },
      "consoleErrors": [],
      "networkFailures": []
    }
  ]
}
```

**Reuses:** Patterns from existing `scripts/playwright-audit.mjs` (page loading, timing extraction, error capture). Does NOT replace the audit script — this is crawl-data-only for SEO agents.

---

## Report Format

**Location:** `docs/seo/reports/YYYY-MM-DD-{type}.md`
**Types:** `audit`, `onpage`, `analytics`, `content`, `local`, `ai`, `full`

**Structure:**
```markdown
# SEO Report: {Type} — {Date}

## Summary
- **Score:** X/100
- **Issues found:** N critical | N important | N minor
- **Pages analyzed:** N

## P0 — Critical Issues
### {Issue title}
- **Page(s):** /path
- **Impact:** {why this matters for rankings/traffic}
- **Current state:** {what exists now}
- **Suggested fix:**
  ```tsx
  // code suggestion
  ```

## P1 — Important Issues
...

## P2 — Improvements
...

## Quick Wins
{Top 3-5 changes that are easy to implement with highest impact}

## Next Steps
{Prioritized action items}
```

**Historical comparison:** When `/seo report` is run, if a previous report of the same type exists, the skill includes a delta summary: issues fixed, new issues, score change.

---

## Integration with Existing Infrastructure

### Reuses (no duplication)
- `src/config/site.ts` — source of truth for business data, analytics IDs
- `src/data/blogPosts.ts` — blog content analysis (read-only)
- `src/lib/tracking.ts` — analytics event configuration (read for audit)
- `src/components/LocalBusinessJsonLd.tsx` — structured data (read for validation)
- `scripts/playwright-audit.mjs` — patterns for Playwright page loading (reuse in seo-crawl.mjs)

### Does NOT replace
- `playwright-audit.mjs` — accessibility/performance audit stays separate
- `research-agent.mjs` — news content generation stays separate
- Existing design agents — no overlap with SEO

### Permissions needed
Add to `.claude/settings.json`:
```json
{
  "permissions": {
    "allow": [
      "Bash(node scripts/seo-crawl.mjs:*)"
    ]
  }
}
```

---

## Verification Plan

1. **Skill routing:** Run `/seo audit`, `/seo content`, `/seo local`, `/seo ai`, `/seo full` and verify correct agent dispatch
2. **Crawler:** Run `node scripts/seo-crawl.mjs --localhost` against dev server, verify JSON output is complete
3. **Agent accuracy:** Manually verify 5+ findings from each agent against the actual site state
4. **Report generation:** Verify reports save to correct path with correct format
5. **Report comparison:** Run same audit twice, verify delta summary works
6. **Edge cases:** Run on a page with no structured data, a blog post with FAQ, the homepage

---

## Out of Scope

- **E-commerce SEO** — TC Insurance has no products/store
- **International SEO / Hreflang** — single market (US), single language content (Spanish)
- **Enterprise SEO governance** — small business, not enterprise
- **Automated GBP management** — GBP requires manual login, agent provides checklists only
- **Auto-fixing code** — agent reports and suggests, user decides what to apply
- **External API integrations** — no Google Search Console API or GA4 API; uses code analysis + web scraping only
