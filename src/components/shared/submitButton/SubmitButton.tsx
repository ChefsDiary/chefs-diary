import { useFormStatus } from "react-dom";

import { mergeStyles } from "@/lib/utils/styles";
import { ButtonProps } from "@heroui/react";

import Button from "../button/Button";

type Props = Omit<ButtonProps, "type" | "isLoading"> & {
  disableLoadingState?: boolean;
};

export default function SubmitButton({
  children,
  disableLoadingState,
  className,
  disabled,
  ...restProps
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={mergeStyles("submit-button", className)}
      disabled={pending || disabled}
      isLoading={!disableLoadingState && pending}
      {...restProps}
    >
      {children}
    </Button>
  );
}
