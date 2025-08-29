import { Key } from "react";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";

type IngredientGroupActions =
  | keyof IngredientGroupWithAssignedIngredientsDTO
  | "actions";

export function IngredientGroupsRenderCell(
  group: IngredientGroupWithAssignedIngredientsDTO,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (group: IngredientGroupWithAssignedIngredientsDTO) => void,
  onDelete: (group: IngredientGroupWithAssignedIngredientsDTO) => void
) {
  const cellValue =
    group[columnKey as keyof IngredientGroupWithAssignedIngredientsDTO];

  switch (columnKey as IngredientGroupActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          hideDetails
          hideEdit={!canEdit}
          editLabel="Editovat skupinu"
          onEdit={() => onEdit(group)}
          hideDelete={!canDelete}
          deleteLabel="Smazat skupinu"
          onDelete={() => onDelete(group)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
