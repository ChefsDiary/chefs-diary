import { TableColumn } from "@/lib/types/common/table";

function getUnitsColumns(canEditOrDelete: boolean): TableColumn[] {
  const columns: TableColumn[] = [
    {
      label: "Název jednotky",
      key: "name",
      allowsSorting: true,
    },
    {
      label: "Patří do skupiny",
      key: "unitGroupNames",
    },
    {
      label: "Základní jednotka ve skupině",
      key: "isBaseUnitInGroup",
    },
  ];

  if (canEditOrDelete) {
    columns.push({
      label: "Akce",
      key: "actions",
      width: 100,
    });
  }

  return columns;
}

export default getUnitsColumns;
