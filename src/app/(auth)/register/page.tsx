import { Metadata } from "next";

import RegisterForm from "./_registerForm/RegisterForm";

export const metadata: Metadata = {
  title: "Registrace",
  description:
    "Zaregistruj se pomocí svého e-mailu a osobních údajů, abys mohl začít!",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
