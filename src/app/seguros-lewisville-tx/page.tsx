import type { Metadata } from "next";
import Link from "next/link";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Seguros en Lewisville, TX | Salud, Vida y Gastos Finales | TC Insurance",
  description:
    "Asesoría en español para seguros de salud, vida y gastos finales en Lewisville, TX. Compara opciones y recibe recomendación clara en una llamada.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/seguros-lewisville-tx`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.seo.siteUrl}/seguros-lewisville-tx`,
    title: "Seguros en Lewisville, TX | TC Insurance",
    description:
      "Asesoría en español para seguros de salud, vida y gastos finales en Lewisville, TX.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Asesoría de seguros en Lewisville, Texas",
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
    { "@type": "ListItem", position: 3, name: "Seguros en Lewisville", item: `${siteConfig.seo.siteUrl}/seguros-lewisville-tx` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué tipo de seguros manejan en Lewisville, TX?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Te ayudamos con seguro de salud, vida, gastos finales, dental, visión, Medicare e indemnización en Lewisville y alrededores.",
      },
    },
    {
      "@type": "Question",
      name: "¿La asesoría es en español?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. La asesoría es bilingüe (español e inglés) y está enfocada en explicar coberturas y costos con claridad.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden solo presencial o también remoto?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos en Lewisville y también por teléfono, WhatsApp o videollamada para todo Texas.",
      },
    },
  ],
};

export default function SegurosLewisvillePage() {
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
            <p className="text-meta uppercase tracking-[0.14em] text-swiss-gray">Lewisville, Texas</p>
            <h1 className="pt-4 text-display tracking-[-0.055em] text-swiss-black">
              Seguros de salud, vida y gastos finales en Lewisville, TX
            </h1>
          </div>

          <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray">
            Diseñamos cobertura para familias latinas en Lewisville con enfoque práctico: red médica,
            presupuesto mensual y protección financiera real.
          </p>

          <div className="col-span-12 border-t border-swiss-black/20" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Qué resolvemos en tu caso</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-swiss-gray marker:text-swiss-red">
              <li>Comparación de planes sin perderte entre opciones.</li>
              <li>Selección de cobertura según etapa de vida y presupuesto.</li>
              <li>Acompañamiento para dudas y decisiones de renovación.</li>
            </ul>
          </article>

          <article className="col-span-12 md:col-span-6 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h2 className="text-headline text-swiss-black">Servicios más solicitados</h2>
            <ul className="mt-4 space-y-2 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
                  Seguro de Salud en Texas →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-vida-dallas">
                  Seguro de Vida →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-gastos-finales-texas">
                  Gastos Finales →
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
              Nuestra base en Lewisville: asesoría local y personal
            </h2>
            <p className="mt-4 text-body text-swiss-gray">
              TC Insurance tiene su oficina en Lewisville, sobre Union Station Parkway. Esto nos
              permite atender de forma personal a familias en Castle Hills, Old Town Lewisville,
              Valley Ridge y comunidades cercanas como Flower Mound, Highland Village y The Colony.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              Lewisville tiene una comunidad hispana que ha crecido significativamente en los últimos
              años. Muchas familias trabajan en logística, manufactura, restaurantes y comercio local.
              Entendemos sus necesidades porque las vivimos de cerca: presupuestos ajustados,
              horarios complicados y la necesidad de que alguien explique las opciones en español
              sin prisa.
            </p>
            <p className="mt-4 text-body text-swiss-gray">
              Nuestra fundadora, Tatiana Castañeda, vive en esta comunidad y trabaja directamente
              con cada familia. No somos un call center: somos tu vecina agente de seguros que conoce
              tu zona, tu presupuesto y tus prioridades.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Seguros más buscados en Lewisville
            </h2>
          </div>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Seguro de Salud ACA</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Planes del Marketplace con acceso a Medical City Lewisville, Texas Health Presbyterian
              y clínicas locales. Te ayudamos a verificar si calificas para subsidios y a elegir
              el plan con mejor relación cobertura-precio.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
              Comparar planes de salud →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Medicare y suplementos</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Si tienes 65+ o discapacidad, te explicamos las diferencias entre Medicare Original,
              Advantage y Medigap. Comparamos costos de recetas y acceso a especialistas en el
              área de Lewisville.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/medicare-texas">
              Ver opciones de Medicare →
            </Link>
          </article>

          <article className="col-span-12 md:col-span-4 border border-m3-outline-variant bg-m3-surface-container-low p-6">
            <h3 className="text-body font-semibold text-swiss-black">Vida y gastos finales</h3>
            <p className="mt-2 text-body text-swiss-gray">
              Protege a tu familia con seguro de vida desde $15/mes. El seguro de gastos finales
              cubre servicios funerarios sin dejar deudas. Aprobación rápida, muchas veces sin
              examen médico.
            </p>
            <Link className="mt-3 inline-block tap-target text-meta text-swiss-red hover:text-swiss-red-ink" href="/servicios/seguro-gastos-finales-texas">
              Ver gastos finales →
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">
              Cómo agendar tu asesoría en Lewisville
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-body text-swiss-gray marker:text-swiss-red marker:font-semibold">
              <li>
                <strong className="text-swiss-black">Contacta por WhatsApp o teléfono</strong> — Es
                el canal más rápido. También puedes usar el formulario de esta página.
              </li>
              <li>
                <strong className="text-swiss-black">Platicamos tu situación</strong> — En 15-20
                minutos entendemos tu presupuesto, familia y necesidades.
              </li>
              <li>
                <strong className="text-swiss-black">Recibe tu comparación personalizada</strong> — Te
                enviamos opciones concretas con precios reales y red médica local.
              </li>
              <li>
                <strong className="text-swiss-black">Decide sin presión</strong> — Tú eliges cuándo
                y qué contratar. Si necesitas tiempo, la información queda contigo.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-headline text-swiss-black">Lecturas recomendadas</h2>
            <ul className="mt-4 space-y-3 text-body text-swiss-gray">
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/agente-seguros-salud-lewisville-tx">
                  Agente de seguros de salud bilingüe en Lewisville, TX →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/como-elegir-plan-de-salud-en-texas">
                  Cómo elegir un plan de salud en Texas →
                </Link>
              </li>
              <li>
                <Link className="tap-target hover:text-swiss-red-ink" href="/blog/medicare-texas-2026">
                  Medicare en Texas 2026: diferencias y costos →
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
              Agenda asesoría en Lewisville
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
