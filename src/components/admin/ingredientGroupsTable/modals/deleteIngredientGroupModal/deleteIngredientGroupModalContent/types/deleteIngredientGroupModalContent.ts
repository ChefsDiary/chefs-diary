import {
    IngredientGroupWithAssignedIngredientsDTO
} from '@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO';

export interface DeleteIngredientGroupModalContentProps {
  group: IngredientGroupWithAssignedIngredientsDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
}
