import type { Metadata } from "next";
import Link from "next/link";

import GridContainer from "@/components/GridContainer";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";

const PAGE_PATH = "/servicios/seguro-vida-dallas";
const PAGE_URL = `${siteConfig.seo.siteUrl}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
  description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [{ url: "/blog/editorial-v3/life-insurance-family.jpg", width: 1200, height: 630, alt: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
    description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
    images: ["/blog/editorial-v3/life-insurance-family.jpg"],
  },
};

const processSteps = [
  "Definir objetivo de protección (ingreso, deuda, educación)",
  "Comparar temporal vs. permanente según etapa de vida",
  "Ajustar monto a presupuesto sostenible",
  "Documentar beneficiarios y ruta de activación",
];
const expectedResults = [
  "Protección financiera concreta para tu hogar",
  "Cobertura alineada a tus compromisos reales",
  "Menor riesgo de endeudamiento familiar",
];
const faqItems = [
  {
    question: "¿Temporal o permanente?",
    answer: "Depende de tu objetivo: temporal protege por periodo definido; permanente combina cobertura de largo plazo.",
  },
  {
    question: "¿Cómo defino el monto?",
    answer: "Se calcula según ingresos, deudas y metas familiares prioritarias.",
  },
  {
    question: "¿Puedo contratar si tengo condiciones médicas?",
    answer: "Hay alternativas, pero cambian elegibilidad y costo.",
  },
  {
    question: "¿Qué pasa si cambio de trabajo?",
    answer: "La póliza personal no depende de tu empleador.",
  },
  {
    question: "¿Cuándo revisar la póliza?",
    answer: "Al menos una vez al año o tras cambios familiares importantes.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.seo.siteUrl}/servicios` },
    { "@type": "ListItem", position: 3, name: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español", item: PAGE_URL },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Seguro de Vida en Dallas, Fort Worth y Lewisville, Texas | Asesoría en Español",
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
  description: "Evalúa opciones de seguro de vida en Dallas con enfoque en liquidez, protección de ingresos y estabilidad familiar ante imprevistos.",
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
          <h1 className="text-display tracking-[-0.05em] text-swiss-black mt-4">Asegura el Futuro de tus Seres Queridos con una Póliza a tu Medida</h1>
          <p className="text-body text-swiss-gray mt-8 max-w-3xl">Diseñamos cobertura de vida para que tu familia mantenga estabilidad económica y capacidad de decisión en momentos críticos.</p>
        </div>

        <div className="col-span-12 border-t border-swiss-black/15 mt-10" />

        <section className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-7 text-body text-swiss-black/90">
          <h2 className="text-headline text-swiss-black">¿Qué es y por qué es vital en Texas?</h2>
          <p>
            El seguro de vida en Texas es la herramienta financiera más segura y efectiva para garantizar la estabilidad de tu familia cuando tú ya no estés. Si tienes dependientes, una hipoteca en Dallas o préstamos comerciales, un fallecimiento prematuro puede desencadenar una crisis económica paralizante para tus seres queridos.
          </p>
          <p>
            En TC Insurance, nuestra asesoría en español te guía a través de las opciones de cobertura temporal y permanente, explicando claramente cómo usar pólizas de vida no solo por su beneficio por muerte, sino también como instrumentos de liquidez en vida, gracias a los beneficios en vida (Living Benefits) por enfermedades críticas o terminales.
          </p>

          <h2 className="text-headline text-swiss-black mt-10">Costos y Montos de Cobertura</h2>
          <p>
            El costo mensual de tu seguro de vida depende de la edad de emisión, historial médico, ocupación y tipo de póliza elegida.
          </p>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Pólizas Temporales (Term Life):</strong> Son las más económicas. Para una persona sana de 35 años, una póliza de ,000 por 20 años puede costar entre  y  al mes. Proporcionan la máxima cobertura por el menor costo durante los años de mayor riesgo financiero.</li>
            <li><strong>Pólizas Permanentes (Whole Life / IUL):</strong> Tienen primas sustancialmente más altas (-+ al mes), pero garantizan pago por fallecimiento sin importar cuándo ocurra. Además, acumulan un "valor en efectivo" (cash value) que crece con ventajas fiscales.</li>
            <li><strong>Monto Recomendado:</strong> La regla general es multiplicar tu ingreso anual por 10 a 15 veces, sumando deudas mayores e hipotecas, para calcular el beneficio por muerte necesario.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Tipos de Pólizas (Temporal vs Permanente)</h2>
          <ul className="space-y-2 pl-6 list-disc marker:text-swiss-red">
            <li><strong>Temporal (Term):</strong> Cobertura por un plazo fijo (10, 20, 30 años). Ideal para proteger ingresos mientras crecen los hijos. Si sobrevives el plazo, la cobertura termina.</li>
            <li><strong>Vida Entera (Whole Life):</strong> Cobertura de por vida con primas fijas, pago garantizado y acumulación conservadora de valor en efectivo.</li>
            <li><strong>Universal Indexado (IUL):</strong> Cobertura permanente flexible. Su valor en efectivo crece basado en índices bursátiles (como S&P 500) pero con un piso del 0% para proteger contra caídas del mercado.</li>
            <li><strong>Beneficios en Vida (Living Benefits):</strong> Cláusulas modernas que permiten adelantar dinero en vida si sufres de cáncer, infartos o derrames cerebrales, dándote liquidez urgente.</li>
          </ul>

          <h2 className="text-headline text-swiss-black mt-10">Cómo evaluamos tu necesidad real</h2>
          <ul className="space-y-2 pl-6 list-decimal marker:text-swiss-red font-semibold">
            <li><span className="font-normal"><strong>Análisis de Necesidades (FNA):</strong> Calculamos el capital exacto que requiere tu familia para liquidar hipoteca, deudas y mantener su estilo de vida.</span></li>
            <li><span className="font-normal"><strong>Horizonte de Tiempo:</strong> Definimos si requieres protección estrictamente temporal o una estrategia de acumulación patrimonial permanente.</span></li>
            <li><span className="font-normal"><strong>Filtrado Médico:</strong> Cotejamos tu salud con las guías de evaluación médica de múltiples aseguradoras para asegurar que obtengas la mejor calificación y precio posible.</span></li>
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

          <div className="border-t border-swiss-black/15 pt-8 space-y-4">
            <Link href="/blog/seguro-de-vida-liquidez-familiar" className="tap-target inline-flex items-center gap-2 text-swiss-black hover:text-swiss-red-ink">
              Leer guía relacionada del blog &rarr;
            </Link>
          </div>
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
