import { Dispatch, SetStateAction } from 'react';

import {
    SetOptimisticIngredientGroupType
} from '@/components/admin/ingredientGroupsTable/IngredientGroupsTable';
import {
    IngredientGroupWithAssignedIngredientsDTO
} from '@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO';

export interface DeleteIngredientGroupModalProps {
  group: IngredientGroupWithAssignedIngredientsDTO;
  isOpen: boolean;
  onOpenChange: () => void;
  setOptimisticIngredientGroup: (
    action: SetOptimisticIngredientGroupType
  ) => void;
  setGroupToDelete: Dispatch<
    SetStateAction<IngredientGroupWithAssignedIngredientsDTO | null>
  >;
  refetch: () => void;
}
