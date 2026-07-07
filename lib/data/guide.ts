export interface GuideExample {
  wrong?: string;
  right: string;
  note?: string;
}

export interface GuideRule {
  title: string;
  body: string;
  examples?: GuideExample[];
}

export interface GuideTopic {
  slug: string;
  title: string;
  shortDescription: string;
  category: "grammar" | "usage" | "structure";
  keywords: string[];
  rules: GuideRule[];
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    slug: "connectors",
    title: "Conectores lógicos",
    shortDescription:
      "Cómo unir ideas: contraste, causa, consecuencia y adición.",
    category: "usage",
    keywords: ["however", "therefore", "moreover", "although", "despite", "because"],
    rules: [
      {
        title: "Contraste entre dos oraciones",
        body:
          "Usa 'however', 'nevertheless' o 'nonetheless' con punto y coma o punto para separar dos ideas contrarias entre oraciones independientes.",
        examples: [
          {
            right:
              "The bridge is safe for pedestrians; however, heavy vehicles must take another route.",
          },
          {
            wrong:
              "The bridge is safe for pedestrians, however heavy vehicles must take another route.",
            right:
              "The bridge is safe for pedestrians; however, heavy vehicles must take another route.",
            note: "'However' funciona como adverbio conjuntivo, no como coma.",
          },
        ],
      },
      {
        title: "Concesión: cláusula vs. frase",
        body:
          "'Although' + cláusula (sujeto + verbo). 'Despite / In spite of' + sustantivo o gerundio. No mezcles las dos.",
        examples: [
          { right: "Although the weather was severe, the ceremony continued." },
          { right: "Despite the severe weather, the ceremony continued." },
          {
            wrong: "Despite the weather was severe, the ceremony continued.",
            right: "Despite the severe weather, the ceremony continued.",
          },
        ],
      },
      {
        title: "Causa y consecuencia",
        body:
          "Causa: 'because' + cláusula, 'because of' + sustantivo, 'since', 'as'. Consecuencia: 'therefore', 'thus', 'consequently', 'so'.",
        examples: [
          { right: "The proposal failed because it lacked evidence." },
          { right: "The proposal failed because of a lack of evidence." },
          {
            right:
              "The device works perfectly; therefore, no maintenance is needed.",
          },
        ],
      },
      {
        title: "Adición",
        body:
          "'Moreover', 'furthermore', 'in addition' agregan información al mismo tema. Van entre puntos y coma o al inicio de oración.",
        examples: [
          {
            right:
              "The device works perfectly; moreover, it consumes very little energy.",
          },
        ],
      },
    ],
  },
  {
    slug: "only",
    title: "Only: posición y énfasis",
    shortDescription:
      "Dónde va 'only' según lo que quieres restringir.",
    category: "usage",
    keywords: ["only", "adverb", "inversion"],
    rules: [
      {
        title: "Only antes del elemento que restringe",
        body:
          "'Only' modifica lo que le sigue. Muévelo para cambiar el foco: 'only in aircraft' (solo en aviones) vs. 'only aircraft' (solo aviones).",
        examples: [
          { right: "Titanium weighs only half as much as iron." },
          {
            wrong: "Titanium weighs half only as much as iron.",
            right: "Titanium weighs only half as much as iron.",
          },
        ],
      },
      {
        title: "Only al inicio → inversión",
        body:
          "Cuando 'only + adverbio/frase' abre la oración, el verbo auxiliar se invierte con el sujeto.",
        examples: [
          {
            right:
              "Only recently have researchers begun to study coral communication.",
          },
          {
            right:
              "It is only in modern times that space research became a practical possibility.",
          },
        ],
      },
      {
        title: "Not only ... but also",
        body:
          "Correlativo. Cuando 'Not only' inicia la oración, hay inversión: 'Not only DID she write, but also ...'.",
        examples: [
          {
            right:
              "Not only did she write the manuscript, but she also illustrated it.",
          },
        ],
      },
    ],
  },
  {
    slug: "by",
    title: "By: agente, medio y tiempo",
    shortDescription: "Los tres usos más frecuentes de 'by' en el ITP.",
    category: "usage",
    keywords: ["by", "passive", "deadline"],
    rules: [
      {
        title: "Agente en voz pasiva",
        body:
          "En pasiva, 'by' introduce quién realiza la acción.",
        examples: [
          { right: "The Great Wall was built by successive Chinese dynasties." },
        ],
      },
      {
        title: "Medio o método",
        body:
          "'By + gerundio' explica el medio. 'By + sustantivo' identifica el instrumento.",
        examples: [
          {
            right:
              "The scientists reduced the error by refining the calibration.",
          },
          { right: "The signal is transmitted by satellite." },
        ],
      },
      {
        title: "Fecha límite",
        body:
          "'By + tiempo' expresa un plazo. No confundas con 'until' (duración).",
        examples: [
          { right: "The renovation must be completed by December." },
          {
            wrong: "The renovation must be completed until December.",
            right: "The renovation must be completed by December.",
            note: "'Until December' significa hasta que llegue diciembre, no antes.",
          },
        ],
      },
    ],
  },
  {
    slug: "modals",
    title: "Modales: must, should, could, might",
    shortDescription:
      "Verbos modales y sus formas en presente, pasado y con perfecto.",
    category: "grammar",
    keywords: ["must", "should", "could", "modal"],
    rules: [
      {
        title: "Modal + verbo base",
        body:
          "Después de un modal siempre va el verbo en forma base, sin 'to'.",
        examples: [
          { right: "Passengers must remain seated." },
          {
            wrong: "Passengers must to remain seated.",
            right: "Passengers must remain seated.",
          },
        ],
      },
      {
        title: "Must en pasado → had to",
        body:
          "'Must' no tiene forma pasada. Para obligación en pasado usa 'had to'.",
        examples: [
          { right: "The traveler had to renew her passport before flying." },
        ],
      },
      {
        title: "Modal perfect: modal + have + participio",
        body:
          "Para deducción sobre el pasado ('must have') o posibilidad no realizada ('could have', 'might have').",
        examples: [
          {
            right:
              "Ancient sailors must have used star patterns before the compass existed.",
          },
        ],
      },
    ],
  },
  {
    slug: "articles",
    title: "Artículos: a, an, the",
    shortDescription:
      "Cuándo usar artículo indefinido, definido o ninguno.",
    category: "grammar",
    keywords: ["article", "a", "an", "the"],
    rules: [
      {
        title: "'A' vs. 'an' por sonido",
        body:
          "'A' antes de sonido consonante; 'an' antes de sonido vocal — depende del sonido, no de la letra.",
        examples: [
          { right: "an airplane" },
          { right: "an hour" },
          { right: "a university" },
          {
            wrong: "A airplane is common transportation.",
            right: "An airplane is common transportation.",
          },
        ],
      },
      {
        title: "Superlativos y ordinales piden 'the'",
        body:
          "Cualquier construcción con 'first, most, best, largest' lleva 'the'.",
        examples: [
          {
            right:
              "Amelia Earhart was the first woman to fly solo across the Atlantic.",
          },
          {
            wrong:
              "Coal is one of the abundant natural resources in Appalachia.",
            right:
              "Coal is one of the most abundant natural resources in Appalachia.",
          },
        ],
      },
      {
        title: "Nombres propios sin 'the'",
        body:
          "Montañas individuales, guerras específicas con número, y la mayoría de países no llevan 'the'.",
        examples: [
          { right: "Mount Everest is the highest mountain." },
          { right: "After World War II, many cities were rebuilt." },
          {
            wrong: "The Mount Everest is located in the Himalayas.",
            right: "Mount Everest is located in the Himalayas.",
          },
        ],
      },
    ],
  },
  {
    slug: "superlatives",
    title: "Superlativos",
    shortDescription:
      "Formación y errores comunes: 'the most' vs. '-est'.",
    category: "grammar",
    keywords: ["superlative", "most", "-est"],
    rules: [
      {
        title: "-est para adjetivos cortos, most para largos",
        body:
          "Adjetivos de 1 sílaba o de 2 terminadas en '-y' → -est. Los demás → most.",
        examples: [
          { right: "tall → the tallest" },
          { right: "happy → the happiest" },
          { right: "beautiful → the most beautiful" },
        ],
      },
      {
        title: "Nunca dobles superlativos",
        body: "No uses 'most' con adjetivos que ya son superlativos con -est.",
        examples: [
          {
            wrong: "The most largest organ of the human body is the skin.",
            right: "The largest organ of the human body is the skin.",
          },
        ],
      },
      {
        title: "One of + superlativo + plural",
        body:
          "La construcción 'one of the + superlativo + sustantivo plural' es fija.",
        examples: [
          { right: "It is one of the most abundant natural resources." },
        ],
      },
    ],
  },
  {
    slug: "adjective-vs-adverb",
    title: "Adjetivo vs. adverbio",
    shortDescription:
      "Cuándo termina en -ly y cuándo no.",
    category: "grammar",
    keywords: ["adjective", "adverb", "-ly", "word-form"],
    rules: [
      {
        title: "Los adjetivos modifican sustantivos",
        body:
          "Van antes del sustantivo (rare manuscripts) o después de verbos copulativos (the sauce is delicious).",
        examples: [
          { right: "an efficient way of burning calories" },
          {
            wrong: "an efficiently way of burning calories",
            right: "an efficient way of burning calories",
          },
        ],
      },
      {
        title: "Los adverbios modifican verbos, adjetivos u otros adverbios",
        body:
          "La mayoría terminan en -ly. Modifican cómo se hace algo o intensifican.",
        examples: [
          { right: "The temperature rose rapidly." },
          { right: "The photograph was taken quickly." },
          {
            wrong: "The temperature rose rapid.",
            right: "The temperature rose rapidly.",
          },
        ],
      },
      {
        title: "Ojo con: friendly, lonely, lively, cowardly",
        body:
          "Terminan en -ly pero SON adjetivos, no adverbios.",
      },
    ],
  },
  {
    slug: "correlatives",
    title: "Correlativos",
    shortDescription:
      "both/and, either/or, neither/nor, not only/but also.",
    category: "grammar",
    keywords: ["correlative", "either", "neither", "both", "not only"],
    rules: [
      {
        title: "Los pares fijos son exactos",
        body:
          "Nunca mezcles: 'both...and', 'either...or', 'neither...nor', 'not only...but also'.",
        examples: [
          { right: "Both the coach and the players trained hard." },
          { right: "Either regional or ethnic." },
          {
            wrong: "Sidney Lanier achieved fame both as a poet or as a musician.",
            right:
              "Sidney Lanier achieved fame both as a poet and as a musician.",
          },
        ],
      },
      {
        title: "Concordancia con neither/either ... nor/or",
        body:
          "El verbo concuerda con el sujeto más cercano al verbo.",
        examples: [
          { right: "Neither the manager nor the assistants have arrived." },
          { right: "Neither the assistants nor the manager has arrived." },
        ],
      },
    ],
  },
  {
    slug: "relative-clauses",
    title: "Cláusulas relativas",
    shortDescription: "who, whose, which, that, where, when.",
    category: "grammar",
    keywords: ["relative", "who", "whose", "which", "that"],
    rules: [
      {
        title: "Persona vs. cosa",
        body:
          "Personas: who (sujeto), whom (objeto), whose (posesión). Cosas: which, that. Nunca 'which' para personas.",
        examples: [
          { right: "Isaac Newton, whose contributions transformed physics..." },
          { right: "Alexander Fleming, who discovered penicillin..." },
          {
            wrong: "The professor which lecture we attended.",
            right: "The professor whose lecture we attended.",
          },
        ],
      },
      {
        title: "Preposición + relativo",
        body:
          "Formal: la preposición precede al relativo. Informal: al final. Nunca 'which across' — es 'across which'.",
        examples: [
          {
            right:
              "A tapestry consists of a foundation weave, across which are passed different colored threads.",
          },
        ],
      },
      {
        title: "Where para lugar, when para tiempo",
        body: "Where sustituye 'in/at + lugar'; when sustituye 'in/on + tiempo'.",
        examples: [
          {
            right:
              "Grand Canyon National Park is one of the few places where visitors can observe billions of years of history.",
          },
        ],
      },
    ],
  },
  {
    slug: "count-uncount",
    title: "Contable vs. incontable",
    shortDescription:
      "much/many, little/few, a/an y otros determinantes.",
    category: "grammar",
    keywords: ["countable", "uncountable", "much", "many", "little", "few"],
    rules: [
      {
        title: "Contables plurales: many, few",
        body: "Se pluralizan y se cuentan.",
        examples: [
          { right: "many mammals, few students, several drafts" },
          {
            wrong: "much extinct mammals",
            right: "many extinct mammals",
          },
        ],
      },
      {
        title: "Incontables: much, little (sin -s, sin 'a')",
        body:
          "'information', 'evidence', 'weather', 'research', 'advice' NUNCA llevan plural ni 'a/an'.",
        examples: [
          { right: "much information, little evidence, warmer weather" },
          {
            wrong: "many evidence supports the theory",
            right: "much evidence supports the theory",
          },
          {
            wrong: "a warmer weathers",
            right: "warmer weather",
          },
        ],
      },
    ],
  },
  {
    slug: "inversion",
    title: "Inversión con adverbios negativos",
    shortDescription:
      "Not until, Rarely, Never, Only al inicio piden do-support.",
    category: "structure",
    keywords: ["inversion", "not until", "rarely", "never"],
    rules: [
      {
        title: "Fórmula: adverbio negativo + auxiliar + sujeto + verbo",
        body:
          "Cuando 'Not only', 'Rarely', 'Never', 'Not until', 'Only recently' abren la oración, el auxiliar se mueve delante del sujeto.",
        examples: [
          {
            right:
              "Not until the twentieth century did effective vaccines become widely available.",
          },
          {
            right:
              "Rarely does one find such a comprehensive display in a single collection.",
          },
          {
            wrong: "Not only she wrote the manuscript, but she illustrated it.",
            right:
              "Not only did she write the manuscript, but she illustrated it.",
          },
        ],
      },
    ],
  },
  {
    slug: "word-order",
    title: "Orden de palabras",
    shortDescription:
      "Adjetivo antes del sustantivo. Adverbios cerca del verbo.",
    category: "structure",
    keywords: ["word order", "adjective", "adverb"],
    rules: [
      {
        title: "Adjetivo antes del sustantivo",
        body:
          "En inglés el adjetivo va siempre antes del sustantivo. Ni al revés ni al lado.",
        examples: [
          {
            wrong: "manuscripts rare from the medieval period",
            right: "rare manuscripts from the medieval period",
          },
          {
            wrong: "comedies musical",
            right: "musical comedies",
          },
        ],
      },
      {
        title: "'Only' se pega a lo que restringe",
        body:
          "Cambia el foco de la oración al moverse. Ver la sección 'Only'.",
      },
    ],
  },
  {
    slug: "verb-tenses",
    title: "Tiempos verbales",
    shortDescription:
      "Cuándo usar cada tiempo: presente, pasado, futuro y sus formas perfectas.",
    category: "grammar",
    keywords: ["tense", "present", "past", "future", "perfect", "since", "for"],
    rules: [
      {
        title: "Presente simple: verdades generales y rutinas",
        body:
          "Se usa para hechos permanentes, verdades científicas, rutinas y frecuencias. Forma: verbo base (con -s/-es en 3.ª persona singular).",
        examples: [
          { right: "Water boils at 100 degrees Celsius." },
          { right: "The Earth rotates on its axis every 24 hours." },
          {
            wrong: "Water is boiling at 100 degrees Celsius.",
            right: "Water boils at 100 degrees Celsius.",
            note: "Una verdad universal va en presente simple, no continuo.",
          },
        ],
      },
      {
        title: "Presente continuo: acción en curso",
        body:
          "Acción ocurriendo ahora mismo o alrededor de este período. Forma: am/is/are + verbo-ing. Marcadores: now, right now, at the moment.",
        examples: [
          { right: "Right now, the researchers are analyzing the samples." },
          { right: "Global temperatures are rising rapidly." },
        ],
      },
      {
        title: "Presente perfecto: acción con conexión al presente",
        body:
          "Empezó en el pasado y sigue relevante hoy, o experiencia sin tiempo específico. Forma: have/has + participio. Marcadores clave: since (punto de inicio), for (duración), already, yet, ever, never.",
        examples: [
          { right: "Since 2010, average temperatures have risen by one degree." },
          { right: "She has worked here for five years." },
          {
            wrong: "She has worked here since five years.",
            right: "She has worked here for five years.",
            note: "'Since' + punto en el tiempo (2010, Monday). 'For' + duración (five years, two months).",
          },
        ],
      },
      {
        title: "Pasado simple: acción terminada en el pasado",
        body:
          "Se usa con fechas o períodos específicos. Forma: verbo con -ed (regulares) o forma pasada (irregulares). Marcadores: in 1898, yesterday, last week, ago.",
        examples: [
          { right: "Marie Curie discovered radium in 1898." },
          {
            wrong: "Marie Curie has discovered radium in 1898.",
            right: "Marie Curie discovered radium in 1898.",
            note: "Con año específico, siempre pasado simple, nunca presente perfecto.",
          },
        ],
      },
      {
        title: "Pasado continuo: acción en curso interrumpida",
        body:
          "Acción larga que ocurría cuando otra pasó. Forma: was/were + verbo-ing. Marcadores: while, when.",
        examples: [
          {
            right:
              "While the chef was preparing the sauce, the assistants prepared the appetizers.",
          },
        ],
      },
      {
        title: "Pasado perfecto: pasado anterior a otro pasado",
        body:
          "Acción ocurrida antes de otra en el pasado. Forma: had + participio.",
        examples: [
          {
            right:
              "The team announced the results only after the samples had been analyzed.",
            note: "Analizar ocurrió antes de anunciar.",
          },
        ],
      },
      {
        title: "Futuro con 'will'",
        body:
          "Predicciones, decisiones espontáneas, promesas. Forma: will + verbo base (para cualquier persona).",
        examples: [
          {
            right:
              "By 2050, most vehicles will be powered by renewable energy sources.",
          },
        ],
      },
      {
        title: "Futuro perfecto: acción completada antes de otro punto futuro",
        body:
          "Forma: will have + participio. Marcador clave: 'by + tiempo/evento'.",
        examples: [
          {
            right:
              "By the time the exhibition opens, the museum will have renovated its main gallery.",
          },
        ],
      },
      {
        title: "Voz pasiva en cada tiempo",
        body:
          "Fórmula base: forma correcta de 'to be' + participio pasado. Cambia el 'to be' según el tiempo.",
        examples: [
          { right: "The Great Wall was built over more than two thousand years. (pasado)" },
          { right: "The device is powered by solar cells. (presente)" },
          { right: "The observatory will be inaugurated next year. (futuro)" },
          {
            right:
              "The manuscript has been preserved for centuries. (presente perfecto)",
          },
        ],
      },
    ],
  },
  {
    slug: "verb-forms",
    title: "Formas del verbo: infinitivo, gerundio, participios",
    shortDescription:
      "Cuándo usar 'to + verbo', '-ing', participio pasado y subjuntivo.",
    category: "grammar",
    keywords: [
      "infinitive",
      "gerund",
      "participle",
      "subjunctive",
      "conditional",
    ],
    rules: [
      {
        title: "Infinitivo (to + base) tras ciertos verbos",
        body:
          "Verbos que van seguidos por infinitivo: agree, decide, want, need, hope, plan, promise, offer, refuse, learn, seem, appear.",
        examples: [
          { right: "The volunteers agreed to assemble the shelter." },
          { right: "Astronauts must train for years." },
          {
            wrong: "Astronauts must training for years.",
            right: "Astronauts must train for years.",
            note: "Tras un modal (must, can, could…) va verbo base, sin 'to'.",
          },
        ],
      },
      {
        title: "Gerundio (-ing) tras ciertos verbos",
        body:
          "Verbos que van seguidos por gerundio: recommend, suggest, enjoy, avoid, mind, finish, consider, imagine, keep, practice.",
        examples: [
          { right: "The committee recommended extending the deadline." },
          {
            wrong: "The committee recommended to extend the deadline.",
            right: "The committee recommended extending the deadline.",
          },
        ],
      },
      {
        title: "Gerundio tras preposición",
        body:
          "Después de cualquier preposición (in, on, at, of, for, by, before, after, without, about) va gerundio.",
        examples: [
          { right: "The scientists succeeded in identifying the source." },
          { right: "After conducting the experiments, they published the results." },
          {
            wrong: "The council is opposed to move the monument.",
            right: "The council is opposed to moving the monument.",
            note: "'Opposed to' es preposición: sigue gerundio.",
          },
        ],
      },
      {
        title: "Participio pasado como adjetivo o cláusula reducida",
        body:
          "El participio (-ed regular o forma irregular) puede modificar un sustantivo con sentido pasivo o describir un estado.",
        examples: [
          { right: "Refined during the nineteenth century, the compass replaced older tools." },
          { right: "The Tiffany lamps, first produced in 1899, are famous today." },
          {
            wrong: "Electrons in an atom are hold close to the nucleus.",
            right: "Electrons in an atom are held close to the nucleus.",
            note: "Voz pasiva pide participio pasado: 'held'.",
          },
        ],
      },
      {
        title: "Participio presente (-ing) reducido",
        body:
          "Reemplaza una cláusula relativa activa. 'The team [that is] organizing the exhibition' → 'The team organizing the exhibition'.",
        examples: [
          {
            right:
              "The wind blowing across the plains carries seeds for miles.",
            note: "'blowing' equivale a 'that blows' o 'that is blowing'.",
          },
          {
            right:
              "During the 1850s, reform movements advocating temperance gained strength.",
          },
        ],
      },
      {
        title: "Subjuntivo tras suggest / insist / demand / recommend",
        body:
          "Con verbos y expresiones de sugerencia o exigencia, la cláusula 'that' lleva verbo BASE (sin -s, sin conjugar), incluso en 3.ª persona.",
        examples: [
          { right: "Scientists suggested that the sample be preserved cold." },
          { right: "It is essential that every citizen have the right to vote." },
          {
            wrong: "It is essential that every citizen has the right to vote.",
            right: "It is essential that every citizen have the right to vote.",
          },
        ],
      },
      {
        title: "Condicionales: tres tipos base",
        body:
          "Tipo 1 (real): If + presente, will + base. Tipo 2 (hipotético): If + were / pasado, would + base. Tipo 3 (irreal en pasado): If + had + participio, would have + participio.",
        examples: [
          {
            right:
              "If temperatures continue rising, coastal cities will face flooding.",
            note: "Tipo 1: condición futura probable.",
          },
          {
            right:
              "If gravity were suddenly weaker, objects would drift into the atmosphere.",
            note: "Tipo 2: hipotético. 'Were' para TODAS las personas.",
          },
          {
            right:
              "If Marie had studied harder, she would have won the scholarship.",
            note: "Tipo 3: irreal pasado.",
          },
          {
            wrong:
              "If Jonas would have arrived earlier, he could have finished the project.",
            right:
              "If Jonas had arrived earlier, he could have finished the project.",
            note: "En la cláusula 'if' del tipo 3 va 'had + participio', no 'would have'.",
          },
        ],
      },
    ],
  },
  {
    slug: "parallel-structure",
    title: "Estructura paralela",
    shortDescription: "Listas y comparaciones piden formas paralelas.",
    category: "structure",
    keywords: ["parallel", "list", "comparison"],
    rules: [
      {
        title: "Todos los elementos con la misma forma",
        body:
          "Verbos con verbos (misma forma), gerundios con gerundios, infinitivos con infinitivos, adjetivos con adjetivos.",
        examples: [
          { right: "Ceramics can be harder, lighter, and more resistant." },
          {
            wrong:
              "The workshop taught students to design experiments, to interpret data, and analysis of results.",
            right:
              "The workshop taught students to design experiments, to interpret data, and to analyze results.",
          },
        ],
      },
    ],
  },
];

export function getGuideTopic(slug: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((topic) => topic.slug === slug);
}
