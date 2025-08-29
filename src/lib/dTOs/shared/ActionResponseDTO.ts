export type ActionResponseDTO<T> = {
  data: T | null;
  success: boolean;
  error?: string | { [key: string]: string };
  timeStamp: number;
};
