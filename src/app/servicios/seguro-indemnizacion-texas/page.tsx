import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-indemnizacion-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos",
  description: "Cobertura de indemnización para hospitalización o eventos críticos en Texas, ideal como complemento para deducibles y gastos imprevistos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos",
    description: "Cobertura de indemnización para hospitalización o eventos críticos en Texas, ideal como complemento para deducibles y gastos imprevistos.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/obamacare-prices.jpg", width: 1200, height: 630, alt: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos",
    description: "Cobertura de indemnización para hospitalización o eventos críticos en Texas, ideal como complemento para deducibles y gastos imprevistos.",
    images: ["/blog/editorial-v3/obamacare-prices.jpg"],
  },
};

const processSteps = [
  "Revisar póliza principal y brechas de cobertura",
  "Definir nivel de respaldo en efectivo necesario",
  "Comparar triggers de pago y exclusiones",
  "Alinear complemento con riesgo familiar real",
];
const expectedResults = [
  "Más liquidez ante eventos críticos",
  "Mejor manejo de deducibles y copagos altos",
  "Protección adicional sin duplicar coberturas",
];
const faqItems = [
  {
    question: "¿Reemplaza mi seguro principal?",
    answer: "No, funciona como complemento para cubrir brechas.",
  },
  {
    question: "¿Cuándo se activa el pago?",
    answer: "Cuando se cumplen condiciones del evento cubierto en póliza.",
  },
  {
    question: "¿Sirve para deducibles altos?",
    answer: "Sí, suele usarse para reducir presión financiera inicial.",
  },
  {
    question: "¿Quién debería considerarlo?",
    answer: "Familias con exposición a gastos médicos imprevistos.",
  },
  {
    question: "¿Cómo evitar sobreaseguramiento?",
    answer: "Se calcula complemento según riesgos y coberturas existentes.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos",
  areaServed: "Texas",
  provider: { "@type": "InsuranceAgency", name: siteConfig.brand.name, url: siteConfig.seo.siteUrl },
  url: PAGE_URL,
  inLanguage: "es",
  description: "Cobertura de indemnización para hospitalización o eventos críticos en Texas, ideal como complemento para deducibles y gastos imprevistos.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Seguro de Indemnización en Texas | Respaldo en Efectivo para Eventos Críticos</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Este seguro complementa tu póliza principal y aporta efectivo para cubrir deducibles o gastos inesperados por eventos críticos.</p>
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
