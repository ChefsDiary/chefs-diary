import { Dispatch, SetStateAction, useTransition } from "react";

import { updateIngredientGroupAction } from "@/actions/admin/ingredients";
import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { IngredientGroupFormType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";

import { SetOptimisticIngredientGroupType } from "../../IngredientGroupsTable";
import EditUnitGroupModalContent from "./EditIngredientGroupModalContent";
import useEditIngredientGroupValidation from "./useEditIngredientGroupValidation";

type Props = {
  group: IngredientGroupWithAssignedIngredientsDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  setGroupToEdit: Dispatch<
    SetStateAction<IngredientGroupWithAssignedIngredientsDTO | null>
  >;
  refetch: () => void;
};

export default function EditIngredientGroupModal({
  group,
  isOpen,
  onOpenChange,
  setOptimisticIngredientGroup,
  setGroupToEdit,
  refetch,
}: Props) {
  // Validations
  const { error, setError, validate } = useEditIngredientGroupValidation();

  // Handlers
  const handleSubmitEditGroup = (event: React.FormEvent<HTMLFormElement>) => {
    validate(event);
  };

  const handleCloseEditGroup = () => {
    setGroupToEdit(null);
    setError({});
    onOpenChange();
  };

  // Optimistic update
  const [isPending, startTransition] = useTransition();

  const handleEditIngredientGroupAction = async (formData: FormData) => {
    setOptimisticIngredientGroup({
      type: "update",
      ingredientGroup: {
        idIngredientGroup: group.idIngredientGroup,
        name: formData.get(nameof<IngredientGroupFormType>("name")) as string,
        ingredient: group.ingredient,
      },
    });

    startTransition(async () => {
      const ingredientGroup = await updateIngredientGroupAction(
        group.idIngredientGroup,
        formData
      );

      if (!ingredientGroup.success) {
        if (typeof ingredientGroup.error === "object") {
          setError(ingredientGroup.error);
          return;
        }

        addToast("Chyba", ingredientGroup.error as string, "danger");
      } else {
        addToast("Úspěch", "Skupina jednotek byla úspěšně upravena", "success");

        refetch();
        onOpenChange();
      }
    });
  };

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleCloseEditGroup}
      headerLabel="Upravit skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <EditUnitGroupModalContent
        group={group}
        onCancel={handleCloseEditGroup}
        action={handleEditIngredientGroupAction}
        onSubmit={handleSubmitEditGroup}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
