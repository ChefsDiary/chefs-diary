import { memo, ReactNode } from "react";

interface TableTopContentSearchAndFiltersProps {
  children: ReactNode;
  className?: string;
}

const TableTopContentSearchAndFilters = memo(
  ({
    children,
    className = "flex flex-col sm:flex-row gap-2 sm:gap-4",
  }: TableTopContentSearchAndFiltersProps) => {
    return <div className={className}>{children}</div>;
  }
);

TableTopContentSearchAndFilters.displayName = "TableTopContentSearchAndFilters";
