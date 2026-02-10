export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured?: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  status: "active" | "legacy";
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "gastos-finales-arquitectura-financiera",
    title: "Gastos Finales: La Última Pieza de la Arquitectura Financiera",
    excerpt:
      "El seguro de gastos finales como instrumento de liquidez inmediata para proteger a la familia en el momento más sensible.",
    category: "LEGADO",
    publishedAt: "2026-02-12",
    readTime: "4 MIN",
    author: "Tatiana Castañeda",
    featured: true,
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    featuredImageAlt:
      "Textura de piedra minimalista en blanco y negro con contraste suave",
    content: [
      "### La certeza financiera ante lo inevitable.",
      "A menudo planificamos la acumulación de activos (casa, ahorros, retiro), pero ignoramos la fase de distribución y cierre. El Seguro de Gastos Finales (*Final Expense*) no es simplemente una póliza para cubrir un funeral; es un instrumento de **liquidez inmediata** diseñado para evitar que el duelo emocional se convierta en una crisis económica para su familia.",
      "En Texas, el costo promedio de un servicio funerario completo oscila entre $7,000 y $12,000, sin incluir gastos legales o médicos pendientes. Sin una estrategia, estos costos recaen directamente sobre los ahorros de sus beneficiarios o, peor aún, se convierten en deuda.",
      "#### 1. Velocidad vs. Burocracia",
      "La ventaja técnica del seguro de gastos finales es su accesibilidad. A diferencia de las herencias o cuentas bancarias que pueden congelarse durante el proceso de sucesión (*probate*), esta póliza paga directamente al beneficiario, generalmente en cuestión de días. Es **dinero disponible** cuando más se necesita.",
      "#### 2. Protección contra la Inflación",
      "Los costos de servicios médicos y funerarios han superado consistentemente la inflación general en la última década. Al adquirir una póliza hoy, usted \"congela\" el riesgo, garantizando que el beneficio cubra los costos futuros, independientemente de cómo fluctúe el mercado.",
      "#### 3. El Regalo del Duelo Sin Estrés",
      "La verdadera función de este seguro es liberar a su familia.",
      "> *\"La planificación no se trata de predecir el futuro, sino de estar preparado para él.\"*",
      "En **TC Insurance**, diseñamos estas coberturas para que sean sencillas, permanentes y ajustadas a su presupuesto real. No deje cabos sueltos.",
    ],
  },
  {
    slug: "como-elegir-plan-de-salud-en-texas",
    title: "Cómo Elegir un Plan de Salud en Texas sin Perder Cobertura Clave",
    excerpt:
      "Guía práctica para comparar redes, deducibles y topes de gasto con criterio financiero familiar.",
    category: "SALUD",
    publishedAt: "2026-01-29",
    readTime: "5 MIN",
    author: "Tatiana Castañeda",
    status: "active",
    content: [
      "Elegir un plan médico no debería sentirse como una apuesta. El punto de partida es su realidad: frecuencia de consultas, medicamentos recurrentes y hospitales de preferencia.",
      "En la práctica, dos pólizas con prima similar pueden generar costos anuales muy distintos por deducibles, coinsurance y límites de red.",
      "Nuestro método compara tres escenarios de uso (bajo, medio y alto) para identificar el costo total esperado y evitar decisiones basadas solo en la prima mensual.",
    ],
  },
  {
    slug: "seguro-de-vida-liquidez-familiar",
    title: "Seguro de Vida: Liquidez Inmediata para la Estabilidad Familiar",
    excerpt:
      "Cómo estructurar un seguro de vida que proteja ingresos y compromisos clave del hogar.",
    category: "VIDA",
    publishedAt: "2026-01-15",
    readTime: "6 MIN",
    author: "Tatiana Castañeda",
    status: "active",
    content: [
      "Una póliza de vida bien diseñada ofrece liquidez cuando el hogar más la necesita, permitiendo cubrir hipoteca, educación y gastos corrientes sin desestabilizar el patrimonio.",
      "El monto ideal no se define por una regla genérica. Se calcula según obligaciones, horizonte de dependencia y nivel de ingreso que la familia necesita mantener.",
      "La revisión anual es clave: cambios de empleo, nacimiento de hijos o nuevas deudas deben reflejarse en la cobertura para evitar brechas de protección.",
    ],
  },
  {
    slug: "duenos-empresa-seguro-d-and-o",
    title: "D&O para Dueños de Empresa: Cobertura Real Frente a Riesgo Reputacional",
    excerpt:
      "Cómo estructurar una póliza D&O para blindar patrimonio personal y continuidad corporativa en entornos de alta exposición pública.",
    category: "CORPORATIVO",
    publishedAt: "2026-01-18",
    readTime: "7 min",
    author: "Thomas Castillo",
    status: "legacy",
    content: [
      "Una póliza D&O bien diseñada no es una pieza jurídica aislada: es una capa de defensa patrimonial que debe alinearse con gobierno corporativo, estructura societaria y exposición mediática.",
      "En estructuras familiares con holdings internacionales, recomendamos mapear primero quién toma decisiones y desde qué jurisdicción. Esa matriz define los límites, exclusiones críticas y cláusulas de defensa inmediata.",
      "El error más frecuente es tratar D&O como una compra anual por precio. En perfiles de alta gama, la prioridad es la velocidad de respuesta en crisis y la coordinación legal-financiera en tiempo real.",
      "Un diseño robusto combina límites escalonados, protección para directores independientes y extensiones para investigaciones regulatorias preliminares. El objetivo no es solo pagar siniestros: es sostener continuidad estratégica.",
    ],
  },
  {
    slug: "ciberriesgo-family-office",
    title: "Ciberriesgo en Family Offices: Del Cumplimiento a la Resiliencia",
    excerpt:
      "La protección cibernética para patrimonios de alta exposición exige cobertura técnica, protocolos de respuesta y disciplina operativa.",
    category: "CORPORATIVO",
    publishedAt: "2025-10-22",
    readTime: "8 min",
    author: "Thomas Castillo",
    status: "legacy",
    content: [
      "La mayoría de pólizas de ciberriesgo fallan en el momento crítico por falta de calibración entre exclusiones técnicas y operación real del family office.",
      "Antes de cotizar, auditamos superficie de ataque, dependencias de terceros y tiempos aceptables de recuperación. Ese diagnóstico define el límite útil y las coberturas prioritarias.",
      "El valor de la póliza aparece cuando el protocolo de respuesta está preintegrado con forense digital, legal y comunicación de crisis. Sin esa coordinación, el impacto reputacional se amplifica.",
    ],
  },
  {
    slug: "seguro-propiedades-prime",
    title: "Propiedades Prime en Múltiples Países: Estandarización sin Perder Cobertura Local",
    excerpt:
      "Centralizar programa global y respetar particularidades regulatorias locales: la tensión clave en real estate internacional.",
    category: "CORPORATIVO",
    publishedAt: "2025-08-11",
    readTime: "5 min",
    author: "Thomas Castillo",
    status: "legacy",
    content: [
      "Cuando una familia posee activos residenciales premium en varias jurisdicciones, la dispersión de pólizas genera huecos de cobertura y complejidad administrativa.",
      "Trabajamos con una arquitectura maestra: lineamientos globales, capas de responsabilidad y adaptación local por activo. El resultado es consistencia operativa y menor fricción en siniestros.",
      "Un programa internacional maduro no solo reduce incertidumbre financiera; también protege tiempos de decisión durante incidentes con impacto patrimonial relevante.",
    ],
  },
  {
    slug: "finma-seguros-internacionales",
    title: "FINMA y Seguros Internacionales: Controles que Evitan Riesgo Regulatorio",
    excerpt:
      "Qué revisar para operar coberturas cross-border con criterio suizo y evitar contingencias de cumplimiento.",
    category: "CORPORATIVO",
    publishedAt: "2025-06-20",
    readTime: "6 min",
    author: "Thomas Castillo",
    status: "legacy",
    content: [
      "Las estructuras internacionales requieren disciplina documental y claridad sobre la localización del riesgo. FINMA exige trazabilidad, no improvisación.",
      "Un programa sólido define responsabilidades por jurisdicción, políticas de underwriting y protocolos de reporte. Esa gobernanza protege tanto a la firma como a la familia asegurada.",
      "Nuestra recomendación: revisar anualmente consistencia regulatoria y supuestos de residencia fiscal. Los cambios de contexto suelen ser el origen de contingencias evitables.",
    ],
  },
];

export const activePosts = blogPosts.filter((post) => post.status === "active");

export const featuredPost =
  activePosts.find((post) => post.featured) ?? activePosts[0] ?? blogPosts[0];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDateShort(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(new Date(`${date}T12:00:00`))
    .replace(/\./g, "")
    .toLowerCase();
}

export function getVisiblePosts() {
  return activePosts;
}

export function getLatestPosts(limit = 4) {
  const byNewest = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const activeNewest = byNewest.filter((post) => post.status === "active");
  if (activeNewest.length >= limit) {
    return activeNewest.slice(0, limit);
  }

  const legacyNewest = byNewest.filter((post) => post.status === "legacy");
  return [...activeNewest, ...legacyNewest].slice(0, limit);
}

export function getCategories(): string[] {
  const cats = new Set(activePosts.map((p) => p.category));
  return Array.from(cats).sort();
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const sameCategory = activePosts.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = activePosts.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const sorted = [...activePosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const idx = sorted.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  return {
    prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    next: idx > 0 ? sorted[idx - 1] : null,
  };
}
