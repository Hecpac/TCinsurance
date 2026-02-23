import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Términos de Uso | ${siteConfig.brand.name}`,
  description:
    "Términos de uso y alcance informativo de los servicios de asesoría en seguros de TC Insurance, LLC.",
  alternates: {
    canonical: `${siteConfig.seo.siteUrl}/terminos`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <GridContainer
        as="section"
        data-testid="terms-page"
        data-agent-context="legal-terms"
        className="pt-10 pb-24"
      >
        <div className="col-span-12 md:col-span-2">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            Volver a inicio &rarr;
          </Link>
        </div>

        <div className="col-span-12 md:col-start-3 md:col-span-8 pt-8">
          <h1 className="text-headline md:text-[clamp(2.6rem,5vw,4.4rem)] text-swiss-black">
            Términos de Uso
          </h1>
          <p className="text-meta text-swiss-gray mt-6">
            Vigencia: {siteConfig.legal.effectiveDate}
          </p>
        </div>

        <div className="col-span-12 md:col-start-3 md:col-span-7 border-t border-swiss-black/20 mt-10 pt-10 space-y-7">
          <p className="text-body text-swiss-black/90">
            La información publicada por {siteConfig.brand.name} tiene carácter
            informativo y no constituye asesoría legal, fiscal o contable.
            Cualquier recomendación de seguros debe evaluarse según su contexto
            personal y las condiciones de la póliza aplicable.
          </p>
          <p className="text-body text-swiss-black/90">
            Las coberturas, primas y beneficios están sujetas a suscripción del
            carrier, disponibilidad por estado y revisión de elegibilidad.
            Ninguna propuesta se considera vinculante hasta la emisión formal de
            la póliza correspondiente.
          </p>
          <p className="text-body text-swiss-black/90">
            Para dudas sobre estos términos, puede contactarnos en{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-swiss-black underline decoration-swiss-red/50 underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>{" "}
            o por teléfono al {siteConfig.contact.phoneDisplay}.
          </p>
        </div>
      </GridContainer>
    </div>
  );
}
