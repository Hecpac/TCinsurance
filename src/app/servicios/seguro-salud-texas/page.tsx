import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import ComparisonTable from "@/components/ComparisonTable";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-salud-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
  description: "Comparación de planes de salud en Texas con enfoque en red médica, deducibles y costo total mensual para familias y trabajadores independientes.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Comparación de planes de salud en Texas con enfoque en red médica, deducibles y costo total mensual para familias y trabajadores independientes.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Comparación de planes de salud en Texas con enfoque en red médica, deducibles y costo total mensual para familias y trabajadores independientes.",
    images: ["/blog/editorial-v3/health-plan-texas.jpg"],
  },
};

const processSteps = [
  "Comparar HMO y PPO según tus médicos actuales",
  "Revisar deducibles, copagos y gasto máximo anual",
  "Validar cobertura para tu familia y medicamentos clave",
  "Definir plan alineado a presupuesto real",
];
const expectedResults = [
  "Cobertura médica usable en tu zona",
  "Menos sorpresas de costo durante el año",
  "Decisión clara y documentada",
];
const faqItems = [
  {
    question: "¿Qué diferencia hay entre HMO y PPO?",
    answer: "HMO suele tener menor costo con red más cerrada; PPO ofrece más flexibilidad con costo mayor.",
  },
  {
    question: "¿Me conviene cambiar de plan cada año?",
    answer: "Depende de cambios en red, primas y necesidades médicas de tu familia.",
  },
  {
    question: "¿Incluye prevención?",
    answer: "Sí, muchos planes incluyen servicios preventivos sin costo adicional.",
  },
  {
    question: "¿Puedo mantener a mis médicos?",
    answer: "Se valida en la red antes de recomendar un plan.",
  },
  {
    question: "¿Ayudan con subsidios?",
    answer: "Sí, revisamos elegibilidad y escenarios para reducir costo total.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Salud en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
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
  description: "Comparación de planes de salud en Texas con enfoque en red médica, deducibles y costo total mensual para familias y trabajadores independientes.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Encuentra el Seguro Médico Adecuado para tu Familia en Texas</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Te ayudamos a comparar opciones de salud en Texas para que elijas cobertura útil, con red médica funcional y costos sostenibles.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es el Seguro de Salud en Texas?</h2>
          <p>
            El seguro de salud en Texas no es solo una tarjeta para emergencias; es un contrato de protección financiera contra los altos costos de la atención médica estadounidense. En Texas, donde los gastos de bolsillo por una hospitalización sin seguro pueden superar los $30,000, contar con cobertura adecuada es vital para proteger tu patrimonio y el bienestar de tu familia.
          </p>
          <p>
            TC Insurance ofrece asesoría gratuita en español para que navegues el Mercado de Seguros Médicos (Obamacare/ACA) y encuentres un plan que cubra tus medicamentos, especialistas y centros preferidos sin desestabilizar tu presupuesto mensual. Según el Texas Department of Insurance (TDI), elegir la red correcta (HMO vs. PPO) desde el inicio evita miles de dólares en facturas sorpresas.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">¿Cuánto cuesta un seguro médico en Texas?</h2>
          <p>
            El costo mensual (prima) de un seguro de salud en Texas varía radicalmente según tu edad, código postal, ingresos y tamaño del núcleo familiar.
          </p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Sin subsidios:</strong> Un plan Silver individual promedia entre $450 y $600 al mes.</li>
            <li><strong>Con subsidios (Créditos Fiscales de la ACA):</strong> Más del 80% de los tejanos califican para ayuda federal, lo que puede reducir la prima mensual a $10 - $50, e incluso a $0 en algunos escenarios.</li>
            <li><strong>Gastos de bolsillo:</strong> Además de la prima, evaluamos el deducible (lo que pagas antes de que el seguro actúe al 100%) y el Out-of-Pocket Maximum (tu límite de riesgo financiero anual), que suele oscilar entre $3,000 y $9,450.</li>
          </ul>

          
          <h2 className="text-headline text-swiss-black mt-10">Redes Médicas: HMO vs. PPO vs. EPO</h2>
          <ComparisonTable 
            columns={["HMO", "PPO", "EPO"]}
            rows={[
              { label: "Costo de Prima Mensual", values: ["Más bajo", "Más alto", "Intermedio"] },
              { label: "Requiere Referido para Especialista", values: [true, false, false] },
              { label: "Cobertura Fuera de la Red", values: ["Solo emergencias", "Sí (parcial)", "Solo emergencias"] },
              { label: "Requiere Médico Primario (PCP)", values: [true, false, "Opcional"] }
            ]}
          />


          <h2 className="text-headline text-swiss-black mt-10">Cómo trabajamos tu caso</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Validación de médicos actuales:</strong> Revisamos si tu pediatra o especialista acepta la red del nuevo seguro.</span></li>
            <li><span className="font-normal"><strong>Revisión de medicamentos (Rx):</strong> Verificamos en qué "Tier" cae tu medicina en aseguradoras como Ambetter o BCBS.</span></li>
            <li><span className="font-normal"><strong>Proyección de uso médico:</strong> Balanceamos el costo de la prima con el deducible según tus necesidades anuales.</span></li>
            <li><span className="font-normal"><strong>Definir plan alineado a presupuesto:</strong> Aseguramos que la póliza elegida proteja tus finanzas sin asfixiarte mes a mes.</span></li>
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

          <div className="border-t border-swiss-black/15 pt-8 space-y-4">
            <Link href="/blog/como-elegir-plan-de-salud-en-texas" className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
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
