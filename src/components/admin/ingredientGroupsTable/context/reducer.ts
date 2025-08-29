import { SortDescriptor } from "@heroui/react";

import {
  IngredientGroupsTableActions,
  IngredientGroupsTableState,
} from "./types";

export function ingredientGroupsTableReducer(
  state: IngredientGroupsTableState,
  action: IngredientGroupsTableActions
): IngredientGroupsTableState {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_SORT_DESCRIPTOR":
      return { ...state, sortDescriptor: action.payload };
    case "LOAD_SETTINGS":
      return {
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        sortDescriptor: action.payload.sortDescriptor as SortDescriptor,
      };
    default:
      return state;
  }
}
