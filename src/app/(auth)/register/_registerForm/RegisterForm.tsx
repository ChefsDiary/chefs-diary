"use client";

import { useEffect, useRef } from "react";

import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { Checkbox, Input } from "@heroui/react";

export default function RegisterForm() {
  // References
  const refLogin = useRef<HTMLInputElement>(null);
  //   const refErrorMessage = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace</FormHeading>

        <Form className="flex flex-col items-center" noValidate>
          <Input
            ref={refLogin}
            name="login"
            label="Uživatelské jméno"
            className="mb-4"
            required
            // error={false}
            // helperText={""}
            autoComplete="off"
            fullWidth
            variant="faded"
            color="primary"
          />

          <Input
            name="email"
            label="Email"
            type="email"
            className="mb-4"
            required
            // error={false}
            // helperText={""}
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
          />

          <ConfirmPassword className="mb-4" />

          <Checkbox name="termsAgreement" className="mb-4">
            Souhlasím s podmínkami použití a ochranou osobních údajů
          </Checkbox>

          <SubmitButton fullWidth color="primary">
            Registrovat
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
