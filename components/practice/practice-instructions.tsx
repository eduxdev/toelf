import { Info } from "@phosphor-icons/react/dist/ssr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PracticeInstructionsProps {
  instructionKey:
    | "structure"
    | "written-expression"
    | "grammar-focus"
    | "verb-tenses"
    | "review";
}

const COPY = {
  structure: {
    title: "Section 1 · Structure",
    body: "Elige la palabra o frase que mejor completa la oración. Solo una respuesta es correcta.",
  },
  "written-expression": {
    title: "Section 2 · Written Expression",
    body: "Cada oración tiene cuatro palabras o frases subrayadas (A, B, C, D). Identifica la que debe cambiarse para que la oración sea correcta.",
  },
  "grammar-focus": {
    title: "Fundamentos · Identifica cada pieza",
    body: "Lee la instrucción de cada pregunta (Encuentra el sujeto/verbo/conector/etc.) y toca la opción correcta entre las cuatro subrayadas.",
  },
  "verb-tenses": {
    title: "Tiempos y verbos",
    body: "Cada oración enfoca un tiempo verbal, modo, voz o forma no personal. Elige la forma que mejor completa la oración.",
  },
  review: {
    title: "Repaso de tus errores",
    body: "Estas son preguntas que has fallado o dejado en blanco antes. Prioriza las que aparecen primero — son en las que menos aciertos llevas.",
  },
} as const;

export function PracticeInstructions({
  instructionKey,
}: PracticeInstructionsProps) {
  const copy = COPY[instructionKey];
  return (
    <Alert>
      <Info />
      <AlertTitle className="font-heading">{copy.title}</AlertTitle>
      <AlertDescription>{copy.body}</AlertDescription>
    </Alert>
  );
}
