import ValidationResultType from "@/lib/types/validation/ValidationResultType";
import { IngredientGroupFormErrorType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";
import { validateIngredientGroupFormAsync } from "@/lib/validations/validations/admin/validateIngredientGroupForm";

export default async function ingredientGroupActionValidator(
  formData: FormData
): Promise<ValidationResultType<IngredientGroupFormErrorType>> {
  const data = Object.fromEntries(formData);
  const validationResult = await validateIngredientGroupFormAsync(data);

  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    error: {},
  } as ValidationResultType<IngredientGroupFormErrorType>;
}
