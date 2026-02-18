# TC Insurance - Guia de Estilo

## 1. Objetivo
Esta guia define el sistema visual y de interaccion para mantener consistencia en nuevas secciones y componentes.

## 2. Fuente de verdad
- Tokens y reglas globales: `src/app/globals.css`
- Fuentes y layout base: `src/app/layout.tsx`
- Presets de animacion: `src/config/animations.ts`
- Micro-interaccion CTA (borde animado): `src/components/ui/hover-border-gradient.tsx`

## 3. Principios de diseno
- Visual oscuro y sobrio, con acento azul frio.
- Bordes rectos (sin esquinas redondeadas).
- Jerarquia tipografica fuerte (display y headline).
- Micro-interacciones suaves, nunca distractoras.
- Accesibilidad primero (focus visible y reduced motion).

## 4. Color system
### Base
- `--color-bg`: `#111318`
- `--color-fg`: `#E1E2E8`
- `--color-border`: `#43474E`
- `--color-muted`: `#BCC7DB`
- `--color-focus`: `#A4C9FE`

### Marca / Swiss aliases
- `--color-swiss-paper`: `var(--color-bg)`
- `--color-swiss-black`: `var(--color-fg)`
- `--color-swiss-red`: `#A4C9FE`
- `--color-swiss-red-ink`: `#D3E3FF`

### Superficies y semanticos (M3)
- `--color-m3-primary`: `#A4C9FE`
- `--color-m3-primary-strong`: `#D3E3FF`
- `--color-m3-on-primary`: `#00315C`
- `--color-m3-surface-container-low`: `#0C0E13`
- `--color-m3-surface-container`: `#191C20`
- `--color-m3-surface-container-high`: `#272A2F`
- `--color-m3-outline-variant`: `rgb(164 201 254 / 0.34)`
- `--color-m3-outline-variant-strong`: `rgb(164 201 254 / 0.52)`

## 5. Tipografia
### Familias
- Sans principal: `Archivo` (variable `--font-archivo`)
- Mono/meta: `IBM Plex Mono` (variable `--font-ibm-plex-mono`)

### Escalas (tokens)
- Display: `--text-display` (peso 700, clamp grande, tracking negativo)
- Headline: `--text-headline` (peso 700)
- Body: `--text-body`
- Meta: `--text-meta` (uppercase, mono)

### Reglas
- Texto meta siempre en uppercase.
- Evitar `text-center`; el sistema fuerza alineacion izquierda.

## 6. Espaciado y layout
### Espaciado
- Escala base: `--space-0` a `--space-24`
- Convencion principal en componentes: `space-2`, `space-3`, `space-4`, `space-6`, `space-8`

### Grid
- Contenedor principal: `max-w-[1440px]`
- Padding horizontal: `px-6 md:px-20`
- Grid: 12 columnas con `gap-6`

### Breakpoints de uso comun
- Mobile: `<768px`
- Tablet/Desktop: `>=768px`
- Desktop amplio: `>=1024px` para efectos de scroll mas pesados

## 7. Bordes, radios y elevacion
- Radio global: `0` (sin redondeos; ver `* { border-radius: 0 !important; }`)
- Sombra discreta en superficies clave (hero, cards apiladas).
- Bordes con `--color-m3-outline-variant` como default.

## 8. Componentes clave
### CTA primario (`.primary-cta`)
- Fondo: gradiente azul claro.
- Texto: `#00315C`.
- Tipografia: peso alto, tracking amplio.
- Hover: aumento de contraste y sombra.
- Focus: anillo visible usando `--color-focus`.

### CTA con borde animado (`HoverBorderGradient`)
- Uso como wrapper para CTA primario en secciones.
- Mantener `className="!bg-transparent !p-0"` en wrapper cuando el boton ya define su propio fondo.
- Aplicado actualmente en:
  - `HeroSection` CTA principal
  - `CTAInline` CTA principal
  - `FAQ` CTA final

### Cards de servicio (`.service-card`)
- Fondo `surface-container`.
- Borde sutil y elevacion ligera.
- En hover: solo ajuste de borde/fondo (sin efectos exagerados).

### Formularios (`.form-control`)
- Fondo tenue (`--color-input-bg`) y borde suave.
- Focus con ring visible y contraste correcto.
- Error state con `--color-error`.

## 9. Movimiento y micro-interacciones
### Transiciones CSS
- `--transition-fast`: `320ms`
- `--transition-base`: `460ms`
- `--transition-slow`: `640ms`
- Curva: `--spring-ease`

### Presets GSAP
- Duraciones: `instant`, `fast`, `base`, `slow`, `slower`
- Eases: `expo.out`, `power2.out`, `power3.out`, `elastic.out(...)`
- Referencia: `src/config/animations.ts`

### Regla de accesibilidad
- Respetar `prefers-reduced-motion: reduce`.
- En reduced motion: minimizar o desactivar animacion.

## 10. Accesibilidad
- Focus visible obligatorio en elementos interactivos.
- Touch target en mobile: minimo `44x44`.
- Contraste alto entre texto y fondo.
- Mantener estructura semantica (`button`, `a`, headings) y atributos ARIA cuando aplique.

## 11. Do / Dont
### Do
- Reutilizar tokens CSS en vez de hardcodear colores.
- Reutilizar clases del sistema (`text-headline`, `text-body`, `text-meta`, `primary-cta`).
- Mantener coherencia de grid y espaciado.

### Dont
- No introducir bordes redondeados.
- No agregar paletas fuera del sistema sin token.
- No usar animaciones largas o invasivas en contenido principal.

## 12. Snippets recomendados
### CTA primario con borde animado
```tsx
<HoverBorderGradient as="div" duration={1.1} containerClassName="rounded-none" className="!bg-transparent !p-0">
  <Link href="/#contacto" className="primary-cta tap-target inline-flex items-center border px-5 py-3 text-meta">
    Agenda asesoria gratuita
  </Link>
</HoverBorderGradient>
```

### Encabezado de seccion
```tsx
<p className="text-meta section-kicker">Servicios</p>
<h2 className="text-headline text-swiss-black">Servicios para cada etapa de vida</h2>
<hr className="section-rule border-t" />
```

## 13. Mantenimiento
- Si cambias tokens globales, actualizar esta guia en el mismo PR.
- Si agregas un patron visual nuevo (ej. nuevo tipo de card o CTA), documentar:
  - objetivo
  - clases/tokens usados
  - ejemplo de uso
