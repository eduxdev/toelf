import type { SectionMeta } from "@/lib/types/practice";

export const SECTIONS: SectionMeta[] = [
  {
    id: "structure",
    name: "Structure",
    shortDescription: "Completa la oración",
    longDescription:
      "Elige la palabra o frase que mejor completa cada oración. Practica gramática, sintaxis y estructuras comunes del TOEFL ITP.",
    timeLimitMinutes: 15,
    questionCount: 15,
    instructionKey: "structure",
  },
  {
    id: "written-expression",
    name: "Written Expression",
    shortDescription: "Identifica el error",
    longDescription:
      "Localiza la palabra o frase subrayada que debe cambiarse para que la oración sea correcta. Enfócate en concordancia, forma verbal y estructura paralela.",
    timeLimitMinutes: 10,
    questionCount: 25,
    instructionKey: "written-expression",
  },
];

export function getSection(id: string): SectionMeta | undefined {
  return SECTIONS.find((section) => section.id === id);
}
