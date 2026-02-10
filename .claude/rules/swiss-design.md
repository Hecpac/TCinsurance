# Swiss International Style Rules

When writing or modifying UI components, enforce these rules:

- Only use the four project colors: `swiss-paper`, `swiss-black`, `swiss-red`, `swiss-gray`
- Never add `rounded-*` classes — all radii are forced to 0
- Never add `shadow-*` classes unless explicitly requested
- Never add gradient utilities (`bg-gradient-*`, `from-*`, `to-*`)
- Use `text-display` for hero/section headings, `text-body` for paragraphs, `text-meta` for labels
- All `text-meta` elements must be uppercase (handled by base styles, but verify)
- Prefer generous spacing: `p-8` minimum on sections, `gap-6`+ between elements
- Use CSS Grid (`grid`, `grid-cols-*`) for layout structure
- Images and media should be full-bleed or aligned to grid columns
- Maintain strong visual hierarchy: one dominant element per section
