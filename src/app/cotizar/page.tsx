import type { Metadata } from "next";
import CotizarFlow from "@/components/CotizarFlow";

export const metadata: Metadata = {
  title: "Cotiza tu seguro en minutos | TIC Insurance",
  description:
    "Cotizador bilingüe de TIC Insurance. Responde unas preguntas y recibe una recomendación clara para salud, vida, gastos finales, Medicare o dental/visión.",
  alternates: {
    canonical: "/cotizar",
  },
};

export default function CotizarPage() {
  return (
    <main
      id="cotizar"
      className="min-h-[calc(100vh-5rem)] bg-swiss-paper px-6 py-10 md:px-10 md:py-16"
      data-agent-context="quote-flow"
    >
      <div className="mx-auto w-full max-w-[640px]">
        <CotizarFlow />
      </div>
    </main>
  );
}
