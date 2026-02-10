export interface AboutProfile {
  founder: string;
  role: string;
  intro: string;
  story: string[];
  credentials: string[];
  ctaLabel: string;
  ctaHref: string;
  portrait: {
    src: string;
    alt: string;
  };
}

export const aboutProfile: AboutProfile = {
  founder: "Yuri Tatiana Castañeda Carmona",
  role: "Agente Integral de Seguros de Salud y Vida",
  intro:
    "Crecí viendo cómo las familias de mi comunidad tomaban decisiones de cobertura a ciegas: firmaban documentos que no entendían, pagaban de más por planes que no les servían, o simplemente no se aseguraban porque el proceso les parecía imposible de navegar en otro idioma.",
  story: [
    "Antes de fundar TC Insurance, trabajé en el lado corporativo de la industria. Ahí aprendí cómo funcionan las pólizas por dentro, pero también vi la distancia enorme entre lo que las aseguradoras ofrecen y lo que las familias realmente necesitan. Un día, una señora me pidió ayuda para entender la carta de denegación de un reclamo. Llevaba meses pagando un plan que nunca le iba a cubrir lo que ella creía. Esa conversación me cambió la perspectiva.",
    "Fundé TC Insurance en 2024 con una idea clara: que cada familia pueda sentarse con alguien que hable su idioma, entienda su situación y le explique sus opciones sin letra chica ni presión de venta. No represento a una sola aseguradora; comparo opciones para encontrar lo que tiene sentido para cada caso.",
    "Sé lo que es ser inmigrante, construir desde cero y sentir que el sistema no fue diseñado para ti. Por eso mi trabajo no termina cuando se firma la póliza. Acompaño a mis clientes en renovaciones, cambios de vida y reclamaciones, porque la confianza se construye con tiempo, no con un solo formulario.",
  ],
  credentials: [
    "Licensed Insurance Agent in Texas",
    "Atención bilingüe (Español / Inglés)",
    "Basada en Dallas, TX",
    "Asesoría personalizada 1:1",
  ],
  ctaLabel: "Agenda una conversación conmigo",
  ctaHref: "/#contacto",
  portrait: {
    src: "/tatiana-castaneda-placeholder.jpg",
    alt: "Yuri Tatiana Castañeda Carmona en sesión de asesoría",
  },
};
