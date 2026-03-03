import type { Metadata } from "next";
import Link from "next/link";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Seguros en Fort Worth, TX | Salud, Vida y Gastos Finales | TC Insurance",
  description:
    "Asesoría en español para seguros de salud, vida y gastos finales en Fort Worth, TX. Define tu cobertura con comparativa clara y soporte continuo.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/seguros-fort-worth-tx`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.seo.siteUrl}/seguros-fort-worth-tx`,
    title: "Seguros en Fort Worth, TX | TC Insurance",
    description:
      "Asesoría en español para seguros de salud, vida y gastos finales en Fort Worth, TX.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Asesoría de seguros en Fort Worth, Texas",
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo funciona la asesoría de seguros en Fort Worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Analizamos tu situación, comparamos planes y te explicamos recomendaciones concretas para que elijas cobertura con confianza.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden pólizas para familias y dueños de negocio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Atendemos familias, autoempleados y pequeños negocios que necesitan cobertura médica y financiera en Texas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo hacer todo por teléfono o WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Ofrecemos atención remota para agilizar cotización, comparación y seguimiento en todo Texas.",
      },
    },
  ],
};

export default function SegurosFortWorthPage() {
  return (
    <main className="min-h-screen overflow-x-hidden pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <Link href="/servicios" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
              &larr; Volver a servicios
            </Link>
          </div>

          <div className="col-span-12 md:col-start-2 md:col-span-9">
            <p className="text-meta uppercase tracking-[0.14em] text-swiss-gray">Fort Worth, Texas</p>
            <h1 className="pt-4 text-display tracking-[-0.055em] text-swiss-black">
              Seguros de salud, vida y gastos finales en Fort Worth, TX
            </h1>
          </div>

          <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray">
            Te guiamos para elegir cobertura útil y sostenible para tu familia, con asesoría bilingüe
            y decisiones basadas en costo-beneficio real.
          </p>

          <div className="col-span-12 border-t border-swiss-black/20" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Cobertura recomendada</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-swiss-gray marker:text-swiss-red">
              <li>Salud + visión/dental para control de gastos médicos.</li>
              <li>Vida + gastos finales para proteger a la familia.</li>
              <li>Pólizas de indemnización para respaldo en efectivo.</li>
            </ul>
          </article>

          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Explorar coberturas</h2>
            <ul className="mt-4 space-y-2 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
                  Seguro de Salud →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-gastos-finales-texas">
                  Gastos Finales →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-indemnizacion-texas">
                  Seguro de Indemnización →
                </Link>
              </li>
            </ul>
          </article>

          <div className="col-span-12 border-t border-swiss-black/20" />

          <div className="col-span-12 md:col-start-8 md:col-span-5 pt-2">
            <Link
              href={HOME_SECTION_PATHS.contact}
              className="primary-cta tap-target inline-flex border px-5 py-3 text-meta"
            >
              Agenda asesoría en Fort Worth
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
