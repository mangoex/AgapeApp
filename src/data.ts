export interface Question {
  id: string;
  dominio: 1 | 2 | 3;
  nivel: number;
  categoria: string;
  tipo: 'Directo' | 'Espejo';
  pregunta: string;
}

export const SURVEY_QUESTIONS: Question[] = [
  // DOMINIO 1: AUTOVIOLENCIA PSICOLÓGICA Y EMOCIONAL
  {
    id: "Q01",
    dominio: 1,
    nivel: 0,
    categoria: "Me hiero / me critico",
    tipo: "Directo",
    pregunta: "Cuando cometo un error, mi primer pensamiento es insultarme o llamarme tonto(a)."
  },
  {
    id: "Q02",
    dominio: 1,
    nivel: 0,
    categoria: "Me hiero / me critico",
    tipo: "Espejo",
    pregunta: "Me resulta muy difícil perdonarme y ser compasivo(a) cuando las cosas no salen como esperaba."
  },
  {
    id: "Q03",
    dominio: 1,
    nivel: 1,
    categoria: "Me presiono / me coacciono",
    tipo: "Directo",
    pregunta: "Me exijo resultados perfectos incluso cuando estoy agotado(a) física o mentalmente."
  },
  {
    id: "Q04",
    dominio: 1,
    nivel: 1,
    categoria: "Me presiono / me coacciono",
    tipo: "Espejo",
    pregunta: "Siento culpa si dedico tiempo a descansar en lugar de estar siendo productivo(a)."
  },
  {
    id: "Q05",
    dominio: 1,
    nivel: 2,
    categoria: "Me miento / me engaño",
    tipo: "Directo",
    pregunta: "Minimizo mis propios problemas convenciéndome de que 'no es para tanto'."
  },
  {
    id: "Q06",
    dominio: 1,
    nivel: 2,
    categoria: "Me miento / me engaño",
    tipo: "Espejo",
    pregunta: "Frecuentemente digo que estoy bien, aunque por dentro me sienta triste o abrumado(a)."
  },
  {
    id: "Q07",
    dominio: 1,
    nivel: 3,
    categoria: "Me ignoro / lo callo",
    tipo: "Directo",
    pregunta: "Reprimo mis emociones para no incomodar a las personas a mi alrededor."
  },
  {
    id: "Q08",
    dominio: 1,
    nivel: 3,
    categoria: "Me ignoro / lo callo",
    tipo: "Espejo",
    pregunta: "Pongo las necesidades de todos los demás por encima de mis propias necesidades vitales."
  },
  {
    id: "Q09",
    dominio: 1,
    nivel: 4,
    categoria: "Me culpo / me victimizo",
    tipo: "Directo",
    pregunta: "Asumo la responsabilidad de los conflictos o la infelicidad de los demás, sintiendo que es mi culpa."
  },
  {
    id: "Q10",
    dominio: 1,
    nivel: 4,
    categoria: "Me culpo / me victimizo",
    tipo: "Espejo",
    pregunta: "Creo firmemente que merezco las cosas malas que me suceden debido a mis imperfecciones."
  },
  {
    id: "Q11",
    dominio: 1,
    nivel: 5,
    categoria: "Me prohíbo disfrutar / gozar",
    tipo: "Directo",
    pregunta: "Cancelo planes divertidos o placenteros como una forma de autocastigo inconsciente."
  },
  {
    id: "Q12",
    dominio: 1,
    nivel: 5,
    categoria: "Me prohíbo disfrutar / gozar",
    tipo: "Espejo",
    pregunta: "Me siento incómodo(a) o indigno(a) cuando experimento momentos de alegría genuina."
  },
  {
    id: "Q13",
    dominio: 1,
    nivel: 6,
    categoria: "Me avergüenzo de mí mismo(a)",
    tipo: "Directo",
    pregunta: "Suelo sentir una profunda vergüenza de quién soy cuando me comparo con los demás."
  },
  {
    id: "Q14",
    dominio: 1,
    nivel: 6,
    categoria: "Me avergüenzo de mí mismo(a)",
    tipo: "Espejo",
    pregunta: "Escondo mis opiniones, gustos o forma de ser por miedo a que los demás descubran mi 'verdadero' yo."
  },
  {
    id: "Q15",
    dominio: 1,
    nivel: 7,
    categoria: "Me aíslo / me encierro",
    tipo: "Directo",
    pregunta: "Me retiro de mis amigos y redes de apoyo cuando me siento emocionalmente vulnerable."
  },
  {
    id: "Q16",
    dominio: 1,
    nivel: 7,
    categoria: "Me aíslo / me encierro",
    tipo: "Espejo",
    pregunta: "Evito pedir ayuda a pesar de saber que no puedo resolver un problema por mí mismo(a)."
  },
  {
    id: "Q17",
    dominio: 1,
    nivel: 8,
    categoria: "Descalifico mis logros / éxitos",
    tipo: "Directo",
    pregunta: "Atribuyo mis éxitos únicamente a la suerte, la coincidencia o el esfuerzo de otros."
  },
  {
    id: "Q18",
    dominio: 1,
    nivel: 8,
    categoria: "Descalifico mis logros / éxitos",
    tipo: "Espejo",
    pregunta: "Siento que soy un fraude y que en cualquier momento los demás se darán cuenta de mi incapacidad."
  },
  {
    id: "Q19",
    dominio: 1,
    nivel: 9,
    categoria: "Tolero maltratos externos",
    tipo: "Directo",
    pregunta: "Permito que las personas me hablen de forma despectiva o invalidante sin defenderme."
  },
  {
    id: "Q20",
    dominio: 1,
    nivel: 9,
    categoria: "Tolero maltratos externos",
    tipo: "Espejo",
    pregunta: "Suelo justificar las actitudes hirientes de otros hacia mí, pensando que yo las provoqué."
  },
  {
    id: "Q21",
    dominio: 1,
    nivel: 10,
    categoria: "Postergo mis sueños / metas",
    tipo: "Directo",
    pregunta: "Abandono mis proyectos personales importantes por temor al fracaso o a no ser suficiente."
  },
  {
    id: "Q22",
    dominio: 1,
    nivel: 10,
    categoria: "Postergo mis sueños / metas",
    tipo: "Espejo",
    pregunta: "Invierto mi energía en construir el futuro de otros, dejando mi propio crecimiento en el olvido."
  },

  // DOMINIO 2: AUTOVIOLENCIA FÍSICA Y DE DESCUIDO
  {
    id: "Q23",
    dominio: 2,
    nivel: 11,
    categoria: "Descuido mi descanso y sueño",
    tipo: "Directo",
    pregunta: "Reduzco deliberadamente mis horas de descanso para trabajar o resolver pendientes, descuidando mi bienestar."
  },
  {
    id: "Q24",
    dominio: 2,
    nivel: 11,
    categoria: "Descuido mi descanso y sueño",
    tipo: "Espejo",
    pregunta: "Suelo pasar noches enteras despierto(a) debido a la rumiación excesiva de mis problemas cotidianos."
  },
  {
    id: "Q25",
    dominio: 2,
    nivel: 12,
    categoria: "No respeto mi cuerpo",
    tipo: "Directo",
    pregunta: "Descuido intencionalmente mi alimentación, sueño o higiene por castigo o apatía."
  },
  {
    id: "Q26",
    dominio: 2,
    nivel: 12,
    categoria: "No respeto mi cuerpo",
    tipo: "Espejo",
    pregunta: "Ignoro las señales de dolor o enfermedad en mi cuerpo y evito buscar ayuda médica."
  },
  {
    id: "Q27",
    dominio: 2,
    nivel: 13,
    categoria: "Privación de necesidades somáticas",
    tipo: "Directo",
    pregunta: "He pasado horas sin comer o beber agua simplemente porque no considero prioritario atenderme."
  },
  {
    id: "Q28",
    dominio: 2,
    nivel: 13,
    categoria: "Privación de necesidades somáticas",
    tipo: "Espejo",
    pregunta: "Aguanto la necesidad de ir al baño o estirarme, obligando a mi cuerpo a soportar incomodidad física."
  },
  {
    id: "Q29",
    dominio: 2,
    nivel: 14,
    categoria: "Me golpeo 'jugando'",
    tipo: "Directo",
    pregunta: "Suelo darme golpes a mí mismo(a) justificando que es 'en broma' o 'por accidente'."
  },
  {
    id: "Q30",
    dominio: 2,
    nivel: 14,
    categoria: "Me golpeo 'jugando'",
    tipo: "Espejo",
    pregunta: "Permito que haya rudeza física contra mi cuerpo, minimizándola como si fuera un juego."
  },
  {
    id: "Q31",
    dominio: 2,
    nivel: 15,
    categoria: "Imprudencia o peligro innecesario",
    tipo: "Directo",
    pregunta: "Cruzo avenidas de manera imprudente o conduzco a altas velocidades sin importar las consecuencias."
  },
  {
    id: "Q32",
    dominio: 2,
    nivel: 15,
    categoria: "Imprudencia o peligro innecesario",
    tipo: "Espejo",
    pregunta: "Suelo exponerme a situaciones de riesgo físico elevado sin tomar ninguna precaución básica."
  },
  {
    id: "Q33",
    dominio: 2,
    nivel: 16,
    categoria: "Agotamiento físico extremo",
    tipo: "Directo",
    pregunta: "Realizo ejercicio físico o labores pesadas hasta el punto de sentir náuseas, mareos o dolor agudo."
  },
  {
    id: "Q34",
    dominio: 2,
    nivel: 16,
    categoria: "Agotamiento físico extremo",
    tipo: "Espejo",
    pregunta: "Ignoro el cansancio muscular extremo y sigo forzándome a realizar actividades de alta demanda."
  },
  {
    id: "Q35",
    dominio: 2,
    nivel: 17,
    categoria: "Consumo de sustancias nocivas",
    tipo: "Directo",
    pregunta: "Consumo alcohol, tabaco u otras sustancias en exceso con el propósito de anestesiar mis emociones."
  },
  {
    id: "Q36",
    dominio: 2,
    nivel: 17,
    categoria: "Consumo de sustancias nocivas",
    tipo: "Espejo",
    pregunta: "Tengo dificultades para detener el consumo de sustancias nocivas aun sabiendo el daño que causan a mi salud."
  },
  {
    id: "Q37",
    dominio: 2,
    nivel: 18,
    categoria: "Sabotaje de redes de apoyo",
    tipo: "Directo",
    pregunta: "Alejo deliberadamente a las personas que me demuestran amor, contención y cuidado incondicional."
  },
  {
    id: "Q38",
    dominio: 2,
    nivel: 18,
    categoria: "Sabotaje de redes de apoyo",
    tipo: "Espejo",
    pregunta: "Busco inconscientemente generar conflictos con seres queridos para aislarme de su ayuda."
  },
  {
    id: "Q39",
    dominio: 2,
    nivel: 19,
    categoria: "Automedicación sin supervisión",
    tipo: "Directo",
    pregunta: "Ingiero analgésicos o ansiolíticos sin prescripción médica para acallar el malestar físico o emocional."
  },
  {
    id: "Q40",
    dominio: 2,
    nivel: 19,
    categoria: "Automedicación sin supervisión",
    tipo: "Espejo",
    pregunta: "Suelo ignorar las dosis recomendadas de medicamentos, tomándolos según mi propio criterio de urgencia."
  },
  {
    id: "Q41",
    dominio: 2,
    nivel: 20,
    categoria: "Descuido de espacio vital",
    tipo: "Directo",
    pregunta: "Permito que mi habitación o espacio de trabajo se inunde de desorden y suciedad extrema de forma persistente."
  },
  {
    id: "Q42",
    dominio: 2,
    nivel: 20,
    categoria: "Descuido de espacio vital",
    tipo: "Espejo",
    pregunta: "Considero que vivir en un entorno deteriorado o descuidado es el castigo que merezco."
  },

  // DOMINIO 3: AUTOVIOLENCIA DE ALTO RIESGO Y SEXUAL
  {
    id: "Q43",
    dominio: 3,
    nivel: 21,
    categoria: "Permisión de maltrato físico",
    tipo: "Directo",
    pregunta: "He tolerado agresiones físicas directas (empujones, sacudidas, bofetadas) de personas cercanas."
  },
  {
    id: "Q44",
    dominio: 3,
    nivel: 21,
    categoria: "Permisión de maltrato físico",
    tipo: "Espejo",
    pregunta: "Permanezco de manera voluntaria en entornos donde mi integridad física es amenazada constantemente."
  },
  {
    id: "Q45",
    dominio: 3,
    nivel: 22,
    categoria: "Coacción sexual tolerada",
    tipo: "Directo",
    pregunta: "He accedido a tener relaciones íntimas sin mi pleno consentimiento para evitar enojos o abandono."
  },
  {
    id: "Q46",
    dominio: 3,
    nivel: 22,
    categoria: "Coacción sexual tolerada",
    tipo: "Espejo",
    pregunta: "Siento que no tengo derecho a decir que 'no' a las peticiones íntimas de mi pareja."
  },
  {
    id: "Q47",
    dominio: 3,
    nivel: 23,
    categoria: "Modificaciones corporales de riesgo",
    tipo: "Directo",
    pregunta: "Me he sometido a tratamientos estéticos invasivos de dudosa procedencia sin medir el peligro de muerte."
  },
  {
    id: "Q48",
    dominio: 3,
    nivel: 23,
    categoria: "Modificaciones corporales de riesgo",
    tipo: "Espejo",
    pregunta: "Considero alterar mi fisonomía de forma dolorosa o peligrosa solo para intentar encajar en expectativas ajenas."
  },
  {
    id: "Q49",
    dominio: 3,
    nivel: 24,
    categoria: "Privación extrema de libertad",
    tipo: "Directo",
    pregunta: "Permito que otras personas controlen por completo mi vestimenta, amistades, horarios o finanzas."
  },
  {
    id: "Q50",
    dominio: 3,
    nivel: 24,
    categoria: "Privación extrema de libertad",
    tipo: "Espejo",
    pregunta: "Siento un miedo paralizante a tomar decisiones personales sencillas sin la aprobación absoluta de alguien más."
  },
  {
    id: "Q51",
    dominio: 3,
    nivel: 25,
    categoria: "Relaciones abusivas persistentes",
    tipo: "Directo",
    pregunta: "Mantengo relaciones sentimentales con personas que me humillan, celan de forma enfermiza o manipulan constantemente."
  },
  {
    id: "Q52",
    dominio: 3,
    nivel: 25,
    categoria: "Relaciones abusivas persistentes",
    tipo: "Espejo",
    pregunta: "Me siento incapaz de romper un vínculo dañino a pesar de reconocer que está destruyendo mi salud mental."
  },
  {
    id: "Q53",
    dominio: 3,
    nivel: 26,
    categoria: "Desprecio y castigo íntimo",
    tipo: "Directo",
    pregunta: "Asocio mi sexualidad con la culpa extrema y suelo infligirme castigos o privaciones en mi intimidad."
  },
  {
    id: "Q54",
    dominio: 3,
    nivel: 26,
    categoria: "Desprecio y castigo íntimo",
    tipo: "Espejo",
    pregunta: "Siento que mi cuerpo y mis necesidades biológicas son impuras y merecen ser despreciadas."
  },
  {
    id: "Q55",
    dominio: 3,
    nivel: 27,
    categoria: "Me corto (Cutting) / Me mutilo",
    tipo: "Directo",
    pregunta: "He recurrido a hacerme heridas físicas (cortes, quemaduras) para aliviar mi dolor emocional."
  },
  {
    id: "Q56",
    dominio: 3,
    nivel: 27,
    categoria: "Me corto (Cutting) / Me mutilo",
    tipo: "Espejo",
    pregunta: "Tengo cicatrices o marcas físicas autoinfligidas que intento ocultar sistemáticamente de los demás."
  },
  {
    id: "Q57",
    dominio: 3,
    nivel: 28,
    categoria: "Acciones deliberadas de alto riesgo",
    tipo: "Directo",
    pregunta: "Me coloco deliberadamente en situaciones de peligro de muerte (bordes de precipicios, vías rápidas)."
  },
  {
    id: "Q58",
    dominio: 3,
    nivel: 28,
    categoria: "Acciones deliberadas de alto riesgo",
    tipo: "Espejo",
    pregunta: "Siento una atracción o impulso inconsciente hacia escenarios donde mi supervivencia física corre peligro."
  },
  {
    id: "Q59",
    dominio: 3,
    nivel: 29,
    categoria: "Ideación suicida activa",
    tipo: "Directo",
    pregunta: "He tenido pensamientos concretos o he hecho planes para terminar con mi propia vida."
  },
  {
    id: "Q60",
    dominio: 3,
    nivel: 29,
    categoria: "Ideación suicida activa",
    tipo: "Espejo",
    pregunta: "Fantaseo frecuentemente con la idea de desaparecer por completo, no despertar o dejar de existir."
  },
  {
    id: "Q61",
    dominio: 3,
    nivel: 30,
    categoria: "Preparación o intento autolítico",
    tipo: "Directo",
    pregunta: "He llevado a cabo acciones concretas para preparar mi despedida o ensayar un intento de suicidio."
  },
  {
    id: "Q62",
    dominio: 3,
    nivel: 30,
    categoria: "Preparación o intento autolítico",
    tipo: "Espejo",
    pregunta: "Conserve objetos, sustancias o notas con el propósito explícito de atentar contra mi propia existencia."
  }
];

