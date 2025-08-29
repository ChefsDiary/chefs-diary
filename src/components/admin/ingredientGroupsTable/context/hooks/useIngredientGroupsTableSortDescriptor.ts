import { useIngredientGroupsTableContext } from "./useIngredientGroupsTableContext";

export function useIngredientGroupsTableSortDescriptor() {
  const { state, actions } = useIngredientGroupsTableContext();

  return {
    sortDescriptor: state.sortDescriptor,
    setSortDescriptor: actions.setSortDescriptor,
  } as const;
}
