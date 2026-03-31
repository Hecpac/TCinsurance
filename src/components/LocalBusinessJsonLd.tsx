import { siteConfig } from "@/config/site";

export default function LocalBusinessJsonLd() {
  const sameAs = Array.from(
    new Set(
      [
        ...siteConfig.business.sameAs,
        siteConfig.social.instagramUrl,
        siteConfig.social.facebookUrl,
        siteConfig.social.linkedinUrl,
      ].filter((url): url is string => Boolean(url))
    )
  );

  const organizationId = `${siteConfig.seo.siteUrl}/#organization`;
  const websiteId = `${siteConfig.seo.siteUrl}/#website`;
  const hasGeo =
    Boolean(siteConfig.business.geo.latitude) && Boolean(siteConfig.business.geo.longitude);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": siteConfig.business.type,
        "@id": organizationId,
        name: siteConfig.business.name,
        url: siteConfig.seo.siteUrl,
        description: siteConfig.seo.defaultDescription,
        telephone: siteConfig.contact.phoneHref,
        email: siteConfig.contact.email,
        areaServed: [
          { "@type": "City", name: "Dallas" },
          { "@type": "City", name: "Fort Worth" },
          { "@type": "City", name: "Lewisville" },
          { "@type": "City", name: "Irving" },
          { "@type": "City", name: "Denton" }
        ],
        founder: {
          "@type": "Person",
          name: "Tatiana Castañeda"
        },
        foundingDate: "2020",
        availableLanguage: ["Spanish", "English"],
        image: `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultOgImage}`,
        logo: `${siteConfig.seo.siteUrl}${siteConfig.brand.logoPath}`,
        priceRange: "$$",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        address: {
          "@type": "PostalAddress",
          ...siteConfig.business.address,
        },
        ...(hasGeo
          ? {
              geo: {
                "@type": "GeoCoordinates",
                latitude: Number(siteConfig.business.geo.latitude),
                longitude: Number(siteConfig.business.geo.longitude),
              },
            }
          : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de Seguros",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro de Salud ACA" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro de Vida" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro de Gastos Finales" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medicare" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro Dental" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro de Visión" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguro de Indemnización" } },
          ],
        },
        serviceArea: {
          "@type": "AdministrativeArea",
          name: "Dallas-Fort Worth Metroplex, Texas",
        },
        sameAs,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "6",
          bestRating: "5",
          worstRating: "1",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          recognizedBy: {
            "@type": "Organization",
            name: "Texas Department of Insurance",
            url: "https://www.tdi.texas.gov",
          },
          identifier: "2629251",
        },
        identifier: {
          "@type": "PropertyValue",
          name: "NPN",
          value: "19630324",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.brand.name,
        url: siteConfig.seo.siteUrl,
        inLanguage: "es-US",
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
