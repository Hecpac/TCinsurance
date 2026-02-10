# Next.js Conventions

- Use App Router patterns — all pages in `src/app/`
- Server Components by default; add `"use client"` only when needed
- Import images with `next/image` for optimization
- Use `next/link` for internal navigation
- Metadata via `export const metadata: Metadata = { ... }` in layout/page files
- Keep `layout.tsx` minimal — avoid business logic in layouts
