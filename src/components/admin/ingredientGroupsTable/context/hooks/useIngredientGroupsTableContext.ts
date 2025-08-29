import { useContext } from "react";

import { IngredientGroupsTableContext } from "../context";

export function useIngredientGroupsTableContext() {
  const context = useContext(IngredientGroupsTableContext);

  if (!context) {
    throw new Error(
      "useIngredientGroupsTableContext must be used within a IngredientGroupsTableContextProvider"
    );
  }

  return context;
}
