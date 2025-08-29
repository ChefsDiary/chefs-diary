import { memo, ReactNode } from "react";

interface TableActionsProps {
  children: ReactNode;
  className?: string;
  justify?: "start" | "center" | "end" | "between";
}

const TableTopContentActions = memo(
  ({ children, className, justify = "end" }: TableActionsProps) => {
    const justifyClass = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    }[justify];

    return (
      <div className={`flex ${justifyClass} ${className || ""}`}>
        {children}
      </div>
    );
  }
);

TableTopContentActions.displayName = "TableTopContentActions";

export default TableTopContentActions;