export interface ScoreZone {
  name: "Verde" | "Amarilla" | "Roja" | "Crítica";
  minScore: number;
  maxScore: number;
  color: string;
  textColor: string;
  bgLight: string;
  description: string;
  guidelines: string[];
  clinicalFocus: string;
}

export const SCORE_ZONES: ScoreZone[] = [
  {
    name: "Verde",
    minScore: 0,
    maxScore: 30,
    color: "#10B981", // Jade Green
    textColor: "text-emerald-400",
    bgLight: "bg-emerald-950/30 border-emerald-800/50",
    description: "Autoviolencia Leve: Posees una base sólida de respeto. Requiere un enfoque de consolidación y nutrición de tu Amor Ágape.",
    guidelines: [
      "Práctica diaria de gratitud y autoafirmaciones positivas.",
      "Mantenimiento de límites personales saludables.",
      "Prácticas de meditación de bondad amorosa (Metta)."
    ],
    clinicalFocus: "Enfoque Clínico: Consolidación del amor propio incondicional y prevención primaria."
  },
  {
    name: "Amarilla",
    minScore: 31,
    maxScore: 75,
    color: "#D97706", // Amber
    textColor: "text-amber-400",
    bgLight: "bg-amber-950/30 border-amber-800/50",
    description: "Autoviolencia Moderada: Alerta preventiva. Hay presencia de conductas de descuido emocional y rigidez cognitiva autopunitiva.",
    guidelines: [
      "Iniciar el 'Diálogo Interno Consciente' para reescribir la crítica destructiva.",
      "Establecer recordatorios obligatorios de descanso activo y recreación.",
      "Identificación y desactivación de Comandos Tóxicos cotidianos."
    ],
    clinicalFocus: "Enfoque Clínico: Intervención temprana cognitivo-conductual y psicoeducación de autocompasión."
  },
  {
    name: "Roja",
    minScore: 76,
    maxScore: 130,
    color: "#DC2626", // Red
    textColor: "text-rose-400",
    bgLight: "bg-rose-950/30 border-rose-800/50",
    description: "Autoviolencia Severa: Riesgo a tu integridad psicofísica. Ejerces niveles elevados de castigo y coacción interna.",
    guidelines: [
      "Se sugiere firmemente iniciar terapia asistida personalizada en la Clínica NICÓMACO.",
      "Activar tu red de apoyo de absoluta confianza (familia o amigos íntimos).",
      "Ejercicios diarios guiados de regulación emocional y de compasión somática."
    ],
    clinicalFocus: "Enfoque Clínico: Reestructuración cognitiva profunda, terapia de aceptación y compromiso (ACT), acompañamiento psicoterapéutico."
  },
  {
    name: "Crítica",
    minScore: 131,
    maxScore: 186,
    color: "#991B1B", // Dark Crimson
    textColor: "text-red-500 font-bold animate-pulse",
    bgLight: "bg-red-950/40 border-red-800/70",
    description: "Zona de Emergencia / Riesgo Vital Detectado: Tu seguridad y bienestar psicológico están en una fase extremadamente vulnerable.",
    guidelines: [
      "Activar de inmediato el Protocolo SOS con ayuda profesional.",
      "Ponerte en contacto con las líneas de crisis nacionales de forma gratuita y confidencial.",
      "Agendar un espacio prioritario de contención en la Clínica NICÓMACO."
    ],
    clinicalFocus: "Enfoque Clínico: Protocolo de prevención de conducta de riesgo inminente, desactivación de crisis agudas."
  }
];

export const EMOTIONAL_EXERCISES = [
  {
    title: "El Diálogo Interno Consciente",
    description: "Aprende a responder a tu autocrítica severa con la voz que usarías con la persona que más amas en la tierra.",
    steps: [
      "Identifica el insulto automático (ej. 'Soy un inútil por arruinar esto').",
      "Detén el pensamiento respirando hondo 3 veces.",
      "Reformula objetivamente: ' Cometí un error, como cualquier ser humano. Esto no define mi valor. ¿Qué puedo aprender hoy?'"
    ]
  },
  {
    title: "Minutos de Compasión Ágape",
    description: "Dedica un espacio al día para sintonizar con tu estado físico y honrar lo que tu cuerpo necesita en este instante.",
    steps: [
      "Coloca una mano en tu pecho sintiendo el latido de tu corazón.",
      "Repite mentalmente: 'Que pueda ser compasivo conmigo hoy. Que pueda ser libre de violencia interna.'",
      "Realiza una acción inmediata de autocuidado básico (tomar agua, estirar el cuello o dormir 15 minutos)."
    ]
  }
];
