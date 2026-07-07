import { PageHeader } from "@/components/shared/page-header";
import { SectionsGrid } from "@/components/home/sections-grid";

export default function PracticePage() {
  return (
    <>
      <PageHeader
        eyebrow="Practicar"
        title="Elige la sección con la que quieres empezar"
        description="Cada sesión se guarda en tu perfil con puntaje, tiempo y detalle por pregunta."
      />
      <SectionsGrid />
    </>
  );
}
