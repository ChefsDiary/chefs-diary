import { memo } from "react";

import { Pagination } from "@heroui/react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const TablePagination = memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
    className,
  }: TablePaginationProps) => {
    if (totalPages <= 1) return null;

    return (
      <Pagination
        page={currentPage}
        total={totalPages}
        onChange={onPageChange}
        className={className}
      />
    );
  }
);

TablePagination.displayName = "TablePagination";

export default TablePagination;
