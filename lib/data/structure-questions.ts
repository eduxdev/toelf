import type { StructureQuestion } from "@/lib/types/practice";

/**
 * Structure questions extracted from the TOEFL ITP practice booklet
 * used at TESJo. The `___` marker in `stem` indicates the blank.
 */
export const STRUCTURE_QUESTIONS: StructureQuestion[] = [
  {
    id: "st-01",
    type: "structure",
    number: 1,
    stem: "___ team sports require cooperation.",
    options: [
      { key: "A", label: "Of all" },
      { key: "B", label: "They are all" },
      { key: "C", label: "All" },
      { key: "D", label: "Why are all" },
    ],
    correct: "C",
    explanation:
      "El sujeto debe ser un cuantificador simple: 'All team sports…'. No hay verbo previo que introduzca la cláusula.",
  },
  {
    id: "st-02",
    type: "structure",
    number: 2,
    stem: "Anyone who has ever pulled weeds from a garden ___ roots firmly anchor plants to the soil.",
    options: [
      { key: "A", label: "is well aware of" },
      { key: "B", label: "is well aware that" },
      { key: "C", label: "well aware" },
      { key: "D", label: "well aware that" },
    ],
    correct: "B",
    explanation:
      "Se necesita el verbo 'is' + 'that' para introducir una cláusula sustantiva con sujeto propio ('roots').",
  },
  {
    id: "st-03",
    type: "structure",
    number: 3,
    stem: "Centuries of erosion have exposed ___ rock surfaces in the Painted Desert of northern Arizona.",
    options: [
      { key: "A", label: "in colors of the rainbow" },
      { key: "B", label: "colored like a rainbow" },
      { key: "C", label: "rainbow-colored" },
      { key: "D", label: "a rainbow's coloring" },
    ],
    correct: "C",
    explanation:
      "Se necesita un adjetivo compuesto que modifique al sustantivo 'rock surfaces'.",
  },
  {
    id: "st-04",
    type: "structure",
    number: 4,
    stem: "The higher the temperature of a molecule, ___.",
    options: [
      { key: "A", label: "the more energy it has" },
      { key: "B", label: "than it has more energy" },
      { key: "C", label: "more energy has it" },
      { key: "D", label: "it has more energy" },
    ],
    correct: "A",
    explanation:
      "Comparativo doble: 'The higher…, the more…' con orden sujeto-verbo estándar.",
  },
  {
    id: "st-05",
    type: "structure",
    number: 5,
    stem: "Frontier surgeon Ephraim MacDonald had to perform operations ___ anesthesia.",
    options: [
      { key: "A", label: "no" },
      { key: "B", label: "not having" },
      { key: "C", label: "without" },
      { key: "D", label: "there wasn't" },
    ],
    correct: "C",
    explanation:
      "'Without' es la preposición que introduce la ausencia de algo.",
  },
  {
    id: "st-06",
    type: "structure",
    number: 6,
    stem: "___ young, chimpanzees are easily trained.",
    options: [
      { key: "A", label: "When are" },
      { key: "B", label: "When" },
      { key: "C", label: "They are" },
      { key: "D", label: "When they" },
    ],
    correct: "B",
    explanation:
      "Cláusula adverbial reducida: 'When young' equivale a 'When they are young'.",
  },
  {
    id: "st-07",
    type: "structure",
    number: 7,
    stem: "A person of ___ age may suffer from defects of vision.",
    options: [
      { key: "A", label: "every" },
      { key: "B", label: "some" },
      { key: "C", label: "certain" },
      { key: "D", label: "any" },
    ],
    correct: "D",
    explanation:
      "'Any' funciona con sustantivos singulares no contables como 'age' para expresar generalidad.",
  },
  {
    id: "st-08",
    type: "structure",
    number: 8,
    stem: "___ have settled, one of their first concerns has been to locate an adequate water supply.",
    options: [
      { key: "A", label: "Wherever people" },
      { key: "B", label: "There are people who" },
      { key: "C", label: "Whether people" },
      { key: "D", label: "People" },
    ],
    correct: "A",
    explanation:
      "'Wherever people' introduce cláusula adverbial de lugar que da sentido al enunciado principal.",
  },
  {
    id: "st-09",
    type: "structure",
    number: 9,
    stem: "If a bar magnet is ___, the two pieces form two complete magnets, each with a north and south pole.",
    options: [
      { key: "A", label: "broken" },
      { key: "B", label: "broke" },
      { key: "C", label: "breaking" },
      { key: "D", label: "break" },
    ],
    correct: "A",
    explanation: "Voz pasiva: 'is' + participio pasado ('broken').",
  },
  {
    id: "st-10",
    type: "structure",
    number: 10,
    stem: "The type of plant and animal life living in and around a pond depends on the soil of the pond, ___, and the pond's location.",
    options: [
      { key: "A", label: "what the quality of the water is" },
      { key: "B", label: "how is the water quality" },
      { key: "C", label: "the quality of the water" },
      { key: "D", label: "what is the water quality" },
    ],
    correct: "C",
    explanation:
      "Se necesita una frase nominal paralela a 'the soil of the pond'.",
  },
  {
    id: "st-11",
    type: "structure",
    number: 11,
    stem: "Clifford Holland, ___ civil engineer, was in charge of the construction of the first tunnel under the Hudson River.",
    options: [
      { key: "A", label: "he was a" },
      { key: "B", label: "a" },
      { key: "C", label: "being a" },
      { key: "D", label: "who, as a" },
    ],
    correct: "B",
    explanation:
      "Aposición: se identifica con el artículo indefinido 'a civil engineer'.",
  },
  {
    id: "st-12",
    type: "structure",
    number: 12,
    stem: "In chemistry ___ element is a substance which cannot be broken up into anything simpler by ordinary reactions.",
    options: [
      { key: "A", label: "it is an" },
      { key: "B", label: "that an" },
      { key: "C", label: "an" },
      { key: "D", label: "there is an" },
    ],
    correct: "C",
    explanation:
      "Sujeto simple con artículo indefinido: 'an element is a substance…'.",
  },
  {
    id: "st-13",
    type: "structure",
    number: 13,
    stem: "While they cannot be credited with inventing the rocking chair, the Shakers did more to develop its design and promote its use ___ any other chair makers.",
    options: [
      { key: "A", label: "as did" },
      { key: "B", label: "the most" },
      { key: "C", label: "than" },
      { key: "D", label: "they did" },
    ],
    correct: "C",
    explanation: "Comparativo 'more … than'.",
  },
  {
    id: "st-14",
    type: "structure",
    number: 14,
    stem: "From photography's infancy ___ of landscape views by camera began to supplant handmade depictions in watercolor, pencil, or ink.",
    options: [
      { key: "A", label: "when the capturing" },
      { key: "B", label: "the capturing" },
      { key: "C", label: "was capturing" },
      { key: "D", label: "the capturing was" },
    ],
    correct: "B",
    explanation: "'The capturing' funciona como sujeto del verbo 'began'.",
  },
  {
    id: "st-15",
    type: "structure",
    number: 15,
    stem: "The electron microscope provides researchers a means of ___ objects as small as bacteria or viruses.",
    options: [
      { key: "A", label: "to view" },
      { key: "B", label: "view" },
      { key: "C", label: "it viewed" },
      { key: "D", label: "viewing" },
    ],
    correct: "D",
    explanation:
      "Después de la preposición 'of' se usa gerundio: 'a means of viewing'.",
  },
];
