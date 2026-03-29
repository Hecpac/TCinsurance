import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Services from "@/components/Services";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";
import { servicesCatalog } from "@/data/services";

export const metadata: Metadata = {
  title: "Seguros en Dallas, Fort Worth y Lewisville, Texas | TC Insurance",
  description:
    "Catálogo técnico de coberturas: salud, vida, gastos finales, dental, Medicare, visión y pólizas de indemnización.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/servicios`,
  },
  openGraph: {
    type: "website",
    url: "/servicios",
    title: "Seguros en Dallas, Fort Worth y Lewisville, Texas | TC Insurance",
    description:
      "Catálogo técnico de coberturas: salud, vida, gastos finales, dental, Medicare, visión y pólizas de indemnización.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "TC Insurance - Servicios de seguros en Texas",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: servicesCatalog.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: `${s.titleEs} — ${s.titleEn}`,
      description: s.description,
      provider: {
        "@type": "Organization",
        name: "TC Insurance Agency Services, LLC",
        url: siteConfig.seo.siteUrl,
      },
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <GridContainer
        as="section"
        data-testid="services-page-intro"
        data-agent-context="services-page"
        className="pt-10"
      >
        <div className="col-span-12 md:col-span-2">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            &larr; Volver a inicio
          </Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <h1 className="text-display tracking-[-0.055em] text-swiss-black">
            Seguros de Salud, Vida{" "}
            <br />
            y Gastos Finales en Dallas / Fort Worth / Lewisville.
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Diseñamos combinaciones de cobertura para familias en Dallas, Fort Worth y Lewisville según etapa de vida, presupuesto y perfil de riesgo.
        </p>

        <div className="col-span-12 border-t border-swiss-black/20" />
      </GridContainer>

      <GridContainer as="section" className="pb-10">
        <div className="col-span-12 md:col-start-2 md:col-span-10 border border-m3-outline-variant bg-m3-surface-container-low p-6">
          <p className="text-meta uppercase tracking-[0.12em] text-swiss-gray">Cobertura local</p>
          <h2 className="pt-3 text-headline text-swiss-black">Guías por ciudad para elegir cobertura</h2>
          <div className="pt-5 flex flex-wrap gap-3 text-meta">
            <Link className="tap-target border border-m3-outline-variant px-4 py-2 hover:text-swiss-red-ink" href="/seguros-lewisville-tx">
              Seguros en Lewisville →
            </Link>
            <Link className="tap-target border border-m3-outline-variant px-4 py-2 hover:text-swiss-red-ink" href="/seguros-dallas-tx">
              Seguros en Dallas →
            </Link>
            <Link className="tap-target border border-m3-outline-variant px-4 py-2 hover:text-swiss-red-ink" href="/seguros-fort-worth-tx">
              Seguros en Fort Worth →
            </Link>
          </div>
        </div>
      </GridContainer>

      <Services />

      <GridContainer as="section" className="pb-24">
        <div className="col-span-12 md:col-start-8 md:col-span-5 pt-8">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            Encuentra tu cobertura ideal &rarr;
          </Link>
        </div>
      </GridContainer>
    </div>
  );
}
