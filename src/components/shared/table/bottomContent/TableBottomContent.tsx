import { memo, useCallback } from "react";

import RecordsCount from "@/components/shared/table/bottomContent/RecordCount";
import TablePagination from "@/components/shared/table/bottomContent/TablePagination";
import { mergeStyles } from "@/lib/utils/styles";

import PageSizeSelector from "./PageSizeSelector";

interface TableBottomContentProps {
  // Pagination
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  // Page size
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];

  // Records count
  totalRecords: number;
  recordLabels?: {
    singular: string;
    plural: string;
    few: string;
  };

  // Customization
  className?: string;
  showRecordsCount?: boolean;
  showPageSizeSelector?: boolean;
  pageSizeLabel?: string;
}

const TableBottomContent = memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
    pageSize,
    onPageSizeChange,
    pageSizeOptions = [10, 15, 25, 50],
    totalRecords,
    recordLabels = {
      singular: "záznam",
      plural: "záznamů",
      few: "záznamy",
    },
    className,
    showRecordsCount = true,
    showPageSizeSelector = true,
    pageSizeLabel = "Záznamů na stránku:",
  }: TableBottomContentProps) => {
    const handlePageSizeChange = useCallback(
      (newPageSize: number) => {
        onPageSizeChange(newPageSize);
        onPageChange(1); // Reset to first page when changing page size
      },
      [onPageSizeChange, onPageChange]
    );

    return (
      <div
        className={mergeStyles(
          "py-2 px-2 flex justify-between items-center",
          className
        )}
      >
        {showRecordsCount && (
          <RecordsCount
            total={totalRecords}
            singularLabel={recordLabels.singular}
            pluralLabel={recordLabels.plural}
            fewLabel={recordLabels.few}
          />
        )}

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {showPageSizeSelector && (
          <PageSizeSelector
            value={pageSize}
            options={pageSizeOptions}
            onChange={handlePageSizeChange}
            label={pageSizeLabel}
          />
        )}
      </div>
    );
  }
);

TableBottomContent.displayName = "TableBottomContent";

export default TableBottomContent;
