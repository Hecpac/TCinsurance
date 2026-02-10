# Auditoría (Playwright)

- Base URL: `http://localhost:3000`
- Output: `output/playwright/audit-20260208-103016`
- Páginas auditadas: **7**
- Con errores en consola: **1** | Con respuestas 4xx/5xx: **1** | Con fallos de request: **0**

## Resumen por página

- `/` (status: 200, 1076ms) | axe: 4 | console errors: 2 | 4xx/5xx: 2 | req failed: 0
- `/servicios` (status: 200, 767ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/sobre-mi` (status: 200, 742ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/blog` (status: 200, 769ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/blog/gastos-finales-arquitectura-financiera` (status: 200, 972ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/privacidad` (status: 200, 712ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/terminos` (status: 200, 842ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0

## Accesibilidad (top violaciones)

- `image-redundant-alt` (impact: minor) | nodos: 8 | páginas: /, /servicios, /sobre-mi, /blog, /blog/gastos-finales-arquitectura-financiera, /privacidad, /terminos
- `landmark-complementary-is-top-level` (impact: moderate) | nodos: 5 | páginas: /, /blog, /blog/gastos-finales-arquitectura-financiera
- `heading-order` (impact: moderate) | nodos: 2 | páginas: /, /servicios
- `color-contrast` (impact: serious) | nodos: 1 | páginas: /

## Errores de consola (muestra)

- `/`: Failed to load resource: the server responded with a status of 400 (Bad Request)

## Network (muestra)

- `/`
  - 4xx/5xx: 400 image http://localhost:3000/_next/image?url=%2Fhero-video-poster.jpg&w=750&q=75
  - 4xx/5xx: 400 image http://localhost:3000/_next/image?url=%2Fhero-video-poster.jpg&w=750&q=75
