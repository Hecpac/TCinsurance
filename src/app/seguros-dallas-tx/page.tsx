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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguros en Dallas", item: `${siteConfig.seo.siteUrl}/seguros-dallas-tx` },
  ],
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Por qué familias en Dallas confían en TC Insurance
            </h2>
            <p className="mt-4 text-body text-swiss-gray">
              Dallas tiene una de las comunidades latinas más grandes de Texas. Desde Oak Cliff y Pleasant
              Grove hasta Northwest Dallas y Vickery Meadow, miles de familias hispanohablantes necesitan
              orientación clara para elegir cobertura médica y financiera sin barreras de idioma.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              En TC Insurance trabajamos con familias en todas las etapas: jóvenes que buscan su primer
              seguro de salud, padres que necesitan proteger a sus hijos con cobertura dental y visión,
              y adultos mayores que están transitando a Medicare o quieren asegurar sus gastos finales.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              Nuestra asesoría es completamente en español y sin costo. No vendemos un plan específico:
              comparamos opciones de múltiples aseguradoras para encontrar la combinación de cobertura,
              red médica y precio que se ajuste a tu situación real en Dallas.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Coberturas más solicitadas en Dallas
            </h2>
          </div>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Seguro de Salud</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Planes ACA con subsidios federales, PPO y HMO con acceso a hospitales como Parkland,
              Baylor Scott & White y Methodist Dallas. Comparamos deducibles, copagos y red médica
              para que elijas con datos, no con dudas.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
              Ver opciones de salud →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Seguro de Vida</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Pólizas de término y permanentes para proteger hipoteca, educación de tus hijos y
              estabilidad familiar. Desde $15/mes según edad y cobertura. Ideal para familias
              en Dallas con doble ingreso o negocio propio.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-vida-dallas">
              Ver opciones de vida →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Gastos Finales</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Cobertura de $5,000 a $50,000 para cubrir servicios funerarios, deudas pendientes y
              gastos inmediatos. Sin examen médico en muchos casos. Protege a tu familia de una
              carga financiera inesperada.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-gastos-finales-texas">
              Ver opciones de gastos finales →
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Cómo funciona la asesoría en Dallas
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-body text-swiss-gray marker:text-swiss-red marker:font-semibold">
              <li>
                <strong className="text-swiss-black">Conversación inicial</strong> — Agendas una
                llamada o videollamada gratuita. Revisamos tu situación: edad, familia, presupuesto,
                condiciones médicas y prioridades.
              </li>
              <li>
                <strong className="text-swiss-black">Comparación de planes</strong> — Te presentamos
                2-3 opciones reales con costos mensuales, deducibles, copagos y red médica en Dallas.
                Todo explicado en español.
              </li>
              <li>
                <strong className="text-swiss-black">Decisión informada</strong> — Tú eliges. No hay
                presión ni letra pequeña. Si necesitas tiempo, te dejamos la comparación por escrito.
              </li>
              <li>
                <strong className="text-swiss-black">Seguimiento continuo</strong> — Te ayudamos con
                renovaciones, cambios de plan y cualquier duda durante la vigencia de tu póliza.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">Artículos relevantes para Dallas</h2>
            <ul className="mt-4 space-y-3 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/como-elegir-plan-de-salud-en-texas">
                  Cómo elegir un plan de salud en Texas sin perder cobertura clave →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/seguro-de-vida-liquidez-familiar">
                  Seguro de vida: liquidez inmediata para la estabilidad familiar →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/subsidios-aca-2026-texas">
                  Subsidios ACA 2026 en Texas: qué cambió y qué opciones tienes →
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
              Agenda asesoría en Dallas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
