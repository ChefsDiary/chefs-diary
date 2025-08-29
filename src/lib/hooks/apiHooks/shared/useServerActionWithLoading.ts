import { useCallback, useEffect, useState, useTransition } from "react";

import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import addToast from "@/lib/utils/addToast";

export function useServerActionWithLoading<T, P = undefined>(
  serverAction: P extends undefined
    ? () => Promise<ActionResponseDTO<T>>
    : (params: P) => Promise<ActionResponseDTO<T>>,
  params?: P
) {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<T | null>(null);

  const executeAction = useCallback(() => {
    startTransition(async () => {
      try {
        const result =
          params !== undefined
            ? await serverAction(params)
            : await (serverAction as () => Promise<ActionResponseDTO<T>>)();

        if (result.error) {
          const errorMessage = result.error as string;
          addToast("Error", errorMessage, "danger");

          return;
        }

        setData(result.data);
      } catch {
        const errorMessage = "Došlo k neočekávané chybě";

        addToast("Error", errorMessage, "danger");
      }
    });
  }, [serverAction, params]);

  useEffect(() => {
    executeAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = useCallback(() => {
    executeAction();
  }, [executeAction]);

  return {
    isPending,
    data,
    refetch,
  };
}
