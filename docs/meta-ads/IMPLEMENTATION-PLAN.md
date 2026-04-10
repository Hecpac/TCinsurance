# Plan de Implementacion — Meta Ads TC Insurance

## Resumen

Lanzamiento de campanas de Meta Ads para TC Insurance en 4 fases, partiendo de un solo producto (Seguro de Salud ACA) y escalando a la cartera completa. Presupuesto inicial conservador con escalamiento basado en datos.

---

## Fase 0: Infraestructura (Semana 1)

### Prerequisitos tecnicos

- [ ] **Meta Business Suite** — verificar que TC Insurance tenga Business Manager configurado
- [ ] **Meta Pixel** — ya instalado en el sitio (verificar que dispare `PageView` y `Lead` correctamente)
- [ ] **Eventos de conversion** — configurar Custom Conversion para:
  - `Lead` → formulario de contacto enviado
  - `Schedule` → clic en WhatsApp/telefono (ya trackeado via `trackEvent` en `lib/tracking.ts`)
- [ ] **Dominio verificado** — verificar `tcinsurancetx.com` en Business Manager para Aggregated Event Measurement
- [ ] **CAPI (Conversions API)** — configurar server-side events via la API route `/api/lead` para mejorar match rate
- [ ] **UTM template** — crear plantilla estandar:
  ```
  utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}
  ```
- [ ] **Custom Audiences** — crear:
  - Website visitors (7 days, 30 days, 90 days)
  - Lead form submissions (30 days)
  - Upload de lista de clientes existentes (exclusion)
- [ ] **Exclusion lists** — clientes actuales + leads recientes en todas las campanas de prospeccion

### Activos de marca

