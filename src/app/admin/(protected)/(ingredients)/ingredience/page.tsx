import { getIngredientUnitGroupWithAssignedIngredientsAction } from "@/actions/admin/ingredients";
import IngredientGroupsTable from "@/components/admin/ingredientGroupsTable/IngredientGroupsTable";
import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import { UnitsTableContextProvider } from "@/components/admin/unitsTable/UnitsTableContext";

export default function IngredientGroupsPage() {
  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <IngredientGroupsTable
          serverAction={getIngredientUnitGroupWithAssignedIngredientsAction}
        />
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}
