import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Política de Privacidad | ${siteConfig.brand.name}`,
  description:
    "Política de privacidad de TC Insurance, LLC para el tratamiento de datos personales en Texas, Estados Unidos.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <GridContainer
        as="section"
        data-testid="privacy-page"
        data-agent-context="legal-privacy"
        className="pt-10 pb-24"
      >
        <div className="col-span-12 md:col-span-2">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            Volver a inicio &rarr;
          </Link>
        </div>

        <div className="col-span-12 md:col-start-3 md:col-span-8 pt-8">
          <h1 className="text-headline md:text-[clamp(2.6rem,5vw,4.4rem)] text-swiss-black">
            Política de Privacidad
          </h1>
          <p className="text-meta text-swiss-gray mt-6">
            Vigencia: {siteConfig.legal.effectiveDate}
          </p>
        </div>

        <div className="col-span-12 md:col-start-3 md:col-span-7 border-t border-swiss-black/20 mt-10 pt-10 space-y-7">
          <p className="text-body text-swiss-black/90">
            En {siteConfig.brand.name}, protegemos la confidencialidad de los
            datos que comparte durante nuestras asesorías. Solo recopilamos la
            información necesaria para evaluar opciones de seguros y brindar
            recomendaciones adecuadas a su perfil.
          </p>
          <p className="text-body text-swiss-black/90">
            No vendemos información personal a terceros. Podemos compartir datos
            exclusivamente con carriers aseguradores y proveedores involucrados
            en el proceso de cotización o emisión de pólizas, bajo obligaciones
            de confidencialidad y cumplimiento normativo.
          </p>
          <p className="text-body text-swiss-black/90">
            Usted puede solicitar acceso, corrección o eliminación de su
            información, sujeto a los requisitos legales aplicables. Para
            ejercer estos derechos, escríbanos a{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-swiss-black underline decoration-swiss-red/50 underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </div>
      </GridContainer>
    </main>
  );
}
