import { Info } from "@phosphor-icons/react/dist/ssr";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PracticeInstructionsProps {
  instructionKey: "structure" | "written-expression";
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
