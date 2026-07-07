import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <AuthShell
      title="Crea tu cuenta"
      description="Empieza a practicar y guarda tu avance en cada sesión."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Inicia sesión
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
