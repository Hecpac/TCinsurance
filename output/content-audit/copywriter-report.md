# TC Insurance -- Copywriter Audit Report

**Auditor:** Copywriter Agent
**Date:** 2026-02-09
**Scope:** All page copy, CTAs, data files, and component text across the TC Insurance website

---

## Executive Summary

TC Insurance's copy is **fundamentally strong**. The writing is clear, professional, and culturally well-calibrated for Spanish-speaking families in Texas. The voice successfully balances technical credibility with approachability, and the bilingual positioning is woven throughout naturally.

**Key strengths:**
- Consistent brand voice: competent, calm, human
- Good use of benefit-driven language ("claridad," "sin compromiso," "recomendacion accionable")
- Strong trust signals (licensed, bilingual, response time)
- Well-structured FAQ that addresses real buyer concerns
- Blog content that demonstrates genuine expertise

**Priority areas for improvement:**
1. **CTA fatigue** -- The same "Agenda asesoria gratuita" label is used 6+ times across the page. Needs variation.
2. **Hero subtitle dilution** -- The value proposition is spread across 3 separate paragraphs, weakening impact.
3. **About page quote feels generic** -- The blockquote needs more specificity to Tatiana's unique positioning.
4. **Testimonials lack specificity** -- Most are generic praise; few mention concrete outcomes.
5. **Legacy blog posts are misaligned** -- Corporate/HNWI content (D&O, FINMA, cyber risk) contradicts the family-focused brand.

---

## Page-by-Page Findings

### 1. HOME PAGE (Landing)

#### Hero Section (`src/components/HeroSection.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **HIGH** | Hero title is clear but the accent line "para familias en Texas" could be stronger. "en Texas" is geographic but not emotionally compelling. Consider: "para tu familia en Texas." (tu > familias -- more personal) | :123-129 |
| **MEDIUM** | Subtitle at line 160-162 ("Te comparamos planes y te entregamos una recomendacion clara") is solid but uses "Te" twice in one sentence -- reads slightly redundant. | :160-162 |
| **MEDIUM** | Three separate body paragraphs (:160, :167, :175) dilute the value prop. The hero tries to say 3 things when it should say 1 powerfully. Consider consolidating into one strong subtitle + one supporting line. | :156-177 |
| **LOW** | "Est. 2024" kicker (:111) -- "Est." may not resonate with the target audience. "Desde 2024" would be more natural in Spanish. | :111 |
| **LOW** | Trust badges (:234-242) are well-chosen. "Respuesta inicial < 24h" is strong. | :234-242 |
| **LOW** | Meta line "15 minutos - Sin compromiso - Espanol/English" (:250) is excellent -- concise, removes friction. | :249-251 |

**Suggested rewrite for hero subtitle (lines 156-177):**
> Current: 3 separate paragraphs
> Suggested: Consolidate to:
> **Subtitle:** "Comparamos tus opciones de cobertura y te entregamos una recomendacion clara para proteger a tu familia -- sin tecnicismos, sin presion."
> **Supporting:** "Asesoria bilingue 1:1 para familias, independientes y duenos de negocio en Texas."

#### Services Section (`src/components/Services.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **MEDIUM** | Section headline "Servicios para cada etapa de vida" (:199) is functional but not compelling. Consider: "Cobertura que se adapta a tu momento de vida" -- more personal. | :199 |
| **LOW** | Intro text "Elige el tipo de cobertura que quieres comparar" (:206) is instructional rather than benefit-driven. Consider: "Encuentra la cobertura ideal para tu situacion. Te guiamos paso a paso." | :206 |

