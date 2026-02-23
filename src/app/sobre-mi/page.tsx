import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Philosophy from "@/components/Philosophy";
import AboutContent from "./components/AboutContent";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tatiana Castañeda — Agente de Seguros en Español, Dallas TX | TC Insurance",
  description:
    "Conoce a Tatiana Castañeda, agente integral de seguros de salud y vida en Dallas, Texas. Asesoría en español para proteger a tu familia.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/sobre-mi`,
  },
  openGraph: {
    type: "website",
    url: "/sobre-mi",
    title: "Tatiana Castañeda — Agente de Seguros en Español, Dallas TX | TC Insurance",
    description:
      "Conoce a Tatiana Castañeda, agente integral de seguros de salud y vida en Dallas, Texas. Asesoría en español para proteger a tu familia.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "TC Insurance - Sobre Tatiana Castañeda",
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
  name: "Tatiana Castañeda",
  jobTitle: "Licensed Insurance Agent",
  worksFor: {
    "@type": "InsuranceAgency",
    name: "TC Insurance Agency Services, LLC",
    url: siteConfig.seo.siteUrl,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dallas",
    addressRegion: "TX",
  },
  knowsLanguage: ["Spanish", "English"],
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
            Tatiana
            <br />
            Castañeda.
            <span className="block text-headline mt-4 text-swiss-gray font-normal tracking-normal">
              Agente de Seguros de Salud y Vida en Dallas, Texas
            </span>
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Acompañamiento cercano y estrategia técnica para proteger la salud,
          estabilidad y legado financiero de cada familia.
        </p>

        <div className="col-span-12 border-t border-swiss-black/20" />
      </GridContainer>

      <Philosophy />

      <AboutContent />
    </div>
  );
}
