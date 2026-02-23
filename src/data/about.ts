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
  role: "Agente Integral de Seguros de Salud y Vida",
  intro:
    "Sé lo importante que es proteger lo que más amas. Por eso, en TCInsurance Agency Services LLC, más que vender seguros, mi misión es brindarte tranquilidad, claridad y confianza desde el primer momento.",
  story: [
    "Trabajo con el corazón y con un enfoque profundamente humano. Soy una agente cercana y comprometida con cada cliente: me gusta escucharte, entender tus necesidades y explicarte cada detalle con paciencia —incluyendo la letra pequeña— porque la confianza se construye con honestidad y transparencia.",
    "Para mí no eres un número, eres una familia con metas, retos y sueños que merece sentirse segura y respaldada. Te acompaño para que tomes decisiones informadas, comparando opciones con claridad y eligiendo la cobertura que realmente proteja tu presente y tu futuro.",
    "Si estás buscando una agente que te trate con respeto, claridad y dedicación genuina, aquí estoy para servirte. Quiero ser tu agente de confianza hoy y siempre.",
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
