import { useCallback, useTransition } from 'react';

import { deleteIngredientGroupAction } from '@/actions/admin/ingredients';
import addToast from '@/lib/utils/addToast';

import { DeleteIngredientGroupModalProps } from '../types/deleteIngredientGroupModal';

export const useDeleteIngredientGroup = ({
  group,
  setOptimisticIngredientGroup,
  setGroupToDelete,
  refetch,
  onOpenChange,
}: Pick<
  DeleteIngredientGroupModalProps,
  | "group"
  | "setOptimisticIngredientGroup"
  | "setGroupToDelete"
  | "refetch"
  | "onOpenChange"
>) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = useCallback(async () => {
    setOptimisticIngredientGroup({
      type: "delete",
      ingredientGroup: { ...group },
    });

    startTransition(async () => {
      try {
        const result = await deleteIngredientGroupAction(
          group.idIngredientGroup
        );

        if (!result.success) {
          addToast("Chyba", result.error as string, "danger");
          return;
        }

        addToast("Úspěch", "Skupina jednotek byla úspěšně smazána", "success");
        refetch();
        onOpenChange();
      } catch {
        addToast("Chyba", "Došlo k neočekávané chybě", "danger");
      }
    });
  }, [group, setOptimisticIngredientGroup, refetch, onOpenChange]);

  const handleClose = useCallback(() => {
    setGroupToDelete(null);
    onOpenChange();
  }, [setGroupToDelete, onOpenChange]);

  return {
    isPending,
    handleDelete,
    handleClose,
  };
};
