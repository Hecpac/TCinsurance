import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-vision-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes",
  description: "Comparación de planes de visión en Texas para cubrir exámenes, lentes y beneficios anuales con mejor control de costos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes",
    description: "Comparación de planes de visión en Texas para cubrir exámenes, lentes y beneficios anuales con mejor control de costos.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes",
    description: "Comparación de planes de visión en Texas para cubrir exámenes, lentes y beneficios anuales con mejor control de costos.",
    images: ["/blog/editorial-v3/health-plan-texas.jpg"],
  },
};

const processSteps = [
  "Validar frecuencia de exámenes por miembro",
  "Comparar beneficios de lentes y armazones",
  "Revisar red de ópticas y especialistas",
  "Seleccionar plan con mejor valor anual",
];
const expectedResults = [
  "Ahorro en exámenes y lentes",
  "Seguimiento visual más constante",
  "Cobertura práctica para adultos y niños",
];
const faqItems = [
  {
    question: "¿Qué cubre típicamente?",
    answer: "Examen anual y parte del costo de lentes/armazones.",
  },
  {
    question: "¿Conviene aunque use lentes simples?",
    answer: "Sí, puede reducir costo recurrente de control y reposición.",
  },
  {
    question: "¿Incluye lentes de contacto?",
    answer: "Depende del plan y su tabla de beneficios.",
  },
  {
    question: "¿La red importa?",
    answer: "Sí, define dónde puedes usar mejor la cobertura.",
  },
  {
    question: "¿Cómo saber si vale la pena?",
    answer: "Se compara el costo anual del plan vs. uso esperado.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Visión en Dallas, Fort Worth y Lewisville, Texas | Exámenes y Lentes",
  areaServed: [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Lewisville" },
  ],
  provider: {
    "@type": "InsuranceAgency",
    name: siteConfig.brand.name,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.streetAddress,
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressRegion,
      postalCode: siteConfig.business.address.postalCode,
    },
    availableLanguage: ["Spanish", "English"],
  },
  url: PAGE_URL,
  inLanguage: "es",
  description: "Comparación de planes de visión en Texas para cubrir exámenes, lentes y beneficios anuales con mejor control de costos.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function ServiceLandingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <GridContainer as="section" className="pt-10 pb-20">
        <div className="col-span-12 md:col-span-2">
          <Link href="/servicios" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">&larr; Volver a servicios</Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <p className="text-meta uppercase tracking-[0.16em] text-swiss-gray">Servicio especializado</p>
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Planes de Seguro de Visión en Texas</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Te ayudamos a elegir cobertura de visión que realmente reduzca el costo de exámenes y lentes en tu hogar.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es y por qué lo necesitas?</h2>
          <p>
            El seguro de visión es una cobertura económica pero altamente valorada en Texas. Un examen visual completo sin seguro, más un par de anteojos graduados (montura y lentes), puede costar entre  y  de bolsillo.
          </p>
          <p>
            En TC Insurance, te ayudamos a incorporar un plan de visión (a menudo por menos del costo de una suscripción de Netflix) que te garantiza atención preventiva anual y descuentos masivos en las ópticas y minoristas más grandes del país.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">Costos y Beneficios Típicos</h2>
          <p>
            Los seguros de visión funcionan como planes de descuento y créditos pre-pactados (desde /mes):
          </p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Examen Anual:</strong> Cubren un examen visual comprensivo anual por un copago mínimo (usualmente  - ), clave para detectar problemas o enfermedades tempranas.</li>
            <li><strong>Asignación (Allowance):</strong> Las aseguradoras otorgan un crédito anual ( a ) para gastar en monturas o lentes de contacto. Todo exceso recibe un descuento extra (usualmente 20%).</li>
            <li><strong>Lentes Recetados:</strong> Los lentes oftálmicos básicos tienen un copago bajo (). Mejoras como antirreflejante o policarbonato tienen copagos tabulados y predecibles.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Redes de Proveedores (VSP vs EyeMed)</h2>
          <p>Al igual que en salud, la red importa muchísimo en visión. Las dos gigantes nacionales son:</p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>VSP (Vision Service Plan):</strong> Reconocida por su extensa red de doctores privados e independientes. Excelente si prefieres atención personalizada en clínicas locales.</li>
            <li><strong>EyeMed:</strong> Fuerte presencia corporativa. Ideal si te gusta comprar en LensCrafters, Pearle Vision, Target Optical o Ray-Ban.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Cómo elegimos tu plan</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Ubicación de compra:</strong> Evaluamos si prefieres ir al oftalmólogo independiente de tu colonia o a una gran cadena en el mall.</span></li>
            <li><span className="font-normal"><strong>Tipo de uso:</strong> Ajustamos la recomendación si prefieres usar lentes de contacto (frecuentemente más caros anualmente) vs monturas tradicionales.</span></li>
            <li><span className="font-normal"><strong>Inclusión Familiar:</strong> Si varios miembros del hogar usan lentes, consolidamos todo en una sola póliza familiar (-/mes) que ahorra significativamente en primas.</span></li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="border border-swiss-black/15 p-5">
                <h3 className="font-semibold text-swiss-black">{item.question}</h3>
                <p className="mt-2 text-swiss-black/80">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="col-span-12 md:col-start-8 md:col-span-5 pt-10">
          <div className="border border-swiss-black/15 p-6 space-y-4">
            <p className="text-meta uppercase tracking-[0.12em] text-swiss-gray">Siguiente paso</p>
            <h2 className="text-headline text-swiss-black">Agenda tu asesoría</h2>
            <p className="text-body text-swiss-black/80">En 15 minutos revisamos tu caso y te damos una recomendación clara en español.</p>
            <Link href={HOME_SECTION_PATHS.contact} className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
              Consulta gratis &rarr;
            </Link>
          </div>
        </section>
      </GridContainer>
    </div>
  );
}
