import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Philosophy from "@/components/Philosophy";
import AboutContent from "./components/AboutContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conoce a Tatiana Castañeda — Agente bilingüe de seguros en Texas | TIC Insurance",
  description:
    "Tatiana Castañeda, agente licenciada de seguros en Texas. Claridad bilingüe (español/inglés) en Salud, Vida, Gastos Finales, Medicare y Dental/Visión para familias hispanas en Dallas, Fort Worth y todo el estado.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/sobre-mi`,
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.seo.siteUrl}/sobre-mi`,
    title: "Conoce a Tatiana Castañeda — Agente bilingüe de seguros en Texas",
    description:
      "Claridad para proteger a tu familia. Tatiana Castañeda, agente licenciada en Texas, te explica Salud, Vida, Gastos Finales, Medicare y Dental/Visión en español o inglés.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: "/brand/tatiana-portrait.png",
        width: 1200,
        height: 1200,
        alt: "Tatiana Castañeda, agente bilingüe de seguros en Texas",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
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
  description: "Agente bilingüe (español/inglés) licenciada en Texas. Acompaña a familias hispanas en Salud (ACA/Marketplace), Vida, Gastos Finales, Medicare y Dental/Visión con claridad y sin letras chicas.",
  url: `${siteConfig.seo.siteUrl}/sobre-mi`,
  image: `${siteConfig.seo.siteUrl}/brand/tatiana-portrait.png`,
  telephone: "+12039932369",
  email: "tcinsurance85@gmail.com",
  knowsLanguage: ["Spanish", "English"],
  worksFor: {
    "@type": "InsuranceAgency",
    name: "TC Insurance Agency Services, LLC",
    url: siteConfig.seo.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "883 Union Station Parkway Apt 20212",
      addressLocality: "Lewisville",
      addressRegion: "TX",
      postalCode: "75057",
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
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "Texas Licensed Insurance Agent",
    recognizedBy: {
      "@type": "GovernmentOrganization",
      name: "Texas Department of Insurance",
      url: "https://www.tdi.texas.gov"
    },
    identifier: "2629251"
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
      <section
        data-testid="about-page-intro"
        data-agent-context="about-page"
        className="tic-hero relative isolate overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[image:linear-gradient(135deg,var(--color-tic-navy)_0%,var(--color-tic-steel)_60%,var(--color-tic-gray-blue)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage: "url('/brand/dallas-skyline.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            mixBlendMode: "soft-light",
          }}
        />

        <GridContainer as="div" className="pt-10 pb-20">
          <div className="col-span-12 md:col-span-2">
            <Link
              href="/"
              className="tap-target text-meta uppercase tracking-[0.16em] text-[color:var(--color-tic-cream)]/85 hover:text-[color:var(--color-tic-orange)]"
            >
              &larr; Volver a inicio
            </Link>
          </div>

          <div className="col-span-12 md:col-start-2 md:col-span-7 pt-10">
            <p className="text-meta uppercase tracking-[0.18em] text-[color:var(--color-tic-orange)] mb-5">
              Conoce a Tatiana Castañeda
            </p>
            <h1
              className="text-display tracking-[-0.055em] text-[color:var(--color-tic-cream)]"
              style={{ fontFamily: "var(--font-tic-headline)" }}
            >
              Claridad bilingüe para proteger a tu familia.
            </h1>
            <p
              className="mt-8 text-xl leading-relaxed text-[color:var(--color-tic-cream)]/90 max-w-xl"
              style={{ fontFamily: "var(--font-tic-body)" }}
            >
              Soy <strong>Tatiana Castañeda</strong>. Ayudo a familias hispanas en Texas a entender sus seguros sin miedo y a elegir el que de verdad las protege — en español o en inglés, paso a paso, sin letras chicas.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center justify-center px-7 py-4 text-meta uppercase tracking-[0.12em] font-semibold transition-colors"
                style={{
                  background: "var(--color-tic-orange)",
                  color: "var(--color-tic-navy)",
                }}
              >
                Escríbeme por WhatsApp &rarr;
              </a>
              <Link
                href="/cotizar"
                className="tap-target inline-flex items-center justify-center px-7 py-4 text-meta uppercase tracking-[0.12em] font-semibold border transition-colors"
                style={{
                  borderColor: "var(--color-tic-cream)",
                  color: "var(--color-tic-cream)",
                }}
              >
                Cotiza ahora &rarr;
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-start-9 md:col-span-4 pt-10 md:pt-0 md:self-end">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden border-2"
              style={{ borderColor: "var(--color-tic-cream)" }}
            >
              <Image
                src="/brand/tatiana-portrait.png"
                alt="Tatiana Castañeda, agente bilingüe de seguros en Texas"
                fill
                priority
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <p
              className="mt-3 text-xs uppercase tracking-[0.2em] text-[color:var(--color-tic-cream)]/70"
              style={{ fontFamily: "var(--font-tic-body)" }}
            >
              Lewisville · Dallas · Fort Worth · Texas
            </p>
          </div>
        </GridContainer>
      </section>

      <Philosophy />

      <AboutContent />
    </div>
  );
}
