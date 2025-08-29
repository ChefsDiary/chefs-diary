import { memo, ReactNode } from "react";

interface TableTopContentProps {
  children?: ReactNode;
  className?: string;
}

const TableTopContent = memo(
  ({ children, className = "flex flex-col gap-4" }: TableTopContentProps) => {
    return <div className={className}>{children}</div>;
  }
);

TableTopContent.displayName = "TableTopContent";

export default TableTopContent;
