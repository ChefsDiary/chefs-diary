import { IngredientGroupFormErrorType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

export interface InsertIngredientGroupModalContentProps {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientGroupFormErrorType;
  isPending?: boolean;
}
