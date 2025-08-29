import { useIngredientGroupsTableContext } from "./useIngredientGroupsTableContext";

export function useIngredientGroupsTablePage() {
  const { state, actions } = useIngredientGroupsTableContext();

  return {
    page: state.page,
    setPage: actions.setPage,
  } as const;
}
