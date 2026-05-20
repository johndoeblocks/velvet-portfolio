"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = isSignUp
      ? await signUp.email({
          name: String(formData.get("name") ?? ""),
          email,
          password,
          callbackURL: "/"
        })
      : await signIn.email({
          email,
          password,
          callbackURL: "/"
        });

    setIsSubmitting(false);

    if (result.error) {
      const message = result.error.status === 403 ? "Confirma o email antes de entrar. Enviámos novo link de verificação." : result.error.message;
      setError(message ?? "Não foi possível autenticar.");
      return;
    }

    if (isSignUp) {
      setNotice("Conta criada. Confirma o email para ativar o acesso ao dashboard.");
      event.currentTarget.reset();
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-md border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">Velvet Neuron Lead Auto</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-normal">{isSignUp ? "Criar conta" : "Entrar"}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {isSignUp ? "Usa email e password. O acesso só fica ativo depois da verificação por email." : "Entra para ver os teus leads, filtros e configuração."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          {isSignUp ? <Input name="name" required placeholder="Nome" autoComplete="name" /> : null}
          <Input name="email" required type="email" placeholder="Email" autoComplete="email" />
          <Input name="password" required type="password" minLength={8} placeholder="Password" autoComplete={isSignUp ? "new-password" : "current-password"} />
          {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}
          {notice ? <p className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">{notice}</p> : null}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "A processar..." : isSignUp ? "Criar conta" : "Entrar"}
          </Button>
        </form>

        <div className="mt-5 border-t pt-4 text-sm text-muted-foreground">
          {isSignUp ? "Já tens conta?" : "Ainda não tens conta?"}{" "}
          <Link className="font-medium text-primary hover:underline" href={isSignUp ? "/sign-in" : "/sign-up"}>
            {isSignUp ? "Entrar" : "Criar conta"}
          </Link>
        </div>
      </section>
    </main>
  );
}
