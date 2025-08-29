import { Selection, SortDescriptor } from "@heroui/react";

import { TableColumn } from "../types/common/table";

/**
 * Get visible columns
 * @param visibleColumns
 * @param columns
 * @returns {TableColumn[]}
 */
export function getVisibleColumns(
  visibleColumns: Selection,
  columns: TableColumn[]
): TableColumn[] {
  if (visibleColumns === "all") return columns;

  return columns.filter((column) =>
    Array.from(visibleColumns).includes(column.key)
  );
}

/**
 * Gets pages
 * @param totalCount
 * @param pageSize
 * @returns
 */
export function getPages(totalCount: number, pageSize: number): number {
  return Math.ceil((totalCount || 0) / pageSize);
}

/**
 * Get page items
 * @param items Items
 * @param page Page number
 * @param pageSize Page size
 * @returns {T[]}
 */
export function getPageItems<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return items.slice(start, end);
}

/**
 * Gets sorted items
 * @param items Items
 * @param sortDescriptor Sort descriptor
 * @returns {T[]}
 */
export function getSortedItems<T>(
  items: T[],
  sortDescriptor: SortDescriptor
): T[] {
  return [...items].sort((a: T, b: T) => {
    const first = a[sortDescriptor.column as keyof T] as number;
    const second = b[sortDescriptor.column as keyof T] as number;
    const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor.direction === "descending" ? -cmp : cmp;
  });
}
