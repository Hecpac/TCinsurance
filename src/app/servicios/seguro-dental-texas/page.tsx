import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-dental-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado",
  description: "Asesoría para elegir seguro dental en Texas: limpiezas, revisiones y tratamientos con cobertura útil para adultos y niños.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado",
    description: "Asesoría para elegir seguro dental en Texas: limpiezas, revisiones y tratamientos con cobertura útil para adultos y niños.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado",
    description: "Asesoría para elegir seguro dental en Texas: limpiezas, revisiones y tratamientos con cobertura útil para adultos y niños.",
    images: ["/blog/editorial-v3/health-plan-texas.jpg"],
  },
};

const processSteps = [
  "Revisar red de dentistas disponibles en tu zona",
  "Comparar periodos de espera y coberturas por procedimiento",
  "Evaluar topes anuales y copagos",
  "Elegir opción útil para adultos y niños",
];
const expectedResults = [
  "Prevención constante y menor gasto inesperado",
  "Mejor acceso a tratamientos frecuentes",
  "Plan dental coherente con tu presupuesto",
];
const faqItems = [
  {
    question: "¿Cubre limpiezas y revisiones?",
    answer: "Sí, muchos planes incluyen prevención básica anual.",
  },
  {
    question: "¿Qué debo revisar antes de contratar?",
    answer: "Red, periodos de espera, topes anuales y copagos.",
  },
  {
    question: "¿Conviene para niños?",
    answer: "Suele ser muy útil por frecuencia de controles y ortodoncia futura.",
  },
  {
    question: "¿Se puede usar de inmediato?",
    answer: "Depende del plan; algunos tratamientos tienen espera.",
  },
  {
    question: "¿Cómo comparan costo-beneficio?",
    answer: "Proyectamos uso anual para evitar pagar de más.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado",
  areaServed: "Texas",
  provider: { "@type": "InsuranceAgency", name: siteConfig.brand.name, url: siteConfig.seo.siteUrl },
  url: PAGE_URL,
  inLanguage: "es",
  description: "Asesoría para elegir seguro dental en Texas: limpiezas, revisiones y tratamientos con cobertura útil para adultos y niños.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Seguro Dental en Texas | Cobertura Preventiva y Tratamientos con Costo Controlado</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Comparamos planes dentales para que tu familia tenga prevención y tratamiento con costos más previsibles.</p>
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
