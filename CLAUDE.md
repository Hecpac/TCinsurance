# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# TC Insurance — Project Instructions

## Stack
- Next.js 16.1.6 (App Router, TypeScript, `src/` directory)
- Tailwind CSS v4 — tokens in `@theme inline` inside `src/app/globals.css`, **no** `tailwind.config.ts`
- PostCSS with `@tailwindcss/postcss`
- GSAP for animations and scroll effects
- Lenis for smooth scrolling
- Archivo font (sans) + IBM Plex Mono (monospace) via `next/font/google`
- Playwright + axe-core for accessibility and performance auditing

## Design System: Dark Modern with Blue Accents

The project uses a dark, sophisticated design with a charcoal base and cool blue accents.

### Color Palette
| Token | Hex/Value | Usage |
|-------|-----------|-------|
| `bg` / `swiss-paper` | #111318 | Main background (charcoal) |
| `fg` / `swiss-black` | #E1E2E8 | Primary text (light gray) |
| `m3-primary` / `swiss-red` | #A4C9FE | CTAs, accents (light blue) |
| `swiss-red-ink` | #D3E3FF | Hover state for CTAs (lighter blue) |
| `border` | #43474E | Standard borders (dark gray) |
| `border-soft` | rgb(164 201 254 / 0.34) | Soft borders (blue with alpha) |
| `muted` / `swiss-gray` | #BCC7DB | Secondary text, muted elements |
| `focus` | #A4C9FE | Focus indicators (light blue) |
| `m3-on-primary` | #00315C | Text on primary background (dark blue) |

