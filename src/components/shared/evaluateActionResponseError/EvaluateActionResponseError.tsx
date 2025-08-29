import { useEffect, useRef } from "react";

import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import addToast from "@/lib/utils/addToast";

type Props<T> = {
  data: ActionResponseDTO<T>;
};

export default function EvaluateActionResponseError<T>({ data }: Props<T>) {
  const lastShownTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      !data.success &&
      typeof data.error === "string" &&
      lastShownTimeRef.current !== data.timeStamp
    ) {
      addToast("Chyba", data.error, "danger");
      lastShownTimeRef.current = data.timeStamp;
    }
  }, [data.success, data.error, data.timeStamp]);

  return null;
}
