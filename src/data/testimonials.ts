export interface Testimonial {
  quote: string;
  name: string;
  context: string;
  profile?: string;
  photo: string | null;
  photoAlt: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: string;
  city: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tatiana explicó cada opción con claridad y nos ayudó a elegir una cobertura realista para nuestra familia.",
    name: "Mariela R.",
    context: "Familia en Lewisville",
    profile: "Familia de 4",
    photo: null,
    photoAlt: "Mariela R.",
    rating: 5,
    service: "Seguro de Salud",
    city: "Lewisville",
  },
  {
    quote:
      "En menos de una semana resolvimos nuestro plan de salud y quedamos con seguimiento para cualquier cambio.",
    name: "Carlos M.",
    context: "Cliente en Dallas",
    profile: "Emprendedor",
    photo: null,
    photoAlt: "Carlos M.",
    rating: 5,
    service: "Seguro de Salud",
    city: "Dallas",
  },
  {
    quote:
      "Lo mejor fue el acompañamiento. No solo vendió una póliza, nos ayudó a entender el por qué de cada decisión.",
    name: "Andrea L.",
    context: "Cliente en Denton County",
    profile: "Pareja joven",
    photo: null,
    photoAlt: "Andrea L.",
    rating: 5,
    service: "Seguro de Vida",
    city: "Denton",
  },
  {
    quote:
      "Necesitábamos gastos finales para mis padres y el proceso fue rápido, claro y sin presión.",
    name: "Luis F.",
    context: "Familia en Fort Worth",
    profile: "Adultos mayores",
    photo: null,
    photoAlt: "Luis F.",
    rating: 5,
    service: "Gastos Finales",
    city: "Fort Worth",
  },
  {
    quote:
      "El servicio fue excepcional. Tatiana nos guió paso a paso y respondió todas nuestras preguntas con paciencia.",
    name: "Rosa G.",
    context: "Cliente en Irving",
    profile: "Jubilada",
    photo: null,
    photoAlt: "Rosa G.",
    rating: 5,
    service: "Medicare",
    city: "Irving",
  },
  {
    quote:
      "Comparé varias opciones y TC Insurance fue la más transparente y profesional. Totalmente recomendado.",
    name: "Miguel A.",
    context: "Cliente en Plano",
    profile: "Trabajador independiente",
    photo: null,
    photoAlt: "Miguel A.",
    rating: 4,
    service: "Seguro de Salud",
    city: "Plano",
  },
];
