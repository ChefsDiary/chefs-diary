import { Key } from "react";
import { IoIosAddCircle } from "react-icons/io";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";

type WithActionsActions = keyof UnitWithGroupInfoSummaryDTO | "actions";

export function unitsRenderCell(
  unit: UnitWithGroupInfoSummaryDTO,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onDetails: (unit: UnitWithGroupInfoSummaryDTO) => void,
  onEdit: (unit: UnitWithGroupInfoSummaryDTO) => void,
  onDelete: (unit: UnitWithGroupInfoSummaryDTO) => void
) {
  const cellValue = unit[columnKey as keyof UnitWithGroupInfoSummaryDTO];

  switch (columnKey as WithActionsActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          detailsIcon={IoIosAddCircle}
          hideDetails={!canEdit}
          detailsLabel="Přidat jednotku ke skupině"
          onDetails={() => onDetails(unit)}
          hideEdit={!canEdit}
          editLabel="Editovat jednotku"
          onEdit={() => onEdit(unit)}
          hideDelete={!canDelete}
          deleteLabel="Smazat jednotku"
          onDelete={() => onDelete(unit)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
