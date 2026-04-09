import type { Metadata } from "next";
import Link from "next/link";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Seguros Fort Worth TX | Salud, Vida y Gastos Finales | TC Insurance",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguros en Fort Worth", item: `${siteConfig.seo.siteUrl}/seguros-fort-worth-tx` },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Seguros para la comunidad latina en Fort Worth
            </h2>
            <p className="mt-4 text-body text-swiss-gray">
              Fort Worth y el condado de Tarrant tienen una población hispana que crece cada año. Desde
              el Northside y Stockyards hasta Haltom City y Saginaw, familias latinas buscan cobertura
              médica accesible y protección financiera que se explique sin tecnicismos.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              Muchas familias en Fort Worth dependen de trabajos independientes, construcción o servicios
              donde no hay seguro de empleador. Eso hace que elegir un plan por cuenta propia sea difícil
              sin orientación. En TC Insurance te ayudamos a navegar las opciones del Marketplace (ACA),
              Medicare y seguros complementarios con una comparación transparente.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              No importa si es tu primera vez buscando seguro o si necesitas cambiar de plan: la
              asesoría es gratuita, en español, y sin compromiso. Atendemos presencial en nuestra
              oficina de Lewisville y de forma remota por teléfono, WhatsApp o videollamada para
              todo Fort Worth y alrededores.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Qué tipo de cobertura necesitas en Fort Worth
            </h2>
          </div>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Salud y prevención</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Planes con acceso a JPS Health Network, Texas Health y Cook Children&apos;s. Comparamos
              costos reales: prima mensual, deducible, copagos de especialistas y medicamentos.
              Si calificas para subsidios ACA, te ayudamos con la aplicación.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
              Ver seguros de salud →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Protección familiar</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Seguro de vida para cubrir hipoteca, renta y gastos del hogar si algo te pasa. Seguro
              de gastos finales para que tu familia no cargue con costos funerarios. Opciones desde
              $15/mes con aprobación rápida.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-vida-dallas">
              Ver seguros de vida →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Complementos</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Dental, visión e indemnización como respaldo adicional. Ideales para cubrir lo que
              el seguro de salud no incluye: lentes, limpiezas dentales y pagos en efectivo por
              hospitalización o accidente.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-dental-texas">
              Ver dental y visión →
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Proceso de asesoría para Fort Worth
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-body text-swiss-gray marker:text-swiss-red marker:font-semibold">
              <li>
                <strong className="text-swiss-black">Agenda tu consulta</strong> — Por teléfono,
                WhatsApp o formulario. Es gratuita y sin compromiso.
              </li>
              <li>
                <strong className="text-swiss-black">Análisis de tu situación</strong> — Revisamos
                ingreso familiar, dependientes, condiciones preexistentes y prioridades.
              </li>
              <li>
                <strong className="text-swiss-black">Opciones comparadas</strong> — Te mostramos
                2-3 planes con precios reales, red médica en Fort Worth y beneficios detallados.
              </li>
              <li>
                <strong className="text-swiss-black">Acompañamiento continuo</strong> — Te apoyamos
                con renovaciones, reclamaciones y ajustes durante toda la vigencia.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">Recursos para Fort Worth</h2>
            <ul className="mt-4 space-y-3 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/seguro-gastos-finales-texas-guia-completa">
                  Guía completa de seguro de gastos finales en Texas →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/medicare-texas-2026">
                  Medicare en Texas 2026: lo que necesitas saber →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/medicaid-texas-2026-como-renovar-cobertura">
                  Medicaid en Texas 2026: cómo renovar tu cobertura →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-20">
        <div className="grid grid-cols-12 gap-6">
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
