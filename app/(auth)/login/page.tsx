import Link from "next/link";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Bienvenido de vuelta"
      description="Ingresa para continuar tu preparación TOEFL ITP."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Regístrate
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
