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
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "texas-hb2067-explicaciones-automaticas-seguros-2026",
    title: "Texas HB 2067 (2026): ahora las aseguradoras deben explicar por escrito cancelaciones y no renovaciones",
    excerpt: "Desde 2026, en Texas las aseguradoras de auto y hogar deben explicar por escrito decisiones de declinación, cancelación o no renovación. Qué significa para ti y cómo actuar.",
    category: "NOTICIAS",
    publishedAt: "2026-02-27",
    readTime: "4 MIN",
    author: "TC Insurance Editorial",
    status: "active",
    featuredImage: "/blog/editorial-v3/tdi-texas-capitol.jpg",
    featuredImageAlt: "Capitolio de Texas representando cambios regulatorios en seguros",
    content: [
      "### ¿Qué cambió con HB 2067 en Texas?",
      "Desde 2026, las aseguradoras deben dar explicación escrita cuando declinan, cancelan o no renuevan pólizas de auto y hogar. Antes, en muchos casos, el cliente tenía que pedirla de forma explícita. Este cambio mejora transparencia y permite tomar acción con evidencia.",
      "### ¿Por qué importa para familias y dueños de casa en Texas?",
      "Porque una no renovación puede dejarte con menos opciones, primas más altas o periodos sin cobertura. Entender la causa exacta (riesgo, historial, datos, underwriting) te ayuda a corregirla y proteger tu continuidad de seguro.",
      "### Qué hacer si recibes una no renovación o cancelación",
      "- Guarda el aviso completo y la fecha efectiva.\n- Revisa el motivo exacto por escrito.\n- Verifica datos clave (dirección, historial de reclamos, uso del vehículo/vivienda).\n- Corrige inconsistencias con evidencia documental.\n- Compara alternativas antes del vencimiento para evitar quedarte sin cobertura.",
      "### ¿Y si no te entregan explicación clara?",
      "Puedes presentar queja ante Texas Department of Insurance (TDI) y solicitar revisión. Actuar rápido es clave para no perder ventanas de reemplazo de cobertura.",
      "### Cierre",
      "En TC Insurance te ayudamos a interpretar avisos de no renovación/cancelación y a encontrar opciones de reemplazo con claridad, en español y sin fricción.",
      "### Fuentes",
      "- Texas Department of Insurance (TDI): https://www.tdi.texas.gov/\n- Contexto de implementación HB 2067: https://www.fox4news.com/news/texas-insurance-law-2026-automatic-explanations.amp"
    ],
  },
  {
    slug: "seguro-gastos-finales-texas-guia-completa",
    title: "Seguro de Gastos Finales en Texas: Qué Es, Costos y Cómo Protege a Tu Familia",
    excerpt:
      "Guía completa en español sobre seguro de gastos finales en Texas: costos reales, cómo funciona el pago a beneficiarios y cómo elegir una póliza sin errores.",
    category: "LEGADO",
    publishedAt: "2026-02-12",
    readTime: "10 MIN",
    author: "Tatiana Castañeda",
    featured: true,
    status: "active",
    featuredImage: "/blog/editorial-v3/final-expense-legacy.jpg",
    featuredImageAlt: "Seguro de gastos finales en Texas para proteger a la familia",
    content: [
      "### Seguro de Gastos Finales en Texas: la guía práctica que tu familia sí entiende.",
      "El seguro de gastos finales (*Final Expense Insurance*) es una póliza de vida diseñada para cubrir costos inmediatos cuando ocurre un fallecimiento: servicios funerarios, trámites, saldos médicos pendientes y otros gastos urgentes. Su objetivo principal no es inversión ni ahorro de largo plazo; es **liquidez rápida** para que tu familia no tenga que resolver una crisis emocional y financiera al mismo tiempo.",
      "En Texas, una despedida completa puede costar entre **$7,000 y $12,000** o más según ciudad, funeraria y tipo de servicio. En Dallas/Fort Worth, además del funeral pueden aparecer gastos de traslado, honorarios administrativos, certificados y deudas médicas de cierre. Cuando no existe una cobertura clara, esos costos suelen pagarse con ahorros familiares, tarjetas de crédito o préstamos de emergencia.",
      "#### ¿Qué cubre realmente un seguro de gastos finales?",
      "Aunque cada aseguradora maneja condiciones distintas, la lógica es la misma: dejar un beneficio económico para cubrir necesidades de corto plazo. Normalmente ese dinero puede usarse para:",
      "- Servicio funerario y/o cremación\n- Trámites legales y administrativos\n- Facturas médicas pendientes\n- Deudas pequeñas urgentes\n- Costos de transición del hogar durante los primeros meses",
      "La ventaja es operativa: el beneficiario recibe un pago que puede ejecutar rápido, sin depender de vender activos o de esperar procesos largos.",
      "#### Liquidez inmediata vs. burocracia sucesoria",
      "Muchas familias confían en que ‘la herencia’ resolverá todo. El problema es el tiempo. Dependiendo de la estructura patrimonial, la sucesión puede tardar semanas o meses en destrabarse. En cambio, un seguro de gastos finales bien configurado está pensado para cubrir necesidades inmediatas y evitar decisiones apresuradas en el peor momento.",
      "En otras palabras: no compite con tu estrategia patrimonial; la complementa. La herencia ordena el largo plazo. El seguro resuelve el corto plazo.",
      "#### ¿Quién debería considerar esta cobertura?",
      "No es solo para adultos mayores. En Texas, esta póliza es especialmente útil para:",
      "- Familias que no quieren transferir deudas de cierre a hijos o pareja\n- Hogares con presupuesto ajustado que no pueden absorber un gasto funerario inesperado\n- Personas que prefieren una solución simple y permanente\n- Quienes quieren dejar instrucciones financieras claras y ejecutables",
      "Si tu prioridad es que tu familia tenga **claridad + efectivo + rapidez** cuando más lo necesite, esta cobertura tiene sentido.",
      "#### Costos en Texas: cómo evaluar sin caer en el error de la prima barata",
      "Uno de los errores más comunes es elegir únicamente por prima mensual. En seguros, un precio bajo no siempre significa mejor decisión. Para evaluar bien, revisa cuatro elementos:",
      "1. **Beneficio real**: cuánto dinero recibiría tu beneficiario hoy.\n2. **Condiciones de elegibilidad**: salud, edad y periodo de espera.\n3. **Estabilidad de la póliza**: reglas de permanencia y ajustes.\n4. **Alineación con tu objetivo**: cubrir funeral + margen para trámites.",
      "Una póliza útil no es la más barata; es la que evita que tu familia complete la diferencia con deuda.",
      "#### Seguro de gastos finales vs. usar solo ahorros",
      "‘Yo mejor lo ahorro’ suena lógico, pero en la práctica requiere disciplina perfecta y tiempo. El seguro traslada parte del riesgo a la aseguradora y convierte una meta incierta en un monto definido. Ambos enfoques pueden convivir: ahorro para flexibilidad, póliza para garantía mínima de protección.",
      "#### Cómo elegir una póliza correcta en Dallas / Fort Worth",
      "Usa este checklist antes de firmar:",
      "- Define monto objetivo (funeral + trámites + colchón)\n- Nombra beneficiario principal y suplente correctamente\n- Revisa tiempos y condiciones de pago\n- Confirma que entiendes exclusiones y periodos de espera\n- Verifica que la prima sea sostenible a largo plazo\n- Documenta tu decisión para que tu familia sepa cómo activarla",
      "Este último punto es clave: una buena póliza mal documentada puede generar fricción justo cuando quieres evitarla.",
      "#### Errores frecuentes que sí puedes evitar",
      "- Comprar una suma insuficiente por enfocarte solo en precio\n- Dejar beneficiarios desactualizados\n- No informar a la familia sobre la existencia de la póliza\n- Contratar sin comparar escenarios de costo real\n- Postergar la decisión hasta que las condiciones de salud cambien",
      "Planificar temprano casi siempre mejora elegibilidad y costo.",
      "#### Enfoque recomendado para familias hispanas en Texas",
      "En nuestra experiencia, funciona mejor un enfoque simple y accionable: definir objetivo económico, validar presupuesto real, comparar opciones con lenguaje claro y dejar todo documentado. Sin tecnicismos innecesarios y sin promesas vacías.",
      "El objetivo no es vender una póliza por vender. El objetivo es que tu familia tenga una ruta de acción clara cuando más lo necesite.",
      "#### Cierre",
      "El seguro de gastos finales no elimina el dolor de una pérdida, pero sí puede eliminar una gran parte del estrés financiero inmediato. Esa diferencia cambia por completo cómo una familia atraviesa un momento crítico.",
      "En **TC Insurance**, te ayudamos a evaluar opciones de gastos finales en Texas con criterio técnico y lenguaje claro para que tomes una decisión que realmente proteja a tu familia.",
      "#### Diferencia entre seguro de gastos finales y seguro temporal de vida",
      "Ambos son útiles, pero cumplen funciones distintas. El seguro temporal suele enfocarse en proteger ingresos por un periodo definido (10, 20 o 30 años). El seguro de gastos finales está pensado para resolver costos inmediatos de cierre cuando ocurre el fallecimiento. Muchas familias en Texas usan una combinación: temporal para protección de ingreso + gastos finales para liquidez rápida.",
      "#### ¿Cuánto monto conviene contratar?",
      "Para definir un monto razonable, evita adivinar. Toma un escenario conservador de costos funerarios locales, suma trámites y añade un margen para imprevistos. En la práctica, muchas familias parten de un rango de cobertura que permita pagar funeral, documentación y un colchón básico sin tocar ahorros de emergencia del hogar.",
      "#### Factores que pueden cambiar el costo de tu póliza",
      "Las primas dependen de edad, historial de salud, tipo de producto, monto contratado y condiciones de emisión. Contratar temprano suele mejorar costo y elegibilidad. Esperar varios años puede limitar opciones o elevar prima de manera significativa. La recomendación es evaluar hoy con datos reales y ajustar si cambian tus necesidades.",
      "#### Señales de que una póliza no está bien elegida",
      "Si no puedes explicar en una frase cuánto recibiría tu beneficiario, cómo se activa el pago y qué costos cubriría, hay una señal de riesgo. Otra alerta es elegir una prima tan ajustada que en meses difíciles se vuelve difícil sostenerla. Una protección útil debe ser clara, realista y durable.",
      "#### Checklist de implementación familiar",
      "- Define objetivo de cobertura y presupuesto mensual\n- Confirma beneficiario principal y suplente\n- Guarda copia física y digital de la póliza\n- Informa a tu familia dónde está la documentación\n- Revisa la estrategia una vez al año",
      "Este checklist evita uno de los problemas más comunes: tener póliza pero no tener ejecución. La protección financiera no termina en la firma; termina cuando tu familia puede activar la cobertura sin fricción.",
      "#### Consideraciones para familias hispanas en Dallas/Fort Worth",
      "Además del costo, la claridad de comunicación importa. Asegúrate de recibir explicaciones completas en español, comparar escenarios y validar cada condición de la póliza antes de contratar. Tomar decisiones informadas reduce errores y protege mejor el patrimonio familiar.",
      "#### Qué revisar antes de renovar o reemplazar una póliza",
      "Antes de cambiar de producto, compara condiciones reales: periodo de espera, estabilidad de prima, monto garantizado y tiempos de pago. Cambiar solo por una prima ligeramente menor puede ser una mala decisión si se pierde cobertura clave. Evalúa costo total de riesgo, no solo el precio mensual.",
      "#### Marco regulatorio y fuentes recomendadas",
      "Para decisiones más sólidas, consulta fuentes oficiales como el **Texas Department of Insurance (TDI)** y guías de costos funerarios reconocidas. Combinar educación financiera con asesoría personalizada ayuda a tomar mejores decisiones y a evitar promesas comerciales poco claras.",
      "#### Plan de acción en 48 horas",
      "1. Define el monto objetivo que quieres cubrir.\n2. Reúne datos básicos de salud y presupuesto.\n3. Compara opciones con explicación clara en español.\n4. Elige beneficiarios y documenta el proceso para tu familia.\n5. Agenda revisión anual para mantener la cobertura alineada.",
      "Con ese plan, pasas de incertidumbre a una estrategia concreta. Y ese es el objetivo real del seguro de gastos finales: que tu familia tenga tranquilidad financiera en un momento donde cada decisión pesa el doble.",
    ],
    faq: [
      {
        question: "¿Qué es el seguro de gastos finales?",
        answer:
          "Es una póliza de vida diseñada para cubrir costos inmediatos como funeral, trámites y gastos urgentes tras un fallecimiento.",
      },
      {
        question: "¿Cuánto cuesta un funeral en Texas en 2026?",
        answer:
          "Puede variar por ciudad y tipo de servicio, pero un rango común está entre 7,000 y 12,000 dólares, sin contar gastos adicionales administrativos o médicos.",
      },
      {
        question: "¿El pago del seguro tarda meses como una herencia?",
        answer:
          "No necesariamente. Bien estructurado, el seguro busca entregar liquidez rápida al beneficiario para cubrir necesidades inmediatas.",
      },
      {
        question: "¿Conviene más ahorrar o contratar seguro de gastos finales?",
        answer:
          "Depende de tu situación. Muchas familias combinan ambos: ahorro para flexibilidad y seguro para garantizar un monto mínimo de protección.",
      },
      {
        question: "¿Quién debería considerar esta cobertura en Texas?",
        answer:
          "Familias que desean evitar deudas de cierre, hogares con presupuesto ajustado y personas que quieren dejar instrucciones financieras claras.",
      },
      {
        question: "¿Cómo elegir la póliza correcta?",
        answer:
          "Define monto objetivo, revisa condiciones de pago, valida beneficiarios y elige una prima sostenible en el largo plazo.",
      },
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
    featuredImage: "/blog/editorial-v3/health-plan-family.jpg",
    featuredImageAlt: "Crecimiento verde y protección en planes de salud familiares",
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
    featuredImage: "/blog/editorial-v3/life-insurance-stability.jpg",
    featuredImageAlt: "Estructuras estables abstractas sobre el seguro de vida familiar",
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
