"use server";

import { redirect } from "next/navigation";

import { signIn } from "@/config/auth/auth";

export const logIn = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // const response = await signIn("credentials", {
  //   email,
  //   password,
  //   redirect: false,
  // });

  // if (response?.ok) redirect("/dashboard");
  // if (response?.error) {
  // }
};
