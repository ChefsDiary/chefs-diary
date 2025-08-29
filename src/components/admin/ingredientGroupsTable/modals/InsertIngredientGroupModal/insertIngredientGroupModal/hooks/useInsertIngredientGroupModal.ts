import { TransitionStartFunction } from "react";

import { insertIngredientGroupAction } from "@/actions/admin/ingredients";
import { SetOptimisticIngredientGroupType } from "@/components/admin/ingredientGroupsTable/IngredientGroupsTable";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { IngredientGroupFormType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

import useInsertIngredientGroupValidation from "./useInsertIngredientGroupValidation";

interface UseInsertIngredientGroupModalProps {
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  refetch: () => void;
  startTransition: TransitionStartFunction;
}

export function useInsertIngredientGroupModal({
  onOpenChange,
  setOptimisticIngredientGroup,
  refetch,
  startTransition,
}: UseInsertIngredientGroupModalProps) {
  const { error, setError, validate } = useInsertIngredientGroupValidation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleClose = () => {
    setError({});
    onOpenChange();
  };

  const handleInsertAction = async (formData: FormData) => {
    const optimisticIngredientGroup = {
      idIngredientGroup: Math.random(),
      name: formData.get(nameof<IngredientGroupFormType>("name")) as string,
      ingredient: [],
    };

    setOptimisticIngredientGroup({
      type: "add",
      ingredientGroup: optimisticIngredientGroup,
    });

    startTransition(async () => {
      try {
        const result = await insertIngredientGroupAction(formData);

        if (!result.success) {
          if (typeof result.error === "object") {
            setError(result.error);
            return;
          }

          addToast("Chyba", result.error as string, "danger");
          return;
        }

        addToast(
          "Úspěch",
          "Skupina ingrediencí byla úspěšně přidána",
          "success"
        );
        refetch();
        onOpenChange();
      } catch (error) {
        addToast("Chyba", "Došlo k neočekávané chybě", "danger");
        console.error("Insert ingredient group error:", error);
      }
    });
  };

  return {
    error,
    handleSubmit,
    handleClose,
    handleInsertAction,
  };
}
