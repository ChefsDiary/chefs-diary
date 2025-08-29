import { useState } from "react";

import { IngredientGroupFormErrorType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";
import { validateIngredientGroupForm } from "@/lib/validations/validations/admin/validateIngredientGroupForm";

export default function useInsertIngredientGroupValidation() {
  const [error, setError] = useState<IngredientGroupFormErrorType>({});

  const validate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateIngredientGroupForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setError({ ...validationResult.error, timestamp: Date.now().toString() });
      return false;
    }

    setError({});
    return true;
  };

  return { error, setError, validate };
}
