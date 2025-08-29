import { memo } from 'react';

interface DeleteConfirmationMessageProps {
  groupName?: string;
}

export const DeleteConfirmationMessage = memo<DeleteConfirmationMessageProps>(
  ({ groupName }) => {
    return (
      <p>
        Opravdu chcete smazat skupinu <strong>{groupName}</strong>?
      </p>
    );
  }
);

DeleteConfirmationMessage.displayName = "DeleteConfirmationMessage";