- [ ] Logo TC Insurance en formato cuadrado (1:1) para perfil de anunciante
- [ ] 3-5 fotos de Tatiana (alta resolucion, fondo limpio)
- [ ] Plantillas Canva con identidad TC Insurance (fondo #111318, acento #A4C9FE, sin border-radius)
- [ ] Banco de imagenes aprobadas (familias, consultas, documentos)

### Landing pages

- [ ] Verificar que cada producto tenga landing page dedicada con formulario:
  - `/servicios/seguro-salud-texas` → Salud/ACA
  - `/servicios/seguro-vida-dallas` → Vida
  - `/servicios/seguro-gastos-finales-texas` → Gastos Finales
  - `/servicios/medicare-texas` → Medicare
  - `/servicios/seguro-dental-texas` → Dental
  - `/servicios/seguro-indemnizacion-texas` → Indemnizacion
- [ ] Verificar que el formulario de contacto (`/api/contact`) dispare evento `Lead` en Meta Pixel
- [ ] Verificar que el boton de WhatsApp dispare evento `Schedule` en Meta Pixel

---

## Fase 1: Campana Piloto — Seguro de Salud (Semanas 2-5)

### Por que empezar con Salud

- Mayor demanda (ACA, subsidios, Medicaid transitions)
- Contenido existente fuerte (blog posts con datos, FAQs)
- Estacionalidad favorable si se acerca OEP o SEP
- Mayor volumen de busquedas y awareness en el mercado latino

### Estructura de campana

```
CAMPANA: [CBO] Seguro de Salud ACA — DFW
  Budget: $20-30/dia ($600-900/mes)
  Objetivo: Leads
  Optimization: Maximize conversions

  AD SET: Broad — DFW — 25-65
    Ubicacion: Dallas-Fort Worth (25 mi radius)
    Edad: 25-65
    Genero: Todos
    Idiomas: Spanish + English
    Intereses: NINGUNO (broad)
    Exclusiones: Clientes existentes, leads 30d, visitantes 7d
    Placements: Advantage+ (dejar que Meta optimice)

    AD 1: [Static] Comparison table — Bronze vs Silver vs Gold
    AD 2: [Static] "Asesoria gratuita — desde $0/mes con subsidio"
    AD 3: [Yapper] Tatiana explica subsidios ACA 2026 (30s)
    AD 4: [Static] Testimonial — cliente ahorro real
```

### Creative batch inicial (8 piezas)

| # | Formato | Concepto | Hook |
|---|---------|----------|------|
| 1 | Static 4:5 | Tabla comparativa planes | "Bronze, Silver o Gold: cual es para ti?" |
| 2 | Static 4:5 | Precio con subsidio | "Seguro de salud desde $0/mes en Texas" |
| 3 | Static 1:1 | Pregunta directa | "Sin seguro en Texas? Tienes opciones" |
| 4 | Yapper 9:16 | Tatiana explica subsidios | "Si tu prima subio en 2026, esto paso..." |
| 5 | Static 4:5 | Checklist | "5 cosas que necesitas saber antes de elegir" |
| 6 | Static 4:5 | Urgencia/SEP | "Perdiste Medicaid? Tienes 60 dias" |
| 7 | Yapper 9:16 | Freelancer angle | "Freelancer en Dallas? Tu seguro no tiene que ser caro" |
| 8 | Static 4:5 | Social proof | "25+ familias asesoradas este mes" |

### KPIs semana 2-5

| Metrica | Target |
|---------|--------|
| CPL (Cost per Lead) | < $80 |
| CTR (Click-Through Rate) | > 1.5% |
| Frecuencia (7 dias) | < 2.0 |
| Net new reach | > 70% |
| Leads/semana | 5-10 |
| CPMr | < $15 |

### Cadencia de revision

- **Dia 3:** Verificar que Pixel dispara correctamente, leads llegan al CRM
- **Dia 7:** Primer check de metricas. No pausar nada todavia (datos insuficientes)
- **Dia 14:** Evaluar ads individualmente. Pausar los que tengan CTR < 0.8% con 1,000+ impresiones
- **Dia 21:** Anadir 3-4 nuevos ads basados en los angulos ganadores
- **Dia 30:** Revision completa. Decidir si escalar o pivotar

---

## Fase 2: Expansion de Productos (Semanas 6-10)

### Lanzar campanas para productos secundarios

Solo si la campana de Salud alcanzo KPIs en Fase 1.

```
CAMPANA: [CBO] Seguro de Vida — DFW
  Budget: $15-20/dia
  AD SET: Broad — DFW — 30-55
    AD 1: [Static] "Protege el futuro de tu familia desde $25/mes"
    AD 2: [Yapper] Tatiana explica Term vs Whole Life
    AD 3: [Static] Tabla Term 20 anos — $500k por $25-40/mes
    AD 4: [Static] "Tu seguro de vida deberia ser 10x tu salario"

CAMPANA: [CBO] Gastos Finales — DFW
  Budget: $10-15/dia
  AD SET: Broad — DFW — 45-65
    AD 1: [Static] "Desde $30/mes — protege a tu familia del gasto"
    AD 2: [Yapper] Tatiana explica gastos finales vs vida
    AD 3: [Static] "El costo promedio de un funeral en Texas: $9,000+"

CAMPANA: [ABO] Test — Indemnizacion
  Budget: $10/dia (test)
  AD SET A: Static — precio
    AD 1: "Efectivo directo desde $15/mes"
  AD SET B: Static — escenario
    AD 1: "Hospitalizado? Recibe $1,000 en efectivo"
```

### Budget total Fase 2

| Campana | Diario | Mensual |
|---------|--------|---------|
| Salud (escalada) | $30-40 | $900-1,200 |
| Vida | $15-20 | $450-600 |
| Gastos Finales | $10-15 | $300-450 |
| Test Indemnizacion | $10 | $300 |
| **Total** | **$65-85** | **$1,950-2,550** |

---

## Fase 3: Retargeting + Escalamiento (Semanas 11-16)

### Campana de retargeting

```
CAMPANA: [CBO] Retargeting — All Products
  Budget: $10-15/dia
  AD SET: Warm — Website Visitors 30d + Engaged 14d
    Exclusion: Ya convirtieron (leads 30d)
    AD 1: [Static] "Todavia buscando seguro? Agenda tu consulta gratis"
    AD 2: [Yapper] Tatiana responde las 3 preguntas mas comunes
    AD 3: [Static] Testimonial + CTA directo
    AD 4: [Static] "Tu consulta es gratis — sin compromiso"
```

### Escalamiento de campanas ganadoras

- Identificar las 2-3 campanas con mejor contribution margin
- Escalar budget 15-20% por semana (no mas)
- Monitorear CPMr y net new reach semanalmente
- Si CPMr sube > 20% al escalar, pausar escalamiento

### Partnership Ads (si hay budget)

- Identificar 1-2 micro-influencers latinos en DFW
- Negociar 2-4 piezas de contenido por $200-500 cada una
- Correr como Partnership Ads desde su perfil
- Budget adicional: $300-500/mes

---

## Fase 4: Optimizacion Continua (Semana 17+)

### Cadencia mensual

| Dia | Tarea |
|-----|-------|
| Lunes (semanal) | Revisar CPMr, frecuencia, net new reach, leads |
| Dia 1 del mes | Revisar blended revenue, contribution margin, CPA |
| Dia 1 del mes | Actualizar exclusion lists (CRM upload) |
| Dia 1 del mes | Producir batch de 8-10 conceptos nuevos |
| Dia 15 del mes | Mid-month check: pausar losers, anadir variaciones de winners |

### Creative refresh cycle

```
Semana 1: Producir 8-10 conceptos nuevos
Semana 2: Lanzar batch, dejar correr
Semana 3: Evaluar, pausar losers, iterar winners
Semana 4: Preparar siguiente batch basado en learnings
```

### Dashboard semanal

| Metrica | Fuente | Target |
|---------|--------|--------|
| Leads totales | CRM | 20-40/mes |
| CPL blended | Ads Manager + CRM | < $80 |
| Contribution margin | Manual calc | > 70% |
| CPMr | Ads Manager | < $15 |
| Net new reach | Ads Manager | > 70% |
| Creative win rate | Ads Manager | 10-20% |
| Frecuencia 7d | Ads Manager | < 2.5 |
| Policies activated | CRM | Track conversion rate |

---

## Presupuesto Total por Fase

| Fase | Duracion | Budget Mensual | Budget Acumulado |
|------|----------|---------------|-----------------|
| Fase 0: Infraestructura | 1 semana | $0 (setup) | $0 |
| Fase 1: Piloto Salud | 4 semanas | $600-900 | $600-900 |
| Fase 2: Expansion | 5 semanas | $1,950-2,550 | $2,550-3,450 |
| Fase 3: Retargeting + Scale | 6 semanas | $2,500-3,500 | $6,300-8,700 |
| Fase 4: Optimizacion | Continuo | $2,500-4,000/mes | — |

## Criterios de Exito (90 dias)

| Metrica | Objetivo |
|---------|----------|
| Leads generados | 60-120 |
| Policies activadas | 15-30 (25% conversion rate) |
| Revenue generado | $4,500-9,000 (15-30 x $300 avg commission) |
| Ad spend total | $2,550-3,450 |
| ROAS blended | 1.5-3.0x |
| Contribution margin | > 50% |

---

## Riesgos y Mitigaciones

| Riesgo | Probabilidad | Mitigacion |
|--------|-------------|------------|
| CPL > $150 (demasiado caro) | Media | Reducir budget, probar nuevos conceptos, ajustar landing page |
| Leads de baja calidad | Media | Agregar preguntas calificadoras al formulario, filtrar por area |
| Pixel no trackea correctamente | Baja | Verificar con Meta Pixel Helper antes de lanzar (Fase 0) |
| Creative fatigue rapida | Media | Mantener pipeline de 8-10 conceptos/mes, rotar cada 3 semanas |
| Estacionalidad adversa | Baja | Priorizar productos evergreen (Vida, Gastos Finales) fuera de OEP |

---

## Siguiente Paso

Completar todos los items de Fase 0 (infraestructura). Una vez verificados Pixel, CAPI, audiences y creativos, lanzar la campana piloto de Seguro de Salud.
