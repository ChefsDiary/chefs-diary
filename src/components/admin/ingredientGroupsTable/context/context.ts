import { createContext } from "react";

import { IngredientGroupsTableContextValue } from "./types";

export const IngredientGroupsTableContext =
  createContext<IngredientGroupsTableContextValue | null>(null);
