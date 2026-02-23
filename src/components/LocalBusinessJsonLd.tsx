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
  const homePageId = `${siteConfig.seo.siteUrl}/#home`;
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
        openingHours: "Mo-Fr 09:00-18:00",
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
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.brand.name,
        url: siteConfig.seo.siteUrl,
        inLanguage: "es-US",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": homePageId,
        url: siteConfig.seo.siteUrl,
        name: siteConfig.seo.defaultTitle,
        description: siteConfig.seo.defaultDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
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
