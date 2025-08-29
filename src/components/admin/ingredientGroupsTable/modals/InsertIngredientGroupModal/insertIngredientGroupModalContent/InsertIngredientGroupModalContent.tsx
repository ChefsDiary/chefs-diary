import React from "react";

import Form from "@/components/shared/form/Form";
import { IngredientGroupFormErrorType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

import { IngredientGroupActionButtons } from "./components/IngredientGroupActionButtonsProps";
import { IngredientGroupFormField } from "./components/IngredientGroupFormField";

interface InsertIngredientGroupModalContentProps {
  onCancel: () => void;
  action: (formData: FormData) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: IngredientGroupFormErrorType;
  isPending?: boolean;
}

export const InsertIngredientGroupModalContent: React.FC<
  InsertIngredientGroupModalContentProps
> = ({ onCancel, action, onSubmit, errors, isPending = false }) => {
  return (
    <Form
      action={action}
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      <div>
        <IngredientGroupFormField errors={errors} />
      </div>

      <IngredientGroupActionButtons onCancel={onCancel} isPending={isPending} />
    </Form>
  );
};

export default InsertIngredientGroupModalContent;
