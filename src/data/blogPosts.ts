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
    slug: "trabajando-para-tdi-texas-department-of-insurance-gov",
    title: "Trabajando para TDI - Texas Department of Insurance (.gov)",
    excerpt: "Últimas noticias: Trabajando para TDI - Texas Department of Insurance (.gov). Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.",
    category: "NOTICIAS",
    publishedAt: "2025-11-20",
    readTime: "2 MIN",
    author: "Texas Department of Insurance (.gov)",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### Reporte automatizado por nuestro Agente Research",
      "Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.",
      "**Fuente:** Texas Department of Insurance (.gov)",
      "**Fecha de publicación:** jueves, 20 de noviembre de 2025",
      "> [**Lee la noticia completa en su fuente original haciendo clic aquí**](https://news.google.com/rss/articles/CBMib0FVX3lxTE5Ka045QmV2VEhCaGdMWjZMaVg4eWNscWlfX1o3WTNvQWpWU1dOd1hrSW9SekQ5TnhfaTFfNW15ZVh5RG9ibWYyNVN0U080T0s4aXRfUjBYak82TmE4dG5XRWY0c0lhMXhsVWU3VUJZUQ?oc=5)"
    ],
  },
  {
    slug: "texas-tiene-la-tasa-mas-alta-de-personas-sin-seguro-medico",
    title: "Texas tiene la tasa más alta de personas sin seguro médico del país, revela informe - Dallas News",
    excerpt: "Últimas noticias: Texas tiene la tasa más alta de personas sin seguro médico del país, revela informe - Dallas News. Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.",
    category: "NOTICIAS",
    publishedAt: "2025-07-16",
    readTime: "2 MIN",
    author: "Dallas News",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### Reporte automatizado por nuestro Agente Research",
      "Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.",
      "**Fuente:** Dallas News",
      "**Fecha de publicación:** miércoles, 16 de julio de 2025",
      "> [**Lee la noticia completa en su fuente original haciendo clic aquí**](https://news.google.com/rss/articles/CBMipgFBVV95cUxNSjNzSkpuZEFzTXhqZE5zTU54dkRQMktGSkg2QVNKS0RyV1F2QjRobWFGUkRWN3A0YzRkVE5CRlNJWTlsd0YtaE1veEhidHU4QUxtZmZBd1B2bWpYWW9Ea3VLT0oyeXBnTEQ4OU9sR295ZGV6QnRSZ1FwQTgxUDJHaUItRXJibUpxQU0tcGNrNElKUnlFWldrRXpTTi1pbjRMdTNheUlB0gG6AUFVX3lxTFBLamNERzJOSkVfSkh4MnQ0SF9saWlLdVFCSnI2UjFOcXpWNGhyX05OYWRoSGdHel96clhtS2hnUjVPZUhPREtfWVNpZ3RVM1kyRkNVb3lNT2FQaWFqMExVTzRQWi1qWTJzd0hUdXRQRVNCaUwzRzd5WEhCUDJ2SVRfa3hHUm5SSWFYQXhzUmRhVGJiZGRiSVh0SURpbkJUZlBVS1ZpMnVYZlVSYlhXWU92d1FnOVVKaGFJUQ?oc=5)"
    ],
  },
  {
    slug: "por-que-podria-recibir-una-factura-del-medico-despues-de-su-chequeo-anual",
    title: "Por qué podría recibir una factura del médico después de su chequeo anual gratis - Texas Department of Insurance (.gov)",
    excerpt: "Últimas noticias: Por qué podría recibir una factura del médico después de su chequeo anual gratis - Texas Department of Insurance (.gov). Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.",
    category: "NOTICIAS",
    publishedAt: "2025-10-02",
    readTime: "2 MIN",
    author: "Texas Department of Insurance (.gov)",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### Reporte automatizado por nuestro Agente Research",
      "Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.",
      "**Fuente:** Texas Department of Insurance (.gov)",
      "**Fecha de publicación:** jueves, 2 de octubre de 2025",
      "> [**Lee la noticia completa en su fuente original haciendo clic aquí**](https://news.google.com/rss/articles/CBMipAFBVV95cUxNZmRUYm1LMklUc3JMb3NKcjFEUTl3cW4xUGpSYkJ3R0lOQU1hMEVYaTFNa1NaVndSN2pyQ1dYU0pjSzl6eXlPOXAwb2hmRDNXTUlkTVhXcEo0VWFPRlc4LWpPRk1kU05uTng0dkVVRjlncmhEX2wwc3Q2NzZTM0JOVWFMa3RHTUwtVkd0TUtSc0ZBOXNpcmo5aDVjUUg3RGNvN3ByeA?oc=5)"
    ],
  },
  {
    slug: "the-cochrun-group-mas-de-dos-decadas-protegiendo-y-sirviendo",
    title: "The Cochrun Group: más de dos décadas protegiendo y sirviendo - Hola News",
    excerpt: "Últimas noticias: The Cochrun Group: más de dos décadas protegiendo y sirviendo - Hola News. Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.",
    category: "NOTICIAS",
    publishedAt: "2026-02-06",
    readTime: "2 MIN",
    author: "Hola News",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### Reporte automatizado por nuestro Agente Research",
      "Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.",
      "**Fuente:** Hola News",
      "**Fecha de publicación:** viernes, 6 de febrero de 2026",
      "> [**Lee la noticia completa en su fuente original haciendo clic aquí**](https://news.google.com/rss/articles/CBMiigFBVV95cUxOWXNjS0xvaTdWVEttTWRJMHpYRVdTRWhkNk5SeE9lbENPYzN5Yl9US1dpWXBoZkJvN3BhTUJva3IybzN4LUM0SngzYU0tTnMxRzR4Ri02NEdNMEdWeVJjTlpJQ2V3RTNIZm9CZXBQZ2VLNGhUcy0tWExna1F4ZnpHUldvVkRNQmwtTFE?oc=5)"
    ],
  },
  {
    slug: "el-aumento-vertiginoso-de-las-primas-del-obamacare-obliga-a-tomar-decisiones-dificiles",
    title: "El aumento vertiginoso de las primas del Obamacare obliga a los afiliados a tomar decisiones difíciles - CNN en Español",
    excerpt: "Últimas noticias: El aumento vertiginoso de las primas del Obamacare obliga a los afiliados a tomar decisiones difíciles - CNN en Español. Haz clic para leer más sobre este desarrollo importante para el mercado de seguros en Texas.",
    category: "NOTICIAS",
    publishedAt: "2025-11-09",
    readTime: "2 MIN",
    author: "CNN en Español",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### Reporte automatizado por nuestro Agente Research",
      "Esta es una noticia en desarrollo capturada por nuestro sistema de monitoreo en tiempo real sobre el mercado de seguros en Texas.",
      "**Fuente:** CNN en Español",
      "**Fecha de publicación:** domingo, 9 de noviembre de 2025",
      "> [**Lee la noticia completa en su fuente original haciendo clic aquí**](https://news.google.com/rss/articles/CBMijAFBVV95cUxOc29jQjMxMGNBZWZTRE51c25lNUhTdGZJTWVRZ1ZleDdqeFkxMjlvNXMxclRMazk0cGpDTlU4S1pQNzVsdExvbDlzMEo0RTI0SnZ6Mkh3eUFCRlExbWZvSW5WbG85bFpDLVprNlhSeEFtVy1ydTRCc0pIalRaYTB1UWtJYU1KdmFnaXd2MQ?oc=5)"
    ],
  },
  {
    slug: "gastos-finales-arquitectura-financiera",
    title: "Gastos Finales: La Última Pieza de la Arquitectura Financiera",
    excerpt:
      "El seguro de gastos finales en Texas como instrumento de liquidez inmediata para proteger a tu familia en el momento más sensible.",
    category: "LEGADO",
    publishedAt: "2026-02-12",
    readTime: "4 MIN",
    author: "Tatiana Castañeda",
    featured: true,
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    featuredImageAlt:
      "Seguro de gastos finales en Texas: planificación financiera para familias",
    content: [
      "### La certeza financiera ante lo inevitable.",
      "A menudo planificamos la acumulación de activos (casa, ahorros, retiro), pero ignoramos la fase de distribución y cierre. El Seguro de Gastos Finales (*Final Expense*) no es simplemente una póliza para cubrir un funeral; es un instrumento de **liquidez inmediata** diseñado para evitar que el duelo emocional se convierta en una crisis económica para tu familia.",
      "En Texas, el costo promedio de un servicio funerario completo oscila entre $7,000 y $12,000, sin incluir gastos legales o médicos pendientes. Para familias en Dallas, Fort Worth y el resto del estado, sin una estrategia de cobertura estos costos recaen directamente sobre los ahorros de tus beneficiarios o, peor aún, se convierten en deuda.",
      "#### 1. Velocidad vs. Burocracia",
      "La ventaja técnica del seguro de gastos finales es su accesibilidad. A diferencia de las herencias o cuentas bancarias que pueden congelarse durante el proceso de sucesión (*probate*), esta póliza paga directamente al beneficiario, generalmente en cuestión de días. Es **dinero disponible** cuando más se necesita.",
      "#### 2. Protección contra la Inflación",
      "Los costos de servicios médicos y funerarios han superado consistentemente la inflación general en la última década. Al adquirir una póliza hoy, \"congelas\" el riesgo, garantizando que el beneficio cubra los costos futuros, independientemente de cómo fluctúe el mercado.",
      "#### 3. El Regalo del Duelo Sin Estrés",
      "La verdadera función de este seguro es liberar a tu familia.",
      "> *\"La planificación no se trata de predecir el futuro, sino de estar preparado para él.\"*",
      "En **TC Insurance**, diseñamos coberturas de gastos finales en Texas para que sean sencillas, permanentes y ajustadas a tu presupuesto real. No dejes cabos sueltos.",
    ],
  },
  {
    slug: "como-elegir-plan-de-salud-en-texas",
    title: "Cómo Elegir un Plan de Salud en Texas sin Perder Cobertura Clave",
    excerpt:
      "Guía práctica para elegir un seguro de salud en Texas: cómo comparar redes, deducibles y topes de gasto con criterio financiero familiar.",
    category: "SALUD",
    publishedAt: "2026-01-29",
    readTime: "7 MIN",
    author: "Tatiana Castañeda",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### No elijas un plan de salud por la prima. Elige por lo que vas a pagar de verdad.",
      "Elegir un seguro de salud en Texas no debería sentirse como una apuesta. Pero cada año, miles de familias en Dallas, Houston y el resto del estado seleccionan cobertura basándose en un solo número: la prima mensual. Ese enfoque casi siempre termina costando más.",
      "El punto de partida correcto es tu realidad: frecuencia de consultas, medicamentos recurrentes, hospitales y especialistas de preferencia. Una familia con dos hijos pequeños necesita un plan muy diferente al de un trabajador independiente sano de 30 años.",
      "#### 1. Entiende los tres costos que realmente importan",
      "La prima mensual es solo el inicio. Los tres costos que determinan cuánto pagas en un año son:",
      "- **Deducible**: lo que pagas de tu bolsillo antes de que el seguro empiece a cubrir. Puede ir de $0 a $9,000 o más por persona.",
      "- **Coseguro (*coinsurance*)**: el porcentaje que sigues pagando después del deducible. Un plan 80/20 significa que tú cubres el 20% hasta alcanzar el tope.",
      "- **Tope de gasto (*out-of-pocket max*)**: el máximo que pagarás en un año. Después de ese límite, el seguro cubre el 100%. Este es el número más importante si quieres protegerte de un gasto catastrófico.",
      "En la práctica, dos pólizas con prima similar pueden generar costos anuales muy distintos según estos factores.",
      "#### 2. PPO vs. HMO: no es solo cuestión de precio",
      "En Texas encontrarás principalmente dos tipos de red:",
      "- **HMO (Health Maintenance Organization)**: necesitas un médico primario que te refiera a especialistas. Primas más bajas, pero menos flexibilidad. Funciona bien si tu familia usa servicios de rutina y no necesita ver muchos especialistas.",
      "- **PPO (Preferred Provider Organization)**: puedes ver a cualquier especialista sin referencia. Primas más altas, pero acceso más amplio. Ideal si tienes condiciones que requieren múltiples especialistas o si viajas con frecuencia.",
      "El error más común es elegir HMO solo por precio cuando tu familia necesita acceso a especialistas fuera de la red. Eso puede resultar en facturas no cubiertas de miles de dólares.",
      "#### 3. El método de los tres escenarios",
      "En TC Insurance comparamos cada plan en tres escenarios de uso real:",
      "1. **Uso bajo**: solo visitas preventivas anuales y quizás una consulta de urgencia menor. Aquí calculamos prima anual + costos mínimos.",
      "2. **Uso medio**: visitas regulares, un par de recetas mensuales y una visita a urgencias. Sumamos prima + deducible parcial + copagos estimados.",
      "3. **Uso alto**: hospitalización, cirugía o tratamiento continuo. Aquí el cálculo es prima + tope de gasto máximo.",
      "Este análisis revela qué plan realmente te conviene. Un plan con prima baja pero deducible alto puede ser excelente para uso bajo, pero devastador en un año con hospitalización.",
      "#### 4. Verifica tu red antes de firmar",
      "Antes de elegir cualquier plan, confirma que tus médicos actuales, hospitales preferidos y farmacias estén dentro de la red. Un plan económico pierde todo su valor si tu pediatra o tu especialista no lo aceptan.",
      "Consejo práctico: llama al consultorio de tu médico y pregunta directamente si aceptan el plan específico (no solo la aseguradora, sino el plan exacto). Las redes cambian cada año.",
      "#### 5. No ignores los beneficios preventivos",
      "Por ley federal, todos los planes del *Marketplace* cubren servicios preventivos sin costo adicional: vacunas, exámenes de detección, consultas de bienestar. Aprovéchalos. La prevención es la inversión más rentable en salud.",
      "> *\"La mejor póliza es la que cubre lo que tu familia realmente necesita, no la que tiene la prima más baja.\"*",
      "En **TC Insurance**, te ayudamos a comparar planes de salud en Texas con este nivel de detalle para que tu decisión tenga respaldo técnico y sentido financiero. Agenda una asesoría gratuita y revisamos tu situación juntos.",
    ],
  },
  {
    slug: "seguro-de-vida-liquidez-familiar",
    title: "Seguro de Vida: Liquidez Inmediata para la Estabilidad Familiar",
    excerpt:
      "Cómo estructurar un seguro de vida en Texas que proteja ingresos y compromisos clave del hogar.",
    category: "VIDA",
    publishedAt: "2026-01-15",
    readTime: "8 MIN",
    author: "Tatiana Castañeda",
    status: "active",
    featuredImage: "/blog-final-expense-featured.jpg",
    content: [
      "### ¿Qué pasaría con tu familia si mañana no estás?",
      "Es una pregunta que nadie quiere hacer, pero que toda familia responsable necesita responder. El seguro de vida en Texas no es un producto que compras para ti, es una promesa que le haces a las personas que dependen de tu ingreso.",
      "Si tu familia en Dallas, Fort Worth o cualquier ciudad de Texas necesita tu salario para pagar la hipoteca, la escuela de los niños o simplemente las cuentas del mes, entonces necesitas un plan que los proteja. Así de simple.",
      "#### 1. Temporal vs. permanente: cuál necesitas realmente",
      "Existen dos grandes categorías y entender la diferencia te ahorra dinero y confusión:",
      "- **Seguro temporal (*term life*)**: te cubre por un periodo definido (10, 20 o 30 años). Es más económico y funciona muy bien cuando tienes obligaciones con fecha de vencimiento: una hipoteca a 20 años, hijos que estarán en la universidad por 15 años, o una deuda de negocio que termina en 10.",
      "- **Seguro permanente (*whole life* o *universal life*)**: te cubre toda la vida y acumula valor en efectivo. Las primas son más altas, pero la póliza nunca expira. Funciona bien para planificación patrimonial, gastos finales garantizados o como complemento de retiro.",
      "El error más frecuente que veo es comprar una póliza permanente cara cuando lo que la familia realmente necesita es una temporal con mayor cobertura. Mejor tener $500,000 de protección temporal que $50,000 permanente si tu familia depende de tus ingresos ahora.",
      "#### 2. Cómo calcular cuánta cobertura necesitas",
      "La regla general de \"10 veces tu ingreso anual\" es un punto de partida, pero no es precisa para todos. Un cálculo más útil considera:",
      "- **Deudas pendientes**: hipoteca, auto, tarjetas de crédito, préstamos estudiantiles. Suma todo lo que tu familia tendría que seguir pagando.",
      "- **Gastos corrientes**: cuánto necesita tu hogar al mes para vivir. Multiplica por los años hasta que tus hijos sean independientes o tu pareja pueda sostenerse.",
      "- **Educación**: si quieres que tus hijos puedan ir a la universidad, calcula un estimado por hijo.",
      "- **Gastos finales**: funeral, trámites legales y deudas médicas pendientes. Entre $15,000 y $25,000 es un rango realista.",
      "- **Resta lo que ya tienes**: ahorros, inversiones, otros seguros. La diferencia es tu brecha de cobertura.",
      "Por ejemplo: si tu familia necesita $4,000 al mes por 15 años ($720,000) + hipoteca de $180,000 + educación de $60,000 + gastos finales de $20,000 = $980,000. Si tienes $100,000 ahorrados, necesitas al menos $880,000 de cobertura.",
      "#### 3. Factores que afectan tu prima",
      "Cuanto antes contrates, más barato es. Estos factores determinan tu costo:",
      "- **Edad**: cada año cuenta. Una póliza a los 30 puede costar la mitad que a los 40.",
      "- **Salud**: condiciones preexistentes, peso, presión arterial. Algunas aseguradoras piden examen médico, otras no.",
      "- **Tabaquismo**: fumar puede duplicar o triplicar la prima.",
      "- **Ocupación y hobbies**: trabajos de alto riesgo o deportes extremos pueden aumentar el costo.",
      "La buena noticia es que muchas pólizas temporales para personas sanas de 30 a 40 años cuestan menos que una suscripción de streaming. La protección que ofrecen no tiene comparación.",
      "#### 4. Errores que debes evitar",
      "- **Depender solo del seguro del trabajo**: si cambias de empleo, pierdes la cobertura. Y generalmente los montos del empleador (1-2 veces tu salario) son insuficientes.",
      "- **Esperar al \"momento perfecto\"**: la mejor póliza es la que contratas cuando estás sano y joven. Las condiciones de salud futuras pueden encarecerla o hacerla imposible de obtener.",
      "- **No nombrar beneficiarios correctamente**: si tu beneficiario no está actualizado, la póliza podría no llegar a quien quieres. Revísalo cada año.",
      "- **Comprar sin comparar**: las primas varían significativamente entre aseguradoras. Comparar al menos 3 opciones es esencial.",
      "#### 5. La revisión anual que protege a tu familia",
      "Tu vida cambia y tu cobertura debe reflejarlo. Revisa tu póliza cada año o cuando ocurra un cambio importante: nacimiento de un hijo, compra de casa, cambio de empleo, divorcio o nuevas deudas.",
      "Una póliza que era perfecta hace 5 años puede tener brechas hoy. Esa brecha es exactamente lo que puede dejar a tu familia desprotegida.",
      "> *\"Un seguro de vida no es un gasto, es la garantía de que tu familia mantiene su estabilidad cuando más lo necesita.\"*",
      "En **TC Insurance**, analizamos tu situación real para recomendarte la cobertura de seguro de vida justa para familias en Texas: ni de más, ni de menos. Agenda una asesoría gratuita y definimos tu estrategia de protección familiar.",
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
