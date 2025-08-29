import { ValidationError } from "yup";

import ValidationResultType from "@/lib/types/validation/ValidationResultType";

import ingredientGroupFormValidationSchema, {
  IngredientGroupFormErrorType,
} from "../../schemas/admin/ingredientGroupFormValidationSchema";

type ErrorType = Omit<IngredientGroupFormErrorType, "timestamp" | "general">;

export const validateIngredientGroupForm = (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    ingredientGroupFormValidationSchema.validateSync(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};

export const validateIngredientGroupFormAsync = async (
  formData: Record<string, FormDataEntryValue>
) => {
  const result: ValidationResultType<ErrorType> = { success: true, error: {} };

  try {
    await ingredientGroupFormValidationSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    (error as ValidationError).inner.forEach((err: ValidationError) => {
      const path = err.path as keyof ErrorType;

      if (!result.error[path]) {
        result.error[path] = err.message;
        result.success = false;
      }
    });
  }

  return result;
};
