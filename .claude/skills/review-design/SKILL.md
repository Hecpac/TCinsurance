---
name: review-design
description: Reviews components and pages for Swiss International Style compliance. Checks color usage, typography, spacing, and design rules. Use when reviewing UI code or before shipping.
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob
---

# Design System Review

Review all components in `src/components/` and pages in `src/app/` for Swiss International Style compliance.

## Checklist

### Colors
- [ ] Only uses `swiss-paper`, `swiss-black`, `swiss-red`, `swiss-gray`
- [ ] No hardcoded hex values or other Tailwind color utilities (no `bg-white`, `text-gray-500`, etc.)

### Typography
- [ ] Headings use `text-display`
- [ ] Body text uses `text-body`
- [ ] Labels/captions use `text-meta`
- [ ] No arbitrary font sizes (`text-sm`, `text-lg`, etc.) — only design tokens

### Layout & Spacing
- [ ] No `rounded-*` classes anywhere
- [ ] No `shadow-*` classes
- [ ] No gradient utilities
- [ ] Generous whitespace (minimum `p-8` on sections)
- [ ] Grid-based layouts where appropriate

### Code Quality
- [ ] `"use client"` only where needed
- [ ] Semantic HTML elements used
- [ ] TypeScript Props interfaces defined
- [ ] Components are focused (single responsibility)

## Output Format

For each issue found, report:
- **File**: path and line number
- **Issue**: what violates the design system
- **Fix**: specific correction to apply

End with a summary: total files reviewed, issues found, compliance score (percentage of files with zero issues).
