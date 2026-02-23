import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-vida-dallas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
  description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/life-insurance-family.jpg", width: 1200, height: 630, alt: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
    images: ["/blog/editorial-v3/life-insurance-family.jpg"],
  },
};

const processSteps = [
  "Definir objetivo de protección (ingreso, deuda, educación)",
  "Comparar temporal vs. permanente según etapa de vida",
  "Ajustar monto a presupuesto sostenible",
  "Documentar beneficiarios y ruta de activación",
];
const expectedResults = [
  "Protección financiera concreta para tu hogar",
  "Cobertura alineada a tus compromisos reales",
  "Menor riesgo de endeudamiento familiar",
];
const faqItems = [
  {
    question: "¿Temporal o permanente?",
    answer: "Depende de tu objetivo: temporal protege por periodo definido; permanente combina cobertura de largo plazo.",
  },
  {
    question: "¿Cómo defino el monto?",
    answer: "Se calcula según ingresos, deudas y metas familiares prioritarias.",
  },
  {
    question: "¿Puedo contratar si tengo condiciones médicas?",
    answer: "Hay alternativas, pero cambian elegibilidad y costo.",
  },
  {
    question: "¿Qué pasa si cambio de trabajo?",
    answer: "La póliza personal no depende de tu empleador.",
  },
  {
    question: "¿Cuándo revisar la póliza?",
    answer: "Al menos una vez al año o tras cambios familiares importantes.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
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
  description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Seguro de Vida para Protección Familiar en Texas</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Diseñamos cobertura de vida para que tu familia mantenga estabilidad económica y capacidad de decisión en momentos críticos.</p>
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
            <Link href="/blog/seguro-de-vida-liquidez-familiar" className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
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
