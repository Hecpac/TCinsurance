import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import Services from "@/components/Services";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Servicios | ${siteConfig.brand.name}`,
  description:
    "Catálogo técnico de coberturas: salud, vida, gastos finales, dental, Medicare, visión y pólizas de indemnización.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
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
            Servicios
            <br />
            especializados.
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Diseñamos combinaciones de cobertura según etapa de vida, presupuesto
          y perfil de riesgo familiar.
        </p>

        <div className="col-span-12 border-t border-swiss-black/20" />
      </GridContainer>

      <Services />

      <GridContainer as="section" className="pb-24">
        <div className="col-span-12 md:col-start-8 md:col-span-5 pt-8">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            Solicitar asesoría gratuita &rarr;
          </Link>
        </div>
      </GridContainer>
    </main>
  );
}
