import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth/auth";

import LoginForm from "./_loginForm/LoginForm";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

export default async function LoginPage() {
  // TODO: Mělo by mě to přesměrovat tam, kam jsem chtěl jít. POdle původní aplikace
  const session = await auth();
  if (session) redirect("");

  return <LoginForm />;
}
