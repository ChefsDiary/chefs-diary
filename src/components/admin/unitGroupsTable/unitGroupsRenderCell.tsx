import { Key } from "react";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { UnitGroupSummaries } from "@/lib/dTOs/admin/UnitGroupSummariesDTO";

type UnitGroupActions = keyof UnitGroupSummaries | "actions";

export function unitGroupsRenderCell(
  group: UnitGroupSummaries,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (group: UnitGroupSummaries) => void,
  onDelete: (group: UnitGroupSummaries) => void
) {
  const cellValue = group[columnKey as keyof UnitGroupSummaries];

  switch (columnKey as UnitGroupActions) {
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
