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
      "Llevábamos casi un año sin seguro porque cada vez que intentábamos comparar planes nos perdíamos entre deducibles, copagos y redes. Tatiana se sentó con nosotros, nos preguntó a qué doctores iban los niños y qué medicinas tomábamos, y nos armó tres escenarios con costos reales. Elegimos un plan que nos cubre a los cuatro por menos de lo que pensábamos gastar.",
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
      "Como independiente, siempre dejaba el seguro para después. Sabía que lo necesitaba pero no tenía tiempo de investigar, y los formularios en inglés me frenaban. Tatiana me explicó todo en español, comparó opciones para mi presupuesto real y en cinco días ya tenía cobertura activa. Ahora hasta tengo recordatorio para la renovación.",
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
      "Acabábamos de casarnos y la idea de un seguro de vida nos parecía algo para gente mayor. Tatiana nos mostró los números: cuánto debíamos de hipoteca, cuánto necesitaría el otro para vivir seis meses sin ese ingreso. Ahí entendimos que no era un gasto, era proteger lo que estábamos construyendo. Nos diseñó una cobertura que cabe en nuestro presupuesto y que crece con nosotros.",
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
      "Cuando mi papá se enfermó, mi familia no quería hablar de gastos finales. Sentían que era como rendirse. Tatiana lo manejó con mucho respeto; les explicó que no se trataba de eso, sino de que el día que pasara algo, nadie tuviera que pedir prestado ni vender nada. Mi papá firmó tranquilo y hoy mi mamá sabe que esa parte está resuelta.",
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
      "Me daba miedo cambiar de Medicare porque el plan anterior me lo había elegido mi hija y no quería equivocarme. Tatiana revisó mis medicamentos uno por uno, confirmó que mis doctores estuvieran en la red y me explicó en español qué cubría cada parte. Al final me ahorré dinero y no perdí ningún beneficio. Ahora la llamo cada año antes de la renovación.",
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
      "Hablé con tres agentes antes y todos me daban la misma respuesta genérica. Tatiana fue la primera que me pidió mis recibos médicos del último año y me mostró cuánto habría pagado con cada plan. Esa transparencia me convenció. No fue la opción más barata, pero sí la que tenía sentido para mi situación.",
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
