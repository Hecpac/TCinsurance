export interface InsuranceService {
  number: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  description: string;
  idealFor: string;
  result: string;
  bullets: string[];
  detailPath?: string;
}

export const servicesCatalog: InsuranceService[] = [
  {
    number: "01",
    slug: "salud",
    titleEs: "Seguro de Salud",
    titleEn: "Health Insurance",
    description:
      "Comparamos planes médicos para proteger a tu familia con buena red y costos controlados.",
    idealFor: "Familias y trabajadores independientes",
    result: "Red médica adecuada + costos predecibles",
    bullets: ["Cobertura individual y familiar", "Redes PPO / HMO en Texas"],
    detailPath: "/servicios/seguro-salud-texas",
  },
  {
    number: "02",
    slug: "vida",
    titleEs: "Seguro de Vida",
    titleEn: "Life Insurance",
    description:
      "Diseñamos una protección financiera para que tu familia mantenga estabilidad ante imprevistos.",
    idealFor: "Familias con dependientes y hogares con deudas",
    result: "Liquidez para proteger ingresos y compromisos",
    bullets: ["Opciones temporales y permanentes", "Protección para ingresos y deudas"],
    detailPath: "/servicios/seguro-vida-dallas",
  },
  {
    number: "03",
    slug: "gastos-finales",
    titleEs: "Gastos Finales",
    titleEn: "Final Expense",
    description:
      "Planificamos cobertura para gastos funerarios y trámites urgentes sin carga económica para tu familia.",
    idealFor: "Adultos mayores y planificación familiar",
    result: "Efectivo rápido para gastos y trámites urgentes",
    bullets: ["Beneficio rápido en efectivo", "Ideal para planificación patrimonial"],
    detailPath: "/servicios/seguro-gastos-finales-texas",
  },
  {
    number: "04",
    slug: "dental",
    titleEs: "Seguro Dental",
    titleEn: "Dental Insurance",
    description:
      "Evaluamos planes dentales para prevención y tratamientos con costos predecibles durante todo el año.",
    idealFor: "Familias y prevención anual",
    result: "Costos más controlados en limpiezas y tratamientos",
    bullets: ["Limpiezas y revisiones periódicas", "Cobertura para adultos y niños"],
    detailPath: "/servicios/seguro-dental-texas",
  },
  {
    number: "05",
    slug: "vision",
    titleEs: "Seguro de Visión",
    titleEn: "Vision Insurance",
    description:
      "Te ayudamos a elegir cobertura visual para exámenes, lentes y seguimiento oftalmológico.",
    idealFor: "Adultos y niños que usan lentes",
    result: "Examen anual + beneficios en lentes y armazones",
    bullets: ["Examen visual anual", "Beneficios para lentes y armazones"],
    detailPath: "/servicios/seguro-vision-texas",
  },
  {
    number: "06",
    slug: "medicare",
    titleEs: "Medicare",
    titleEn: "Medicare",
    description:
      "Comparamos Advantage, suplementos y Part D según tus médicos, recetas y presupuesto.",
    idealFor: "Personas 65+ y jubilados",
    result: "Plan alineado a médicos, recetas y presupuesto",
    bullets: ["Evaluación de médicos y medicamentos", "Optimización de costo total mensual"],
    detailPath: "/servicios/medicare-texas",
  },
  {
    number: "07",
    slug: "indemnity",
    titleEs: "Seguro de Indemnización",
    titleEn: "Indemnity",
    description:
      "Sumamos pólizas de apoyo en efectivo para hospitalización o eventos críticos.",
    idealFor: "Quienes quieren un respaldo en efectivo",
    result: "Liquidez para deducibles y gastos imprevistos",
    bullets: ["Complemento de cobertura principal", "Liquidez para deducibles y gastos imprevistos"],
    detailPath: "/servicios/seguro-indemnizacion-texas",
  },
];
