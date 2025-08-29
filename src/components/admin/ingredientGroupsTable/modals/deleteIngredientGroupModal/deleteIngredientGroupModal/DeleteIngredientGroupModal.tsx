import CancelConfirmModal from '@/components/shared/cancelConfirmModal/CancelConfirmModal';

import DeleteIngredientGroupModalContent from '../deleteIngredientGroupModalContent/DeleteIngredientGroupModalContent';
import { useDeleteIngredientGroup } from './hooks/useDeleteIngredientGroup';
import { DeleteIngredientGroupModalProps } from './types/deleteIngredientGroupModal';

export default function DeleteIngredientGroupModal({
  group,
  isOpen,
  onOpenChange,
  setOptimisticIngredientGroup,
  setGroupToDelete,
  refetch,
}: DeleteIngredientGroupModalProps) {
  const { isPending, handleDelete, handleClose } = useDeleteIngredientGroup({
    group,
    setOptimisticIngredientGroup,
    setGroupToDelete,
    refetch,
    onOpenChange,
  });

  return (
    <CancelConfirmModal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      headerLabel="Smazat skupinu jednotek"
      hideFooter
      isDismissable={false}
    >
      <DeleteIngredientGroupModalContent
        group={group}
        onCancel={handleClose}
        action={handleDelete}
        isPending={isPending}
      />
    </CancelConfirmModal>
  );
}
