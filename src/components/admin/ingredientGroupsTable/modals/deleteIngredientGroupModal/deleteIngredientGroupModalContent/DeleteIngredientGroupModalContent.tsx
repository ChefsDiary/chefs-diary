import Form from '@/components/shared/form/Form';

import { DeleteConfirmationMessage } from './components/DeleteConfirmationMessage';
import { DeleteModalActions } from './components/DeleteModalActions';
import { DeleteIngredientGroupModalContentProps } from './types/deleteIngredientGroupModalContent';

export default function DeleteIngredientGroupModalContent({
  group,
  onCancel,
  action,
  isPending,
}: DeleteIngredientGroupModalContentProps) {
  return (
    <Form action={action} className="flex flex-col gap-5" noValidate>
      <DeleteConfirmationMessage groupName={group.name} />
      <DeleteModalActions onCancel={onCancel} isPending={isPending ?? false} />
    </Form>
  );
}
