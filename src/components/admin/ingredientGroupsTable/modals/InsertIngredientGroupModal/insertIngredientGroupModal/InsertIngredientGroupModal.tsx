import { useTransition } from "react";

import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";

import { SetOptimisticIngredientGroupType } from "../../../IngredientGroupsTable";
import InsertIngredientGroupModalContent from "../insertIngredientGroupModalContent/InsertIngredientGroupModalContent";
import { useInsertIngredientGroupModal } from "./hooks/useInsertIngredientGroupModal";

interface InsertIngredientGroupModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  refetch: () => void;
}

export function InsertIngredientGroupModal({
  isOpen,
  onOpenChange,
  setOptimisticIngredientGroup,
  refetch,
}: InsertIngredientGroupModalProps) {
  const [isPending, startTransition] = useTransition();

  const { error, handleSubmit, handleClose, handleInsertAction } =
    useInsertIngredientGroupModal({
      onOpenChange,
      setOptimisticIngredientGroup,
      refetch,
      startTransition,
    });

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      headerLabel="Přidat skupinu ingrediencí"
      hideFooter
      isDismissable={false}
    >
      <InsertIngredientGroupModalContent
        onCancel={handleClose}
        action={handleInsertAction}
        onSubmit={handleSubmit}
        errors={error}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
