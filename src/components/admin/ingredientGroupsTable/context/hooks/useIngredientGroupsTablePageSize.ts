import { useIngredientGroupsTableContext } from "./useIngredientGroupsTableContext";

export function useIngredientGroupsTablePageSize() {
  const { state, actions } = useIngredientGroupsTableContext();

  return {
    pageSize: state.pageSize,
    setPageSize: actions.setPageSize,
  } as const;
}
