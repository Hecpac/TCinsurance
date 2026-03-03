import type { Metadata } from "next";
import Link from "next/link";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Seguros en Dallas, TX | Salud, Vida y Gastos Finales | TC Insurance",
  description:
    "Asesoría en español para seguros de salud, vida y gastos finales en Dallas, TX. Compara planes y define tu cobertura con claridad.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/seguros-dallas-tx`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.seo.siteUrl}/seguros-dallas-tx`,
    title: "Seguros en Dallas, TX | TC Insurance",
    description:
      "Asesoría en español para seguros de salud, vida y gastos finales en Dallas, TX.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Asesoría de seguros en Dallas, Texas",
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
      name: "¿Qué seguros trabajan para familias en Dallas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabajamos seguros de salud, vida, gastos finales, dental, visión, Medicare e indemnización según tu perfil y presupuesto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puedo comparar opciones antes de decidir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Te mostramos opciones comparadas y te explicamos diferencias clave de costos, red y beneficios para tomar una decisión informada.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden también en Fort Worth y Lewisville?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Atendemos todo el metroplex DFW y también de forma remota en Texas.",
      },
    },
  ],
};

export default function SegurosDallasPage() {
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
            <p className="text-meta uppercase tracking-[0.14em] text-swiss-gray">Dallas, Texas</p>
            <h1 className="pt-4 text-display tracking-[-0.055em] text-swiss-black">
              Seguros de salud, vida y gastos finales en Dallas, TX
            </h1>
          </div>

          <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray">
            Te ayudamos a estructurar cobertura para proteger ingreso, familia y patrimonio con
            decisiones simples y orientadas a resultados.
          </p>

          <div className="col-span-12 border-t border-swiss-black/20" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Enfoque para Dallas</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-swiss-gray marker:text-swiss-red">
              <li>Planes de salud con buena red para tu zona.</li>
              <li>Cobertura de vida para estabilidad financiera familiar.</li>
              <li>Estrategia de gastos finales para reducir carga económica.</li>
            </ul>
          </article>

          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Rutas rápidas</h2>
            <ul className="mt-4 space-y-2 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
                  Ver Seguro de Salud →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-vida-dallas">
                  Ver Seguro de Vida →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/medicare-texas">
                  Ver Medicare →
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
              Agenda asesoría en Dallas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