#### Services Data (`src/data/services.ts`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **HIGH** | Service descriptions are technically solid but read like catalog entries, not persuasion. Each description starts with a verb (Comparamos, Disenamos, Planificamos, Evaluamos, etc.) -- this is good for consistency but the tone is clinical rather than empathetic. | :19, :30, :42, :53, :63, :74, :85 |
| **MEDIUM** | "Ideal para" and "Resultado" fields (:21-22, :32-33, etc.) are a smart pattern. However, "Resultado" labels could be more emotionally resonant. "Red medica adecuada + costos predecibles" is functional; "Tranquilidad de saber que tu familia tiene acceso a atencion medica sin sorpresas" is persuasive. | various |
| **LOW** | Indemnity service description (:85) "Sumamos polizas de apoyo en efectivo para hospitalizacion o eventos criticos" -- "Sumamos" feels weak. Consider "Reforzamos tu proteccion con un respaldo en efectivo." | :85 |
| **LOW** | Bullet "Complemento de cobertura principal" (:88) is redundant with the description. Replace with something more specific like "Pago directo sin tramites complicados." | :88 |

#### CTA Inline Sections (`src/app/page.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **CRITICAL** | CTA label "Agenda asesoria gratuita" appears 6+ times throughout the page (hero, after services, after process, after FAQ, after blog). This creates CTA fatigue. Visitors become blind to repeated identical labels. | :30, :49, :185, :207, :237 |
| **HIGH** | After-services CTA title "Quieres comparar opciones sin perder tiempo?" (:28) is one of the strongest lines on the site -- it addresses a real pain point. | :28 |
| **HIGH** | After-process CTA "Ya tienes la ruta, ahora toca ejecutarla" (:47) is good momentum copy. Subtitle adds "recomendacion accionable" which is repeated too often across the site (appears 3+ times). | :47-48 |

**Suggested CTA label variations:**
- Hero: "Agenda tu asesoria gratuita" (personal)
- After services: "Compara tus opciones" (action-specific)
- After process: "Inicia tu estrategia" (momentum)
- After FAQ: "Habla con un experto" (reassurance)
- After blog: "Aplica esto a tu caso" (contextual)

#### Process Section (`src/components/Process.tsx` + `src/data/process.ts`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Process step titles are clean and action-oriented. Good work. | process.ts:10-31 |
| **MEDIUM** | Step 4 "Implementacion y seguimiento" (:29) is the weakest step title -- it sounds corporate. Consider: "Te acompanamos despues de la poliza" -- this mirrors the closing copy at line 137 of Process.tsx which is excellent. | process.ts:29 |
| **LOW** | Closing line "No desaparecemos tras la poliza" (Process.tsx:137) is one of the best lines on the site. It addresses a known pain point in insurance sales. Consider making this more prominent. | Process.tsx:137 |

#### Stats Section (`src/components/Stats.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **MEDIUM** | Stats are qualitative rather than quantitative ("<24h", "1:1", "ES/EN", "TX"). While this is honest (the agency is new, est. 2024), it may read as thin compared to competitors showing "500+ families served." Consider adding a stat like "7 lineas de cobertura" or similar factual number. | :8-25 |
| **LOW** | "Acompanamiento humano" (:15) as the label for "1:1" is good. "Cobertura con contexto local" (:24) for "TX" feels vague. Consider: "Licencia y operacion en Texas." | :24 |
| **LOW** | The closing note (:138) "La prioridad es reducir incertidumbre y darte una recomendacion accionable desde la primera conversacion" repeats "recomendacion accionable" yet again. This phrase appears at least 4 times across the page. | :138 |

#### Testimonials (`src/data/testimonials.ts`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **HIGH** | All 6 testimonials are 5-star or 4-star with generic praise. None mention specific outcomes (e.g., "saved $200/month" or "found a plan that covered my medication"). Without concrete results, testimonials feel interchangeable. | :13-86 |
| **MEDIUM** | Carlos M. (:29) "En menos de una semana resolvimos nuestro plan de salud" -- this is the most specific testimonial. More like this would be stronger. | :29-30 |
| **MEDIUM** | Miguel A. (:76) is the only 4-star review. While authentic, the quote "Comparé varias opciones y TC Insurance fue la mas transparente" is actually a strong differentiator. Consider making this a featured testimonial. | :76-77 |
| **LOW** | Testimonial profiles are well-chosen (familia, emprendedor, pareja joven, adultos mayores, jubilada, trabajador independiente) -- they cover the target segments well. | various |

