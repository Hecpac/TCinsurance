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
  founder: "Tatiana Castañeda",
  role: "Agente Licenciada de Seguros de Salud y Vida · Texas",
  intro:
    "Sé lo importante que es proteger lo que más amas. Por eso fundé TC Insurance Agency Services en 2020, con una misión clara: que cada familia latina en Texas pueda tomar decisiones de cobertura con información real, sin presión y en su idioma.",
  story: [
    "Antes de convertirme en agente, vi de cerca lo que pasa cuando una familia enfrenta una emergencia médica o la pérdida de un ser querido sin la protección adecuada.",
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
    src: "/Tatiana.png",
    alt: "Tatiana Castañeda, agente licenciada de seguros de salud y vida en Dallas, Texas",
  },
};
