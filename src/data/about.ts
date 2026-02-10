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
    "Trabajo con familias de Dallas y de todo Texas para diseñar estrategias de salud, vida y gastos finales con claridad, cercanía y respaldo profesional.",
  story: [
    "Inicié TC Insurance con una convicción simple: cada familia merece entender su cobertura sin tecnicismos innecesarios.",
    "Mi enfoque combina análisis técnico con acompañamiento humano para que cada decisión de protección tenga sentido hoy y en el largo plazo.",
  ],
  credentials: [
    "Licensed Insurance Agent in Texas",
    "Atención bilingüe (Español / Inglés)",
    "Basada en Dallas, TX",
    "Asesoría personalizada 1:1",
  ],
  ctaLabel: "Conoce más sobre mi enfoque",
  ctaHref: "/#contacto",
  portrait: {
    src: "/tatiana-castaneda-placeholder.jpg",
    alt: "Yuri Tatiana Castañeda Carmona en sesión de asesoría",
  },
};
