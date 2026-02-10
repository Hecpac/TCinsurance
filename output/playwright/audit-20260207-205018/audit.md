# Auditoría (Playwright)

- Base URL: `http://localhost:3100`
- Output: `output/playwright/audit-20260207-205018`
- Páginas auditadas: **7**
- Con errores en consola: **0** | Con respuestas 4xx/5xx: **0** | Con fallos de request: **0**

## Resumen por página

- `/` (status: 200, 663ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/servicios` (status: 200, 563ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/sobre-mi` (status: 200, 564ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/blog` (status: 200, 577ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/blog/gastos-finales-arquitectura-financiera` (status: 200, 578ms) | axe: 2 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/privacidad` (status: 200, 563ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0
- `/terminos` (status: 200, 562ms) | axe: 1 | console errors: 0 | 4xx/5xx: 0 | req failed: 0

## Accesibilidad (top violaciones)

- `color-contrast` (impact: serious) | nodos: 11 | páginas: /servicios, /blog/gastos-finales-arquitectura-financiera
- `region` (impact: moderate) | nodos: 7 | páginas: /, /servicios, /sobre-mi, /blog, /blog/gastos-finales-arquitectura-financiera, /privacidad, /terminos
- `landmark-unique` (impact: moderate) | nodos: 1 | páginas: /
