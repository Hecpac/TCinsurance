import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/medicare-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D",
  description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D",
    description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D",
    description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
    images: ["/blog/editorial-v3/health-plan-texas.jpg"],
  },
};

const processSteps = [
  "Validar médicos y hospitales en red",
  "Cruzar medicamentos con cobertura Part D",
  "Comparar costo mensual vs. costo total anual",
  "Definir opción más estable para tu caso",
];
const expectedResults = [
  "Plan compatible con médicos y recetas",
  "Menor riesgo de sorpresas de costo",
  "Decisión de Medicare con criterio técnico",
];
const faqItems = [
  {
    question: "¿Advantage o suplemento?",
    answer: "Depende de red, uso médico y tolerancia a variación de costos.",
  },
  {
    question: "¿Qué peso tienen mis medicamentos?",
    answer: "Alto; una mala elección en Part D puede encarecer todo el año.",
  },
  {
    question: "¿Puedo cambiar de plan después?",
    answer: "Sí, en ventanas reguladas de inscripción.",
  },
  {
    question: "¿Cómo evitar errores al elegir?",
    answer: "Comparar red, recetas y costo total, no solo prima.",
  },
  {
    question: "¿Ofrecen asesoría en español?",
    answer: "Sí, la evaluación se hace en español y con explicación clara.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Medicare en Texas | Comparación de Advantage, Suplementos y Part D",
  areaServed: "Texas",
  provider: { "@type": "InsuranceAgency", name: siteConfig.brand.name, url: siteConfig.seo.siteUrl },
  url: PAGE_URL,
  inLanguage: "es",
  description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Medicare en Texas | Comparación de Advantage, Suplementos y Part D</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Analizamos opciones Medicare según médicos, medicamentos y presupuesto para evitar decisiones costosas o incompatibles.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">Cómo trabajamos este servicio</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            {processSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="text-headline text-swiss-black">Resultado esperado</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            {expectedResults.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="text-headline text-swiss-black">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="border border-swiss-black/15 p-5">
                <h3 className="font-semibold text-swiss-black">{item.question}</h3>
                <p className="mt-2 text-swiss-black/80">{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="border-t border-swiss-black/15 pt-8 space-y-4">
            <Link href="/blog" className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
              Leer guía relacionada del blog &rarr;
            </Link>
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
