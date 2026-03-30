import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-dental-texas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Cotiza Seguro Dental en Texas | DHMO y PPO — TC Insurance",
  description: "Compara planes dentales DHMO y PPO en Texas desde $15/mes. Limpiezas, tratamientos y ortodoncia con asesoría gratuita en español.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Cotiza Seguro Dental en Texas | DHMO y PPO — TC Insurance",
    description: "Compara planes dentales DHMO y PPO en Texas desde $15/mes. Limpiezas, tratamientos y ortodoncia con asesoría gratuita en español.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/health-plan-texas.jpg", width: 1200, height: 630, alt: "Cotiza seguro dental en Texas con TC Insurance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotiza Seguro Dental en Texas | DHMO y PPO — TC Insurance",
    description: "Compara planes dentales DHMO y PPO en Texas desde $15/mes. Limpiezas, tratamientos y ortodoncia con asesoría gratuita en español.",
    images: ["/blog/editorial-v3/health-plan-texas.jpg"],
  },
};

const faqItems = [
  {
    question: "¿El seguro dental cubre limpiezas y revisiones?",
    answer: "Sí. La mayoría de los planes dentales en Texas cubren dos limpiezas al año, exámenes de rutina y radiografías al 100% sin costo adicional. Es la categoría 'preventiva' de la estructura 100-80-50 que usan casi todos los planes PPO.",
  },
  {
    question: "¿Qué debo revisar antes de contratar un seguro dental en Texas?",
    answer: "Cuatro cosas clave: que tu dentista actual esté en la red del plan, los períodos de espera para tratamientos mayores (coronas, conductos), el tope máximo anual de cobertura (generalmente $1,000–$2,000) y los copagos por procedimiento. Un agente puede comparar estos factores entre planes para tu caso específico.",
  },
  {
    question: "¿Conviene el seguro dental para niños en Texas?",
    answer: "Es una de las coberturas con mejor retorno para familias con hijos. Los niños necesitan controles dentales frecuentes, selladores, fluoruro y eventualmente ortodoncia. Sin seguro, solo la ortodoncia puede costar entre $3,000 y $7,000. También puedes evaluar si CHIP cubre las necesidades dentales de tus hijos a menor costo.",
  },
  {
    question: "¿Puedo usar el seguro dental de inmediato?",
    answer: "Los servicios preventivos (limpiezas, exámenes) generalmente se pueden usar desde el primer día. Para procedimientos básicos como empastes suele haber un período de espera de 3 a 6 meses, y para tratamientos mayores (coronas, conductos, prótesis) la espera puede ser de 6 a 12 meses. Si necesitas tratamiento urgente, te buscamos planes con esperas reducidas.",
  },
  {
    question: "¿DHMO o PPO: cuál me conviene más?",
    answer: "Si tu prioridad es pagar lo mínimo y no te importa elegir de una lista de dentistas asignados, DHMO es más económico ($15–$25/mes). Si prefieres libertad para ir a cualquier dentista y tu presupuesto lo permite, PPO ($30–$50/mes) te da más flexibilidad. Un agente puede verificar si tu dentista actual está en cada red antes de que decidas.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro Dental en Texas", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro Dental en Texas",
  areaServed: [
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
    { "@type": "City", name: "Lewisville" },
  ],
  provider: {
    "@type": "InsuranceAgency",
    name: siteConfig.brand.name,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.streetAddress,
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressRegion,
      postalCode: siteConfig.business.address.postalCode,
    },
    availableLanguage: ["Spanish", "English"],
  },
  url: PAGE_URL,
  inLanguage: "es",
  description: "Asesoría para elegir seguro dental en Texas: limpiezas, revisiones y tratamientos con cobertura útil para adultos y niños.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function ServiceLandingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <GridContainer as="section" className="pt-10 pb-20">
        <div className="col-span-12 md:col-span-2">
          <Link href="/servicios" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">&larr; Volver a servicios</Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <p className="text-meta uppercase tracking-[0.16em] text-swiss-gray">Servicio especializado</p>
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Cobertura Dental Preventiva y Correctiva al Mejor Precio</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Comparamos planes dentales para que tu familia tenga prevención y tratamiento con costos más previsibles.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es y por qué lo necesitas?</h2>
          <p>
            Ignorar la salud bucal en Texas es un riesgo que puede salirte muy caro. Desde empastes simples que superan los $200 hasta coronas o tratamientos de conducto (root canals) que pueden rebasar los $1,500, no tener cobertura dental expone tus finanzas a golpes inesperados.
          </p>
          <p>
            En TC Insurance, te ayudamos a encontrar un seguro dental que se ajuste a tus necesidades preventivas y correctivas. Te explicamos en español cómo funcionan los períodos de espera, las redes de dentistas y los topes anuales para que no te lleves sorpresas en el consultorio.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">Costos y Redes Dentales (DHMO vs DPPO)</h2>
          <p>
            El costo de un seguro dental individual en Texas suele ser accesible (entre $15 y $50 al mes), pero lo importante es entender cómo funciona la red:
          </p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>DHMO (Dental Health Maintenance Organization):</strong> Primas bajas (a menudo $15–$25). Requieren que elijas un dentista primario asignado. No tienen deducibles ni topes anuales, pagas un copago fijo predecible. No cubren nada fuera de la red.</li>
            <li><strong>DPPO (Dental Preferred Provider Organization):</strong> Son los más comunes. Tienen primas mayores ($30–$50+). Te dan libertad de ir a cualquier dentista del país. Operan con deducibles ($50) y un límite máximo anual de cobertura (ej. $1,500).</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">La Estructura 100-80-50</h2>
          <p>La inmensa mayoría de los planes PPO siguen esta regla de cobertura (después del deducible):</p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>100% (Preventivo):</strong> Limpiezas (usualmente 2 anuales), exámenes rutinarios y radiografías cubiertas al 100% (tú pagas $0).</li>
            <li><strong>80% (Básicos):</strong> Empastes de caries y extracciones simples. El seguro paga el 80% y tú el 20% del costo negociado.</li>
            <li><strong>50% (Mayores):</strong> Tratamientos de conducto, coronas, implantes y prótesis. Tú pagas la mitad (50%). A menudo requieren pasar un &quot;período de espera&quot; de 6 a 12 meses.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Nuestro proceso de asesoría</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Urgencia del tratamiento:</strong> Si tienes dolor y necesitas trabajo mayor ahora, te buscamos planes con períodos de espera reducidos o inexistentes.</span></li>
            <li><span className="font-normal"><strong>Preferencia de Dentista:</strong> Revisamos si tu dentista actual participa en la red DHMO o si necesitas un plan DPPO para seguir atendiéndote allí.</span></li>
            <li><span className="font-normal"><strong>Proyección Financiera:</strong> Filtramos pólizas que tengan límites máximos anuales acordes a la cantidad de trabajo dental que sabes que necesitas este año.</span></li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="border border-swiss-black/15 p-5">
                <h3 className="font-semibold text-swiss-black">{item.question}</h3>
                <p className="mt-2 text-swiss-black/80">{item.answer}</p>
              </article>
            ))}
          </div>

          <h2 className="text-headline text-swiss-black mt-10">Coberturas relacionadas</h2>
          <ul className="space-y-3 text-body text-swiss-gray">
            <li>
              <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-vision-texas">
                Seguro de Visión en Texas &rarr;
              </Link>
              <p className="text-sm text-swiss-gray/70 mt-1">Combina dental + visión para mayor ahorro familiar.</p>
            </li>
            <li>
              <Link className="tap-target hover:text-swiss-red-ink" href="/servicios/seguro-salud-texas">
                Seguro de Salud en Texas &rarr;
              </Link>
              <p className="text-sm text-swiss-gray/70 mt-1">Muchos planes ACA ya incluyen dental preventivo para niños.</p>
            </li>
          </ul>
        </section>

        <section className="col-span-12 md:col-start-8 md:col-span-5 pt-10">
          <div className="border border-swiss-black/15 p-6 space-y-4">
            <p className="text-meta uppercase tracking-[0.12em] text-swiss-gray">Siguiente paso</p>
            <h2 className="text-headline text-swiss-black">Agenda tu asesoría</h2>
            <p className="text-body text-swiss-black/80">En 15 minutos revisamos tu caso y te damos una recomendación clara en español.</p>
            <Link href={HOME_SECTION_PATHS.contact} className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
              Consulta gratis &rarr;
            </Link>
          </div>
        </section>
      </GridContainer>
    </div>
  );
}
