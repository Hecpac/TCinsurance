import { faqItems } from "@/data/faq";

export default function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      {
        "@type": "Question",
        name: "¿Cómo empiezo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Agenda una asesoría breve para definir la mejor ruta de cobertura según tu caso.",
        },
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
