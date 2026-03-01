import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HashScroller from "@/components/HashScroller";
import FloatingCTA from "@/components/FloatingCTA";
import Floating3DLogo from "@/components/Floating3DLogo";
import ScrollToTop from "@/components/ScrollToTop";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";
import SkipLink from "@/components/SkipLink";
import {
  GoogleAnalyticsHead,
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
  MetaPixelHead,
  MetaPixelNoScript,
} from "@/components/GoogleTagManager";
import { siteConfig } from "@/config/site";
import { ScrollSnapProvider } from "@/contexts/ScrollSnapContext";
import { Analytics } from "@vercel/analytics/next";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  alternates: {
    canonical: "/",
    languages: {
      "es-US": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    locale: "es_US",
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: "TC Insurance - Asesoría de seguros en Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasGeo =
    Boolean(siteConfig.business.geo.latitude) && Boolean(siteConfig.business.geo.longitude);

  const mainContent = (
    <main
      id="main-content"
      tabIndex={-1}
      data-agent-context="primary-content"
      className="overflow-x-hidden pt-20"
    >
      {children}
    </main>
  );

  return (
    <html lang="es" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <head>
        <GoogleTagManagerHead gtmId={siteConfig.analytics.gtmId} />
        <GoogleAnalyticsHead ga4Id={siteConfig.analytics.ga4Id} />
        <MetaPixelHead pixelId={siteConfig.analytics.metaPixelId} />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content={siteConfig.location.full} />
        {hasGeo ? (
          <>
            <meta
              name="geo.position"
              content={`${siteConfig.business.geo.latitude};${siteConfig.business.geo.longitude}`}
            />
            <meta
              name="ICBM"
              content={`${siteConfig.business.geo.latitude}, ${siteConfig.business.geo.longitude}`}
            />
          </>
        ) : null}
        <LocalBusinessJsonLd />
      </head>
      <body className="bg-swiss-paper text-swiss-black antialiased">
        <ScrollSnapProvider>
          <GoogleTagManagerNoScript gtmId={siteConfig.analytics.gtmId} />
          <MetaPixelNoScript pixelId={siteConfig.analytics.metaPixelId} />
          <SkipLink />
          <Suspense
            fallback={
              <div
                aria-hidden
                className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
              />
            }
          >
            <ScrollProgress />
          </Suspense>
          <Navbar />
          <Suspense fallback={null}>
            <HashScroller />
          </Suspense>
          <SmoothScroll>{mainContent}</SmoothScroll>
          <Suspense
            fallback={
              <div
                aria-hidden
                className="pointer-events-none fixed right-6 bottom-6 h-11 w-44 lg:hidden"
              />
            }
          >
            <FloatingCTA />
          </Suspense>
          <aside aria-label="Utilidades y navegación secundaria">
            <Suspense fallback={null}>
              <Floating3DLogo />
            </Suspense>
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>
            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
          </aside>
        </ScrollSnapProvider>
        <Analytics />
      </body>
    </html>
  );
}
