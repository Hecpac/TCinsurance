import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Philosophy from "@/components/Philosophy";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Sobre Mí | ${siteConfig.brand.name}`,
  description:
    "Conoce a Yuri Tatiana Castañeda Carmona, agente integral de seguros de salud y vida en Dallas, Texas.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/sobre-mi`,
  },
  openGraph: {
    type: "website",
    url: "/sobre-mi",
    title: `Sobre Mí | ${siteConfig.brand.name}`,
    description:
      "Conoce a Yuri Tatiana Castañeda Carmona, agente integral de seguros de salud y vida en Dallas, Texas.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "TC Insurance - Sobre Yuri Tatiana Castañeda",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Sobre Mí", item: `${siteConfig.seo.siteUrl}/sobre-mi` },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuri Tatiana Castañeda Carmona",
  jobTitle: "Licensed Insurance Agent",
  worksFor: {
    "@type": "Organization",
    name: "TC Insurance Agency Services, LLC",
    url: siteConfig.seo.siteUrl,
  },
  areaServed: "Texas, USA",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <GridContainer
        as="section"
        data-testid="about-page-intro"
        data-agent-context="about-page"
        className="pt-10"
      >
        <div className="col-span-12 md:col-span-2">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            &larr; Volver a inicio
          </Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <h1 className="text-display tracking-[-0.055em] text-swiss-black">
            Sobre
            <br />
            Yuri.
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Acompañamiento cercano y estrategia técnica para proteger la salud,
          estabilidad y legado financiero de cada familia.
        </p>

        <div className="col-span-12 border-t border-swiss-black/20" />
      </GridContainer>

      <Philosophy />

      <GridContainer as="section" className="pb-24">
        <div className="col-span-12 md:col-start-8 md:col-span-5 pt-8">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            Agendar conversación &rarr;
          </Link>
        </div>
      </GridContainer>
    </div>
  );
}
