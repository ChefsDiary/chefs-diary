import { Ingredient, IngredientGroup } from "@prisma/client";

export type IngredientGroupWithAssignedIngredientsDTO = IngredientGroup & {
  ingredient: Pick<Ingredient, "idIngredient" | "name">[];
};
