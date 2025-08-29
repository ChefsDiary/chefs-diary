export type TableColumn = {
  key: string;
  label: string;
  align?: "center" | "start" | "end";
  allowsSorting?: boolean;
  width?: number;
};

import { Selection, SortDescriptor } from "@heroui/react";

export type TableSettings = {
  page: number;
  pageSize: number;
  filterValue?: string;
  visibleColumns?: Selection;
  sortDescriptor?: SortDescriptor;
};

export interface TablePaginationState {
  page: number;
  pageSize: number;
}

export interface TablePaginationActions {
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export interface TablePaginationContext {
  state: TablePaginationState;
  actions: TablePaginationActions;
}
