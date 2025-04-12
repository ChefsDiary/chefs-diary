import { HTMLAttributes, useRef } from "react";

import { mergeStyles } from "@/lib/utils/styles";

import PasswordInput from "../passwordInput/PasswordInput";

type Props = HTMLAttributes<Omit<HTMLDivElement, "children">> & {};

export default function ConfirmPassword({ className, ...restProps }: Props) {
  const refPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  return (
    <div
      className={mergeStyles("flex flex-col items-center w-full", className)}
      {...restProps}
    >
      <PasswordInput
        ref={refPassword}
        name="password"
        label="Heslo"
        required
        className="mb-4"
        // error={false}
        // helperText={""}
        autoComplete="current-password"
        variant="faded"
        color="primary"
      />
      <PasswordInput
        ref={refConfirmPassword}
        name="confirmPassword"
        label="Potvrdit heslo"
        required
        className="mb-4"
        // error={false}
        // helperText={""}
        autoComplete="new-password"
        variant="faded"
        color="primary"
      />
    </div>
  );
}
