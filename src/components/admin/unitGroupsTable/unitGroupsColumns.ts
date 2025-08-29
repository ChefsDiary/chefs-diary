import { TableColumn } from "@/lib/types/common/table";

function getUnitGroupsColumns(canEditOrDelete: boolean): TableColumn[] {
  const columns: TableColumn[] = [
    {
      label: "Název skupiny",
      key: "name",
      allowsSorting: true,
    },
    {
      label: "Základní jednotka",
      key: "baseUnitName",
      allowsSorting: true,
    },
    {
      label: "Jednotky přiřazené ke skupině",
      key: "unitNames",
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

export default getUnitGroupsColumns;
