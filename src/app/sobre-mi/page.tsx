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
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <GridContainer
        as="section"
        data-testid="about-page-intro"
        data-agent-context="about-page"
        className="pt-10"
      >
        <div className="col-span-12 md:col-span-2">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            Volver a inicio &rarr;
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
    </main>
  );
}
