import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Philosophy from "@/components/Philosophy";
import AboutContent from "./components/AboutContent";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tatiana Castañeda — Agente de Seguros en Español, Dallas TX | TC Insurance",
  description:
    "Tatiana Castañeda es agente licenciada de seguros de salud, vida y gastos finales en Dallas, Texas. Asesoría personalizada en español para familias latinas en DFW. Agenda tu consulta gratuita.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/sobre-mi`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.seo.siteUrl}/sobre-mi`,
    title: "Tatiana Castañeda — Agente de Seguros en Español en Dallas, Texas",
    description:
      "Asesoría personalizada en español para seguros de salud, vida y gastos finales. Agente licenciada en Texas desde 2020.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: "/Tatiana.png",
        width: 1200,
        height: 630,
        alt: "Tatiana Castañeda, agente de seguros en Dallas TX",
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
  givenName: "Yuri Tatiana",
  familyName: "Castañeda Carmona",
  jobTitle: "Licensed Insurance Agent",
  description: "Agente licenciada de seguros de salud, vida y gastos finales en Dallas, Texas. Asesoría personalizada en español para familias latinas en DFW.",
  url: `${siteConfig.seo.siteUrl}/sobre-mi`,
  image: `${siteConfig.seo.siteUrl}/Tatiana.png`,
  telephone: "+12039932369",
  email: "tcinsurance85@gmail.com",
  knowsLanguage: ["Spanish", "English"],
  worksFor: {
    "@type": "InsuranceAgency",
    name: "TC Insurance Agency Services, LLC",
    url: siteConfig.seo.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "14951 Dallas Pkwy Suite 240",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75254",
      addressCountry: "US"
    },
    foundingDate: "2020",
    areaServed: [
      { "@type": "City", name: "Dallas" },
      { "@type": "City", name: "Fort Worth" },
      { "@type": "City", name: "Lewisville" },
      { "@type": "City", name: "Irving" },
      { "@type": "City", name: "Denton" },
      { "@type": "State", name: "Texas" }
    ]
  },
  sameAs: [
    "https://www.instagram.com/tcinsurance1",
    "https://www.facebook.com/TatianaCastanedaSeguros"
  ]
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
          <p className="text-meta uppercase tracking-[0.16em] text-swiss-gray mb-4">Sobre Tatiana Castañeda</p>
          <h1 className="text-display tracking-[-0.055em] text-swiss-black">
            Agente de Seguros de Salud, Vida y Gastos Finales en Dallas, Texas
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Asesoría personalizada en español para familias latinas en Dallas–Fort Worth. Comparo opciones, explico la letra pequeña y te acompaño en cada decisión de cobertura.
        </p>

        <div className="col-span-12 border-t border-swiss-black/20" />
      </GridContainer>

      <Philosophy />

      <AboutContent />
    </div>
  );
}
