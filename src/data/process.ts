export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Agenda tu llamada gratuita",
    description:
      "Definimos objetivos, prioridades y el contexto familiar para iniciar la asesoría.",
  },
  {
    number: "02",
    title: "Evaluamos tu situación",
    description:
      "Revisamos etapa de vida, presupuesto, riesgos y coberturas actuales para detectar brechas.",
  },
  {
    number: "03",
    title: "Diseñamos tu estrategia",
    description:
      "Construimos una combinación de salud, vida y gastos finales alineada a tus metas.",
  },
  {
    number: "04",
    title: "Implementación y seguimiento",
    description:
      "Te acompañamos en alta, ajustes y renovaciones para mantener tu protección vigente.",
  },
];