**Suggested testimonial improvements:**
Add outcome specifics where possible:
- "Tatiana nos ayudo a elegir un plan que cubria el medicamento de mi esposo, algo que nuestro plan anterior no hacia."
- "Pensabamos que el seguro de vida era inalcanzable, pero encontramos una opcion que cabe en nuestro presupuesto."

#### FAQ Section (`src/data/faq.ts`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | FAQ questions are well-chosen and address real buyer concerns. The language is accessible. | :6-47 |
| **MEDIUM** | Q: "Cuanto cuesta una asesoria inicial?" (:18-20) -- the answer "La primera llamada de diagnostico no tiene costo" uses "diagnostico" which is more clinical than the brand voice elsewhere. Consider: "La primera conversacion es gratuita y sirve para definir tu ruta de cobertura." | :19-20 |
| **LOW** | Q: "Pueden combinar varios tipos de seguro?" (:28-30) -- answer uses "arquitecturas de cobertura" which is jargon. The rest of the site avoids this kind of technical language. Consider: "combinaciones de cobertura." | :30 |
| **LOW** | The closing CTA after FAQ (FAQ.tsx:162-163) "Si aun no estas seguro por donde empezar, una llamada de 15 minutos es suficiente para darte claridad" is excellent copy -- warm, low-friction, specific. | FAQ.tsx:162-163 |

#### Contact Section (`src/components/Contact.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Headline "Asesoria gratuita." (:265-268) is clean and direct. The period adds gravitas. | :265-268 |
| **LOW** | Form intro "Comparte tus datos y te proponemos una ruta de cobertura clara para tu caso" (:273) is benefit-first -- good. | :273 |
| **LOW** | "No spam. No ventas agresivas. Solo claridad." (:461) -- excellent trust copy. Addresses common fears directly. | :461 |
| **LOW** | "Respuesta inicial en menos de 24 horas" (:464) reinforces the promise. Consistent with hero badges. | :464 |
| **MEDIUM** | Success message (:229) "Gracias. Recibimos tu solicitud y te contactaremos muy pronto." -- "muy pronto" is vague. Consider: "te contactaremos en menos de 24 horas." for consistency with the promise. | :229 |

#### Blog Section (`src/components/BlogList.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Section heading "Guias recientes para decidir mejor" (:129) is strong -- positions blog as decision-support, not just content. | :129 |
| **MEDIUM** | After-blog CTA (:235) "Quieres saber como aplica este contenido a tu caso?" is very long for a CTA title. Consider shortening to: "Aplica estos conceptos a tu caso." | :235 |

---

### 2. SERVICES PAGE (`src/app/servicios/page.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Headline "Servicios especializados." (:29-32) -- clean and professional. | :29-32 |
| **MEDIUM** | Meta description (:10) "Catalogo tecnico de coberturas" uses "tecnico" which may intimidate the target audience. Consider: "Coberturas de salud, vida, gastos finales, dental, Medicare, vision e indemnizacion para familias en Texas." | :9-10 |
| **LOW** | Subheadline (:37-38) "Disenamos combinaciones de cobertura segun etapa de vida, presupuesto y perfil de riesgo familiar" -- "perfil de riesgo familiar" is slightly technical but acceptable given the page is a catalog. | :37-38 |

---

