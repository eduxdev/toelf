import { PageHeader } from "@/components/shared/page-header";
import { ProfileView } from "@/components/profile/profile-view";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Perfil"
        title="Tu progreso al TOEFL ITP"
        description="Estadísticas por sección, historial de intentos y puntajes."
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <ProfileView />
      </div>
    </>
  );
}
