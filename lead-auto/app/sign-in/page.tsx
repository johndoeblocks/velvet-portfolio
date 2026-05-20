import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentSession } from "@/lib/session";

export default async function SignInPage() {
  const session = await getCurrentSession();
  if (session) redirect("/");

  return <AuthForm mode="sign-in" />;
}
