import React from "react";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import ingredientGroupFormValidationSchema, {
  IngredientGroupFormErrorType,
  IngredientGroupFormType,
} from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

interface IngredientGroupFormFieldProps {
  errors: IngredientGroupFormErrorType;
}

export const IngredientGroupFormField: React.FC<
  IngredientGroupFormFieldProps
> = ({ errors }) => (
  <ValidateInput
    name={nameof<IngredientGroupFormType>("name")}
    label="Název skupiny ingrediencí"
    className="mb-4"
    required
    autoFocus
    errors={errors}
    autoComplete="off"
    fullWidth
    variant="faded"
    color="primary"
    validationSchema={ingredientGroupFormValidationSchema}
    endContent={
      <MdOutlineDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
    }
  />
);
