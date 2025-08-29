import { TableColumn } from "@/lib/types/common/table";

function getIngredientGroupsColumns(canEditOrDelete: boolean): TableColumn[] {
  const columns: TableColumn[] = [
    {
      label: "Název skupiny",
      key: "name",
      allowsSorting: true,
    },
    {
      label: "Ingredience přiřazené ke skupině",
      key: "ingredientNames",
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

export default getIngredientGroupsColumns;
