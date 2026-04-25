export const LEGAL_PATHS = {
  privacy: "/privacidad",
  terms: "/terminos",
} as const;

export const HOME_SECTION_PATHS = {
  services: "/#servicios",
  about: "/sobre-mi",
  blog: "/blog",
  process: "/#como-funciona",
  contact: "/#contacto",
  contactLegacy: "/#asesoria",
} as const;

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return "https://www.tcinsurancetx.com";
  }

  const sanitized = value.replace(/\/$/, "");

  // Failsafe for legacy domain values still present in old envs.
  if (sanitized.includes("tcinsurance-llc.com")) {
    return "https://www.tcinsurancetx.com";
  }

  return sanitized;
}

const SITE_URL = normalizeSiteUrl(RAW_SITE_URL);
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-XXXXXXXXXX";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? null;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "000000000000000";
const CONTACT_PHONE_E164 = process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 ?? "+12039932369";
const CONTACT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY ?? "+1 (203) 993-2369";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "12039932369";
const WHATSAPP_TEXT = encodeURIComponent(
  "Hola TIC Insurance, quiero agendar una asesoría gratuita."
);
const BUSINESS_STREET_ADDRESS =
  process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS ??
  "883 Union Station Parkway Apt 20212";
const BUSINESS_CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY ?? "Lewisville";
const BUSINESS_POSTAL_CODE = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE ?? "75057";
const MAPS_EMBED_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
  "https://www.google.com/maps?q=883+Union+Station+Parkway+Apt+20212,+Lewisville,+TX+75057&output=embed";

function optionalUrl(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export const siteConfig = {
  brand: {
    name: "TIC Insurance Agency Services, LLC",
    footerName: "TIC INSURANCE",
    logoPath: "/tc-logo-clean-cropped.png",
    logoWidth: 205,
    logoHeight: 139,
  },
  video: {
    hero: {
      desktopSrc: "/video/hero-video-desktop.mp4",
      mobileSrc: "/video/hero-video-mobile.mp4",
      posterImage: "/hero-portrait.jpg",
    },
  },
  founder: "Tatiana Castañeda",
  location: {
    short: "LEWISVILLE, TX",
    full: "883 Union Station Parkway Apt 20212, Lewisville, TX 75057",
  },
  contact: {
    email: "tcinsurance85@gmail.com",
    phoneHref: CONTACT_PHONE_E164,
    phoneDisplay: CONTACT_PHONE_DISPLAY,
    whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
  },
  legal: {
    licenseStatement:
      "TIC Insurance Agency Services, LLC is a licensed insurance agency in the state of Texas.",
    effectiveDate: "8 de febrero de 2026",
  },
  social: {
    instagramUrl:
      (optionalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ??
        "https://www.instagram.com/tcinsurance1") as string | null,
    facebookUrl:
      (optionalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL) ??
        "https://www.facebook.com/TatianaCastanedaSeguros") as string | null,
    linkedinUrl: optionalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL) as string | null,
  },
  analytics: {
    gtmId: GTM_ID,
    ga4Id: GA4_ID,
    metaPixelId: META_PIXEL_ID,
    googleAdsId: GOOGLE_ADS_ID,
  },
  seo: {
    siteUrl: SITE_URL,
    defaultTitle:
      "Seguros de Salud, Vida y Gastos Finales en Texas | TC Insurance",
    defaultDescription:
      "Asesoría bilingüe en seguros de salud, vida y gastos finales para familias y dueños de negocio en Texas. Comparamos planes y guiamos paso a paso con claridad.",
    defaultOgImage: "/og-tc-insurance.jpg",
  },
  business: {
    name: "TIC Insurance Agency Services, LLC",
    type: "InsuranceAgency",
    address: {
      streetAddress: BUSINESS_STREET_ADDRESS,
      addressLocality: BUSINESS_CITY,
      addressRegion: "TX",
      postalCode: BUSINESS_POSTAL_CODE,
      addressCountry: "US",
    },
    areaServed: "Texas, USA",
    geo: {
      latitude: process.env.NEXT_PUBLIC_GEO_LAT ?? "33.0072796",
      longitude: process.env.NEXT_PUBLIC_GEO_LNG ?? "-96.9622064",
    },
    maps: {
      embedUrl: MAPS_EMBED_URL,
    },
    sameAs: [
      (optionalUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "https://www.instagram.com/tcinsurance1"),
      (optionalUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL) ?? "https://www.facebook.com/TatianaCastanedaSeguros"),
      optionalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
      "https://www.google.com/maps/place/?q=place_id:ChIJ-St2_0kvTIYR_PWr32g7d6A",
    ].filter(Boolean) as string[],
  },
} as const;