**Note:** Color tokens use `swiss-*` naming for backwards compatibility, but the palette is no longer Swiss International Style. The actual implementation uses a blue accent scheme (#A4C9FE), not copper.

### Typography
| Class | Size | Weight | Tracking | Usage |
|-------|------|--------|----------|-------|
| `text-display` | clamp(3.4rem,10.8vw,9rem) | 700 | -0.055em | Hero headings |
| `text-headline` | clamp(1.8rem,4vw,3.2rem) | 700 | -0.025em | Section headings |
| `text-body` | clamp(1.03rem,1.2vw,1.12rem) | 400 | -0.01em | Body copy |
| `text-meta` | 0.74rem | 500 | 0.12em | Labels (uppercase, monospace) |

### Design Rules
- **Zero border-radius** on everything (forced globally with `* { border-radius: 0 !important; }`)
- **Single dark theme** — no light mode toggle
- **Generous spacing** — minimum `p-6` on cards, `p-8` on sections
- **Smooth scrolling** via Lenis (respects `prefers-reduced-motion`)
- **Custom cursor** on desktop (pointer: fine)
- **Material 3 inspired** surface hierarchy with `elevated`, `elevated-2`, `surface-container` variants

## Project Architecture

### Pages & Routes
```
src/app/
├── page.tsx                 # Landing page (home)
├── servicios/page.tsx       # Services page
├── sobre-mi/page.tsx        # About page
├── blog/
│   ├── page.tsx            # Blog index
│   └── [slug]/page.tsx     # Individual blog posts
├── privacidad/page.tsx      # Privacy policy
├── terminos/page.tsx        # Terms of service
└── api/
    ├── contact/route.ts     # Contact form handler (Resend email)
    ├── lead/route.ts        # Lead capture endpoint
    └── newsletter/route.ts  # Newsletter signup
```

### Components (`src/components/`)
- **Layout**: `Navbar`, `Footer`, `GridContainer`, `FloatingCTA`
- **SEO**: `LocalBusinessJsonLd`, `FaqJsonLd`, `GoogleTagManager`
- **UX**: `SmoothScroll`, `CustomCursor`, `ScrollProgress`, `SkipLink`, `HashScroller`
- **Content**: `HeroSection`, `Services`, `Process`, `Testimonials`, `FAQ`, `Contact`, `BlogList`, `Stats`, `Philosophy`, `PostCTA`, `CTAInline`

### Data Files (`src/data/`)
- `blogPosts.ts` — Blog content (markdown in `content` array), featured posts, status filtering
- `testimonials.ts` — Client testimonials
- `faq.ts` — Frequently asked questions
- `process.ts` — Service process steps
- `about.ts` — About page content

### Configuration (`src/config/site.ts`)
Centralized site configuration:
- Brand info (name, logo)
- Contact details (email, phone, WhatsApp)
- Legal info (licenses, effective dates)
- Social links (Instagram, Facebook, LinkedIn)
- Analytics IDs (GTM, GA4, Meta Pixel)
- SEO defaults (title, description, OG image)
- JSON-LD structured data (LocalBusiness)

### Utilities (`src/lib/`)
- `tracking.ts` — Universal event tracking with deduplication (GTM, GA4, Meta)
- `schedule.ts` — Background task scheduling (Scheduler API fallback)
- `gsapCardLift.ts` — GSAP card hover animations

## Code Conventions
- **Server Components by default** — add `"use client"` only when needed (GSAP, Lenis, event handlers, state)
- **PascalCase component filenames** — `HeroSection.tsx`, not `hero-section.tsx`
- **One component per file** — keep focused, avoid bloat
- **Semantic HTML** — use `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- **Prefer Tailwind utilities** — avoid inline styles
- **Accessibility first** — skip links, ARIA labels, keyboard navigation, focus management
- **Forms with honeypot** — use `website` field for spam filtering (see `api/contact/route.ts`)
- **Rate limiting** — API routes include IP-based rate limiting (see `checkRateLimit` in routes)

## Commands

### Development
```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run build         # Production build
npm run start         # Start production server
npm run lint          # ESLint check
```

### Testing & Auditing
```bash
node scripts/playwright-audit.mjs                        # Audit all pages (localhost:3000)
node scripts/playwright-audit.mjs --base-url <url>       # Audit specific URL
node scripts/playwright-audit.mjs --paths "/,/servicios" # Audit specific paths
node scripts/playwright-audit.mjs --headed               # Run with browser UI
```

**Output:** `output/playwright/audit-<timestamp>/`
- `audit.json` — Full audit data
- `audit.md` — Human-readable summary
- `<route>.png` — Full-page screenshots

**Audits include:**
- Accessibility violations (axe-core)
- SEO checks (title, meta, h1 count, canonical)
- Console errors, network failures, 4xx/5xx responses
- Performance timing (FCP, LCP via Navigation Timing API)
- Content checks (alt text, ARIA labels, form labels)

## Agent Teams (Experimental)

Agent teams allow multiple Claude Code instances to work together on complex tasks. Enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `.claude/settings.json`.

### When to Use Agent Teams
- **Research and review**: Multiple teammates investigate different aspects simultaneously
- **New modules or features**: Teammates each own a separate piece without conflicts
- **Debugging with competing hypotheses**: Test different theories in parallel
- **Cross-layer coordination**: Changes spanning frontend, backend, and tests

### How to Start a Team
Simply ask Claude to create a team with specific roles:
```
Create an agent team to refactor the authentication module. Spawn three teammates:
- One for the frontend components
- One for the backend API routes
- One for writing tests
```

### Display Modes
- **In-process** (default): All teammates in main terminal, use Shift+Up/Down to select
- **Split panes**: Each teammate in own pane (requires tmux or iTerm2)

### Best Practices
- Size tasks appropriately (self-contained units, not too large)
- Avoid file conflicts by assigning different files to each teammate
- Start with research/review tasks if new to agent teams
- Monitor and redirect teammates as needed
- Always clean up the team when done

### Key Differences vs Subagents
| | Subagents | Agent Teams |
|---|---|---|
| Communication | Report to main agent only | Direct inter-agent messaging |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Best for | Focused tasks, results-only | Complex work requiring discussion |
| Token cost | Lower (summarized results) | Higher (independent contexts) |

## Key Features & Patterns

### Blog Architecture
- **Static content** stored in `src/data/blogPosts.ts` (not CMS)
- **Status field** — `"active"` (visible) or `"legacy"` (archived, hidden from listing)
- **Featured posts** — `featured: true` flag for homepage hero
- **Content as array** — markdown strings in `content: string[]` for flexible rendering
- **Dynamic routes** — `/blog/[slug]` uses `getPostBySlug(slug)` for lookup

### Analytics & Tracking
- **Three platforms**: Google Tag Manager, GA4, Meta Pixel
- **Unified tracking** via `trackEvent(eventName, params, options)` in `lib/tracking.ts`
- **Event deduplication** — prevents double-firing (900ms window by default)
- **Auto-sanitization** — event names and param keys normalized to lowercase snake_case

### Smooth Scrolling & Animations
- **Lenis** handles smooth scroll (disabled for `prefers-reduced-motion`)
- **GSAP** + ScrollTrigger for on-scroll animations
- **Background loading** via `runBackgroundTask()` to avoid blocking main thread
- **Respects user preferences** — all motion disabled if `prefers-reduced-motion: reduce`

### SEO & Structured Data
- **JSON-LD components** in `<head>` for rich snippets (LocalBusiness, FAQ)
- **Canonical URLs** on all pages
- **OpenGraph + Twitter Cards** for social sharing
- **Locale set to `es_US`** (Spanish content, US location)

### Accessibility
- **Skip link** — jumps to main content (keyboard users)
- **Focus management** — visible focus indicators on all interactive elements
- **ARIA landmarks** — proper use of `<main>`, `<nav>`, etc.
- **Form validation** — client + server, accessible error messages
- **44×44px tap targets** on mobile (enforced via `.tap-target` class)
- **Custom cursor** hidden for screen readers, disabled on touch devices

### Form Handling
- **Honeypot spam protection** — `website` field should be empty (if filled, silently accept but don't process)
- **Rate limiting** — 4 requests per 15 minutes per IP
- **Validation** — both client and server-side (Next.js API routes)
- **Email via Resend** — requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` env vars

## Environment Variables
Required for production:
```bash
NEXT_PUBLIC_SITE_URL=https://www.tcinsurance-llc.com
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@tcinsurance-llc.com
CONTACT_FROM_EMAIL=noreply@tcinsurance-llc.com
```

## Important Notes
- **All border-radius is 0** — globally enforced, do not try to add rounded corners
- **Text alignment** — always left-aligned, even with `.text-center` class (overridden in base styles)
- **CSS custom properties** — all design tokens defined in `globals.css`, not in components
- **No client-side routing** — use Next.js `<Link>` for navigation, never `<a>` for internal links
- **Image optimization** — use `next/image` with proper `alt` text
- **Performance budgets** — audit script tracks page load times and network usage

## File Structure
```
src/
├── app/
│   ├── globals.css          # Design tokens (@theme inline), base styles
│   ├── layout.tsx            # Root layout (fonts, analytics, navbar)
│   ├── page.tsx              # Home page
│   ├── servicios/            # Services page
│   ├── sobre-mi/             # About page
│   ├── blog/                 # Blog pages (index + dynamic)
│   ├── privacidad/           # Privacy policy
│   ├── terminos/             # Terms of service
│   └── api/                  # API routes (contact, lead, newsletter)
├── components/               # Reusable UI components
├── config/
│   └── site.ts               # Centralized site configuration
├── data/                     # Static content (blog, testimonials, FAQ, etc.)
└── lib/                      # Utilities (tracking, GSAP, scheduling)
```
