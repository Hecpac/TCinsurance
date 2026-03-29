import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-gastos-finales-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Gastos Finales en Texas | TC Insurance",
  description:
    "Conoce cómo funciona el seguro de gastos finales en Texas, qué costos cubre y cómo elegir una póliza clara para proteger a tu familia.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Gastos Finales en Texas | TC Insurance",
    description:
      "Guía práctica para familias en Dallas/Fort Worth: costos, cobertura y checklist para elegir seguro de gastos finales sin errores.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: "/blog/editorial-v3/final-expense-legacy.jpg",
        width: 1200,
        height: 630,
        alt: "Seguro de gastos finales en Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Gastos Finales en Texas | TC Insurance",
    description:
      "Qué cubre, cuánto cuesta y cómo elegir una póliza de gastos finales para proteger a tu familia en Texas.",
    images: ["/blog/editorial-v3/final-expense-legacy.jpg"],
  },
};

const faqItems = [
  {
    question: "¿Qué cubre el seguro de gastos finales en Texas?",
    answer:
      "Generalmente cubre funeral o cremación, trámites, deudas médicas pendientes y costos urgentes de transición familiar.",
  },
  {
    question: "¿Cuánto dinero debería considerar para esta cobertura?",
    answer:
      "Depende de tu ciudad y necesidades, pero muchas familias parten de un monto que cubra funeral, documentación y un margen para gastos inmediatos.",
  },
  {
    question: "¿Se paga rápido al beneficiario?",
    answer:
      "La finalidad de esta póliza es entregar liquidez en el corto plazo para evitar presión financiera durante el duelo.",
  },
  {
    question: "¿Conviene combinarlo con seguro de vida temporal?",
    answer:
      "Sí, en muchos casos: el temporal protege ingresos y el de gastos finales cubre costos de cierre inmediatos.",
  },
  {
    question: "¿Cómo elijo una póliza sin equivocarme?",
    answer:
      "Define monto objetivo, verifica beneficiarios, revisa condiciones de pago y asegúrate de que la prima sea sostenible en el tiempo.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servicios",
      item: `${siteConfig.seo.siteUrl}/servicios`,
    },
    { "@type": "ListItem", position: 3, name: "Gastos Finales", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de gastos finales en Texas",
  serviceType: "Final Expense Insurance",
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
  description:
    "Asesoría en español para seguro de gastos finales en Texas con enfoque en liquidez inmediata y protección familiar.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function GastosFinalesServicePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <GridContainer as="section" className="pt-10 pb-20" data-agent-context="service-gastos-finales">
        <div className="col-span-12 md:col-span-2">
          <Link href="/servicios" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            &larr; Volver a servicios
          </Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <p className="text-meta uppercase tracking-[0.16em] text-swiss-gray">Servicio especializado</p>
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">
            Seguro de Gastos Finales en Texas
          </h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">
            Diseñamos cobertura para que tu familia tenga liquidez cuando más la necesita. Sin lenguaje
            complicado: solo claridad, estructura y protección financiera real para el cierre de una etapa crítica.
          </p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">Qué resuelve este servicio</h2>
          <p>
            El seguro de gastos finales está diseñado para cubrir necesidades inmediatas: funeral, trámites,
            saldos urgentes y costos de transición del hogar. Su valor principal no es “invertir”; es evitar que una
            familia tenga que financiar una emergencia emocional con deuda.
          </p>
          <p>
            En Texas, muchos hogares subestiman el costo total de cierre. No solo existe el gasto funerario: también
            aparecen pagos administrativos, movimientos logísticos y compromisos de corto plazo. Nuestra asesoría se
            enfoca en definir una cobertura que sí responda al escenario real de tu familia.
          </p>

          <h2 className="text-headline text-swiss-black">Cómo trabajamos la recomendación</h2>
          <ol className="space-y-2 pl-6 list-decimal marker:text-swiss-red marker:font-semibold">
            <li>Evaluamos monto objetivo según contexto familiar y ciudad.</li>
            <li>Comparamos opciones con lenguaje claro en español.</li>
            <li>Validamos beneficiarios y condiciones de pago.</li>
            <li>Revisamos sostenibilidad de prima a largo plazo.</li>
            <li>Documentamos la ruta de activación para tu familia.</li>
          </ol>

          <h2 className="text-headline text-swiss-black">Resultados que buscamos</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li>Liquidez rápida para evitar deuda improvisada.</li>
            <li>Cobertura alineada a costos reales de tu entorno.</li>
            <li>Beneficiarios y documentación listos para ejecución.</li>
            <li>Menor fricción operativa en un momento de alta carga emocional.</li>
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
            <p className="text-swiss-black">
              ¿Quieres profundizar antes de decidir? Revisa la guía completa del blog con ejemplos prácticos:
            </p>
            <Link
              href="/blog/seguro-gastos-finales-texas-guia-completa"
              className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink"
            >
              Leer guía completa de gastos finales &rarr;
            </Link>
          </div>
        </section>

        <section className="col-span-12 md:col-start-8 md:col-span-5 pt-10">
          <div className="border border-swiss-black/15 p-6 space-y-4">
            <p className="text-meta uppercase tracking-[0.12em] text-swiss-gray">Siguiente paso</p>
            <h2 className="text-headline text-swiss-black">Agenda tu asesoría</h2>
            <p className="text-body text-swiss-black/80">
              En 15 minutos definimos si esta cobertura aplica a tu caso y qué rango tiene sentido para tu familia.
            </p>
            <Link
              href={HOME_SECTION_PATHS.contact}
              className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink"
            >
              Consulta gratis &rarr;
            </Link>
          </div>
        </section>
      </GridContainer>
    </div>
  );
}
