import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-indemnizacion-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Indemnización Texas | Hospitalización | TC Insurance",
  description: "Recibe efectivo directo por hospitalización, accidentes o enfermedades críticas en Texas. Desde $15/mes. Asesoría gratuita en español.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Seguro de Indemnización Texas | Hospitalización | TC Insurance",
    description: "Recibe efectivo directo por hospitalización, accidentes o enfermedades críticas en Texas. Desde $15/mes. Asesoría gratuita en español.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/obamacare-prices.jpg", width: 1200, height: 630, alt: "Seguro de indemnización en Texas con TC Insurance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Indemnización Texas | Hospitalización | TC Insurance",
    description: "Recibe efectivo directo por hospitalización, accidentes o enfermedades críticas en Texas. Desde $15/mes. Asesoría gratuita en español.",
    images: ["/blog/editorial-v3/obamacare-prices.jpg"],
  },
};

const faqItems = [
  {
    question: "¿El seguro de indemnización reemplaza mi seguro de salud?",
    answer: "No. El seguro de indemnización es un complemento. Tu seguro de salud le paga al hospital o al médico; el de indemnización te deposita efectivo directamente a ti para cubrir lo que el seguro principal no paga: deducibles, copagos altos, renta, comida o cualquier gasto mientras te recuperas.",
  },
  {
    question: "¿Cuándo me pagan el beneficio de indemnización?",
    answer: "Se activa cuando ocurre el evento cubierto en tu póliza: ingreso al hospital, diagnóstico de enfermedad crítica o accidente que requiere atención médica. Presentas el reclamo con documentación del evento y la aseguradora te deposita el monto acordado, generalmente en 7–14 días hábiles, directo a tu cuenta bancaria.",
  },
  {
    question: "¿El seguro de indemnización sirve para deducibles altos?",
    answer: "Es exactamente para eso. Si tienes un plan de salud Bronze o HDHP con deducible de $5,000–$8,000, una hospitalización te obliga a cubrir ese monto de tu bolsillo antes de que el seguro pague. La indemnización te deposita entre $1,000 y $3,000 el día del ingreso para cubrir esa brecha sin endeudarte.",
  },
  {
    question: "¿Quién debería considerar un seguro de indemnización en Texas?",
    answer: "Principalmente tres perfiles: personas con planes de salud de deducible alto que necesitan un respaldo si se hospitalizan; trabajadores independientes o freelancers que no tienen días de enfermedad pagados y pierden ingresos si no trabajan; y familias con hijos activos donde las visitas a urgencias por deportes o accidentes son frecuentes.",
  },
  {
    question: "¿Cuánto cuesta un seguro de indemnización en Texas?",
    answer: "Las primas típicas van de $15 a $40 al mes dependiendo de la edad, los beneficios seleccionados y si incluyes riders de accidentes o enfermedades críticas. Es una de las coberturas más accesibles y se puede ajustar exactamente a tu presupuesto añadiendo o quitando cláusulas.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Indemnización en Texas", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Indemnización en Texas",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Seguro de Indemnización en Texas: Efectivo Directo ante Hospitalizaciones</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Este seguro complementa tu póliza principal y aporta efectivo para cubrir deducibles o gastos inesperados por eventos críticos.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es y cómo funciona el Seguro de Indemnización?</h2>
          <p>
            Incluso con un buen seguro de salud, una estadía en el hospital puede dejarte con miles de dólares en facturas por culpa de tu deducible (Out-of-Pocket). Aquí entra el seguro de indemnización. A diferencia del médico tradicional que le paga a la clínica, una póliza de indemnización <strong>te deposita efectivo directamente a ti</strong>.
          </p>
          <p>
            Te depositamos dinero (libre de impuestos) por cada día de hospitalización, por accidentes en la sala de emergencias, o si sufres una enfermedad grave. En TC Insurance, usamos este seguro como un &quot;escudo financiero&quot; para que puedas pagar tu hipoteca, comida, y deudas mientras te recuperas sin ingresos.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">Tipos de Cobertura y Cuánto Pagan</h2>
          <p>
            Las pólizas (con primas muy accesibles, $15 a $40/mes) se pueden personalizar añadiendo &quot;cláusulas&quot; (riders) a la medida:
          </p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Hospitalización (Hospital Indemnity):</strong> Paga un monto fijo (ej. $1,000) el día de ingreso, más un monto diario (ej. $200) por los días que pases internado en cama o UCI.</li>
            <li><strong>Accidentes:</strong> Paga un beneficio fijo por eventos como huesos rotos, quemaduras, atención en urgencias, cirugías o hasta viajes en ambulancia generados por un accidente.</li>
            <li><strong>Enfermedades Críticas:</strong> Paga un monto global pre-acordado (Lump Sum de $10,000 o $25,000) si eres diagnosticado por primera vez con cáncer, infarto o derrame cerebral.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">¿A quién le conviene este seguro?</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Portadores de planes médicos de alto deducible (HDHP) o &quot;Bronze&quot; de Obamacare,</strong> donde enfrentas de entrada un riesgo de bolsillo enorme.</li>
            <li><strong>Contratistas, Freelancers o dueños de negocios:</strong> personas que no cuentan con &quot;días de enfermedad pagados&quot; (PTO) y cuyos ingresos mueren en cuanto pisan un hospital.</li>
            <li><strong>Familias muy activas con hijos menores:</strong> donde las visitas constantes a urgencias o urgent care por fracturas y deportes son una realidad.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">¿Cómo te asesoramos?</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Análisis de tu deducible médico:</strong> Estructuramos el pago de la indemnización para que coincida casi exactamente con el monto del deducible (Gap) de tu plan principal.</span></li>
            <li><span className="font-normal"><strong>Gestión de presupuesto:</strong> Añadimos riders de accidentes o enfermedades críticas solo si no rompen la meta mensual de la familia.</span></li>
            <li><span className="font-normal"><strong>Filtrado de aseguradoras:</strong> Seleccionamos compañías sin examen médico y con reputación de pagar reclamos rápidamente por depósito directo.</span></li>
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

          <h2 className="text-headline text-swiss-black mt-10">Coberturas relacionadas</h2>
          <ul className="space-y-3 text-body text-swiss-gray">
            <li>
              <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
                Seguro de Salud en Texas &rarr;
              </Link>
              <p className="text-sm text-swiss-gray/70 mt-1">Elige tu plan principal y complementa con indemnización.</p>
            </li>
            <li>
              <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-gastos-finales-texas">
                Seguro de Gastos Finales &rarr;
              </Link>
              <p className="text-sm text-swiss-gray/70 mt-1">Protección adicional para cubrir costos funerarios y deudas.</p>
            </li>
            <li>
              <Link className="tap-target hover:text-swiss-red-ink" href="/blog/subsidios-aca-2026-texas">
                Subsidios ACA 2026: qué cambió en Texas &rarr;
              </Link>
              <p className="text-sm text-swiss-gray/70 mt-1">Muchas familias con deducibles altos necesitan indemnización como respaldo.</p>
            </li>
          </ul>
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
