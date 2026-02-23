import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import ComparisonTable from "@/components/ComparisonTable";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/medicare-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes",
  description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes",
    description: "Asesoría en español para Medicare en Texas: comparar médicos, recetas y costos mensuales para elegir plan sin errores.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes",
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
    { "@type": "ListItem", position: 3, name: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Medicare en Dallas, Fort Worth y Lewisville, Texas | Comparación de Planes",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Asesoría Integral de Medicare en Texas</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Analizamos opciones Medicare según médicos, medicamentos y presupuesto para evitar decisiones costosas o incompatibles.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es Medicare y por qué necesitas asesoría?</h2>
          <p>
            Medicare es el programa federal de seguro de salud para personas de 65 años o más (y ciertas personas más jóvenes con discapacidades). Sin embargo, inscribirse no significa que "todo es gratis". El sistema de Medicare original tiene vacíos de cobertura que pueden llevarte a pagar miles de dólares en deducibles y copagos si no lo complementas adecuadamente.
          </p>
          <p>
            En TC Insurance, nos especializamos en ayudar a la comunidad hispana en Texas a descifrar la sopa de letras de Medicare (Partes A, B, C y D) para que elijas el plan que mejor se adapte a tus necesidades de salud y a tu bolsillo.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">Costos y Partes de Medicare Original</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Parte A (Hospital):</strong> Generalmente no tiene prima mensual si tú o tu cónyuge trabajaron y pagaron impuestos de Medicare por al menos 10 años (40 trimestres). Cubre estadías en el hospital y cuidado en centros de enfermería.</li>
            <li><strong>Parte B (Médico):</strong> Cubre visitas al doctor, atención ambulatoria y equipo médico. La prima estándar en 2026 ronda los  mensuales. No tiene límite de gastos de bolsillo (Out-of-Pocket Maximum).</li>
            <li><strong>El Peligro del 20%:</strong> Medicare Original solo cubre el 80% de los costos aprobados de la Parte B. Tú eres responsable del 20% restante, sin límite anual, lo que hace indispensable un plan adicional.</li>
          </ul>

          
          <h2 className="text-headline text-swiss-black mt-10">Caminos para tu cobertura: Advantage vs. Suplemento (Medigap)</h2>
          <ComparisonTable 
            columns={["Medicare Advantage (Parte C)", "Medicare Suplementario (Medigap)"]}
            rows={[
              { label: "Prima Mensual Promedio", values: ["$0 - $50", "$100 - $200+"] },
              { label: "Costos de Bolsillo al usar", values: ["Copagos por visita", "Casi $0 después de deducible"] },
              { label: "Red de Médicos", values: ["Limitada (HMO/PPO local)", "Cualquiera que acepte Medicare a nivel nacional"] },
              { label: "Requiere referidos", values: ["Usualmente Sí", false] },
              { label: "Cobertura de Medicinas (Parte D)", values: ["Incluida casi siempre", "Debe comprarse por separado"] },
              { label: "Beneficios Extra (Dental/Visión)", values: [true, false] }
            ]}
          />


          <h2 className="text-headline text-swiss-black mt-10">Cómo elegir el plan correcto en Texas</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Validación de tus médicos:</strong> Revisamos si tus doctores actuales aceptan un plan Advantage específico o si necesitas la libertad total de un Medigap.</span></li>
            <li><span className="font-normal"><strong>Revisión de tu lista de medicamentos (Rx):</strong> Las medicinas caras son la mayor fuente de gastos sorpresa. Comparamos tu lista exacta contra el formulario de cada plan para minimizar tus costos en farmacia.</span></li>
            <li><span className="font-normal"><strong>Análisis de tolerancia al riesgo:</strong> Evaluamos si prefieres pagar una prima fija más alta pero casi nada al ir al doctor (Medigap), o pagar /bin/zsh de prima mensual pero con copagos por uso (Advantage).</span></li>
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
