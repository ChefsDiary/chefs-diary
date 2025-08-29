import { useCallback, useEffect, useState } from "react";

import useIsFirstRender from "@/lib/hooks/useIsFirstRender";

import { UseValidateInputProps, UseValidateInputReturn } from "./types";
import { getErrorMessage, normalizeValue, validateInputField } from "./utils";

export const useValidateInput = <T extends object>({
  initialValue,
  name,
  validationSchema,
  errors,
  onChange,
  onValueChange,
}: UseValidateInputProps<T>): UseValidateInputReturn => {
  const isFirstRender = useIsFirstRender();

  const [localValue, setLocalValue] = useState<string>(
    normalizeValue(initialValue)
  );
  const [localErrorMessage, setLocalErrorMessage] = useState<string>("");

  const validateAndSetError = useCallback(
    (value: string) => {
      if (!name) return;

      const errorMessage = validateInputField(validationSchema, name, value);
      setLocalErrorMessage(errorMessage);
    },
    [validationSchema, name]
  );

  // Handle external errors
  useEffect(() => {
    if (!name) return;

    const errorMessage = getErrorMessage(errors, name);
    setLocalErrorMessage(errorMessage);
  }, [errors, name]);

  // Handle external value changes
  useEffect(() => {
    if (isFirstRender) return;

    const normalizedValue = normalizeValue(initialValue);
    setLocalValue(normalizedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      setLocalValue(newValue);
      validateAndSetError(newValue);
      onChange?.(event);
    },
    [onChange, validateAndSetError]
  );

  const handleValueChange = useCallback(
    (value: string) => {
      setLocalValue(value);
      validateAndSetError(value);
      onValueChange?.(value);
    },
    [onValueChange, validateAndSetError]
  );

  return {
    localValue,
    localErrorMessage,
    handleChange,
    handleValueChange,
    isInvalid: !!localErrorMessage,
  };
};
