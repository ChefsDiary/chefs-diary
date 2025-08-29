import { memo } from 'react';

import Button from '@/components/shared/button/Button';
import SubmitButton from '@/components/shared/submitButton/SubmitButton';

interface DeleteModalActionsProps {
  onCancel: () => void;
  isPending: boolean;
}

export const DeleteModalActions = memo<DeleteModalActionsProps>(
  ({ onCancel, isPending }) => {
    return (
      <div className="flex py-2 px-1 justify-between">
        <Button color="success" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <SubmitButton color="danger" disabled={isPending} isLoading={isPending}>
          Smazat
        </SubmitButton>
      </div>
    );
  }
);

DeleteModalActions.displayName = "DeleteModalActions";
