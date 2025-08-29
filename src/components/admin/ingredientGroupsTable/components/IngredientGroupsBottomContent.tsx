import { memo } from "react";

import TableBottomContent from "@/components/shared/table/bottomContent/TableBottomContent";

import { useIngredientGroupsTableContext } from "../context/hooks/useIngredientGroupsTableContext";

interface IngredientGroupsBottomContentProps {
  pages: number;
  totalGroups: number;
}

const IngredientGroupsBottomContent = memo(
  ({ pages, totalGroups }: IngredientGroupsBottomContentProps) => {
    const { state, actions } = useIngredientGroupsTableContext();

    return (
      <TableBottomContent
        currentPage={state.page}
        totalPages={pages}
        onPageChange={actions.setPage}
        pageSize={state.pageSize}
        onPageSizeChange={actions.setPageSize}
        totalRecords={totalGroups}
        recordLabels={{
          singular: "skupina",
          plural: "skupin",
          few: "skupiny",
        }}
      />
    );
  }
);

IngredientGroupsBottomContent.displayName = "IngredientGroupsBottomContent";

export default IngredientGroupsBottomContent;