### 3. ABOUT PAGE (`src/app/sobre-mi/page.tsx` + `src/components/Philosophy.tsx` + `src/data/about.ts`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **HIGH** | The blockquote "No solo vendo polizas; construyo tranquilidad para las familias de nuestra comunidad." (Philosophy.tsx:104-105) is **generic**. Many insurance agents could say this. It needs to be more specific to Tatiana's actual differentiation. | Philosophy.tsx:104-105 |
| **LOW** | About intro (about.ts:19) is clear and well-positioned. | about.ts:19 |
| **LOW** | Story paragraphs (about.ts:21-22) are authentic and well-written. The line "cada familia merece entender su cobertura sin tecnicismos innecesarios" is on-brand. | about.ts:21 |
| **MEDIUM** | Credentials list (about.ts:25-28) mixes English and Spanish ("Licensed Insurance Agent in Texas" then "Atencion bilingue"). Should be consistent -- either all Spanish or mark the license line as its formal English title with translation. | about.ts:25-28 |
| **MEDIUM** | CTA label "Conoce mas sobre mi enfoque" (about.ts:30) linking to /#contacto is misleading -- user expects to learn more but is taken to a contact form. Consider: "Agenda una conversacion conmigo" or link to a different section. | about.ts:30-31 |
| **LOW** | The about page meta description (sobre-mi/page.tsx:10) correctly uses the founder's full name for SEO. | :10 |

**Suggested blockquote rewrite:**
> "Mi trabajo no es vender la poliza mas cara -- es encontrar la combinacion que realmente protege a tu familia sin complicaciones."

---

### 4. BLOG CONTENT (`src/data/blogPosts.ts`)

#### Active Posts

| Priority | Finding | Post / Line(s) |
|----------|---------|---------|
| **LOW** | "Gastos Finales: La Ultima Pieza de la Arquitectura Financiera" -- Title is strong, content is excellent. The blog's best piece. Well-structured with numbered sections. | :18-43 |
| **MEDIUM** | "Como Elegir un Plan de Salud en Texas" -- Content is thin (only 3 paragraphs). This is a high-value topic that deserves more depth. Readers searching for this topic expect actionable steps. | :47-59 |
| **MEDIUM** | "Seguro de Vida: Liquidez Inmediata" -- Also thin (3 paragraphs). The title promises "liquidez inmediata" but the content doesn't explain the mechanism clearly. | :63-76 |

#### Legacy Posts

| Priority | Finding | Post / Line(s) |
|----------|---------|---------|
| **HIGH** | Four legacy posts (D&O, Ciberriesgo, Propiedades Prime, FINMA) are authored by "Thomas Castillo" and target corporate/HNWI audiences. This content is **completely misaligned** with the current brand (family-focused in Texas). Even though they're hidden from listings, they're still accessible via URL and may confuse visitors or dilute SEO. | :79-141 |
| **MEDIUM** | Legacy posts use formal "usted" form while active posts use informal "tu." If a user navigates to a legacy post, the tone shift is jarring. | :87-92 vs :56-58 |

**Recommendation:** Either remove legacy posts entirely or add a clear disclaimer banner noting the content was from a previous phase of the business.

---

### 5. BLOG INDEX PAGE (`src/app/blog/page.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | "Blog estrategico." headline (:65-67) is a strong positioning choice. | :64-68 |
| **LOW** | Description (:72-73) "Guias claras para tomar mejores decisiones" is benefit-first. Good. | :71-73 |

---

### 6. BLOG POST PAGE (`src/app/blog/[slug]/page.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Article layout is clean with proper hierarchy. | -- |
| **MEDIUM** | Bottom CTA "Solicitar asesoria privada" (:392) uses "privada" which feels exclusive/cold. This is the only place on the site that uses this word. Consider "Solicitar asesoria personalizada" for consistency. | :392 |

---

### 7. NAVBAR (`src/components/Navbar.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Desktop CTA "Agenda asesoria" (:182) is appropriately short for a nav button. | :182 |
| **LOW** | Navigation labels (Servicios, Sobre mi, Blog, Contacto) are standard and clear. | :12-16 |

---

### 8. FOOTER (`src/components/Footer.tsx`)

| Priority | Finding | Line(s) |
|----------|---------|---------|
| **LOW** | Newsletter placeholder text "Recibe guias estrategicas en tu correo." (:157) is good -- sets expectations. | :157 |
| **MEDIUM** | Footer bottom has "Journal" link (:241) pointing to /blog. Using the English word "Journal" is inconsistent with the Spanish-first approach. Use "Blog" or "Articulos." | :241 |
| **LOW** | License statement (:167) is in English, which is correct for legal compliance. | :167 |

