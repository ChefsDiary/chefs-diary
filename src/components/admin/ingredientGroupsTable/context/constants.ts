import { TableSettings } from "@/lib/types/common/table";

export const DEFAULT_SETTINGS: TableSettings = {
  page: 1,
  pageSize: 10,
  sortDescriptor: { column: "", direction: "ascending" },
} as const;