---

## Cross-Cutting Issues

### 1. Repetitive Phrasing (CRITICAL)

The following phrases appear excessively across the site:

| Phrase | Count | Recommendation |
|--------|-------|----------------|
| "Agenda asesoria gratuita" | 6+ | Vary CTA labels by context (see suggestions above) |
| "recomendacion accionable" | 4+ | Use alternatives: "plan claro," "siguiente paso concreto," "ruta definida" |
| "claridad" / "con claridad" | 5+ | Acceptable as a brand word, but reduce to 2-3 uses max |
| "etapa de vida" | 3+ | OK -- it's a core concept. Acceptable frequency. |

### 2. Tone Consistency (HIGH)

The site predominantly uses informal "tu" which is the correct choice for the target audience (young-to-middle-age Hispanic families in Texas). However:
- Legacy blog posts use formal "usted" (jarring if accessed)
- About credentials mix English/Spanish
- "Journal" in footer is English

### 3. Missing Copy Opportunities (MEDIUM)

- **No social proof numbers** -- No mention of families served, years in business, or number of carriers compared. Even "Est. 2024" is hidden in a kicker that most users will skip.
- **No urgency drivers** -- Open enrollment windows, ACA deadlines, or seasonal prompts are not mentioned anywhere. These are natural urgency drivers for health insurance.
- **No specific carrier mentions** -- Mentioning carrier partnerships (even generically: "Trabajamos con las principales aseguradoras de Texas") would increase credibility.

### 4. WhatsApp Pre-fill Text (LOW)

`src/config/site.ts:23-25` -- The WhatsApp message "Hola TC Insurance, quiero agendar una asesoria gratuita." is functional but could be warmer: "Hola, me gustaria agendar una asesoria de seguros. Gracias."

---

## Priority Summary

### CRITICAL (Fix immediately)
1. **CTA label fatigue** -- Vary "Agenda asesoria gratuita" across 6+ placements
2. **Overuse of "recomendacion accionable"** -- Replace 2-3 instances with synonyms

### HIGH (Fix before launch/next sprint)
3. **Hero value proposition dilution** -- Consolidate 3 body paragraphs into 1 strong subtitle + 1 supporting line
4. **About page blockquote is generic** -- Rewrite with Tatiana's specific differentiation
5. **Testimonials lack concrete outcomes** -- Add specific results/savings to at least 2-3 testimonials
6. **Legacy blog posts brand misalignment** -- Remove or add disclaimer

### MEDIUM (Improve when possible)
7. **Services meta description** uses "tecnico" -- simplify
8. **About credentials** mix English/Spanish
9. **Contact success message** should match the "<24h" promise
10. **Blog posts 2 and 3** are too thin for their topics
11. **Footer "Journal" link** -- use Spanish
12. **Stats section** could use one quantitative stat
13. **CTA after blog grid** title is too long
14. **About CTA label** is misleading (says "learn more" but links to contact)
15. **Blog post bottom CTA** uses "privada" (inconsistent)

### LOW (Polish)
16. Hero kicker "Est." vs "Desde"
17. FAQ answer uses "diagnostico" (too clinical)
18. FAQ answer uses "arquitecturas de cobertura" (jargon)
19. Indemnity service description weak verb
20. WhatsApp pre-fill text
21. Stats label "Cobertura con contexto local" is vague

---

## Final Assessment

The copy is **above average for a small insurance agency website**. The brand voice is consistent, trustworthy, and culturally appropriate. The biggest win would be **CTA variation** and **testimonial specificity** -- both are achievable with minimal engineering changes (data file edits only). The hero consolidation would require a small component refactor but would significantly improve first-impression clarity.

The site does an excellent job of not overselling. The tone respects the audience's intelligence without being condescending. This is a strong foundation to build on.
