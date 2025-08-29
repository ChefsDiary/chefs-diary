import { IngredientGroup } from "@prisma/client";

import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import AdminLogActionTypeEnum from "../enums/AdminLogActionTypeEnum";
import AdminLogEntityTypeEnum from "../enums/AdminLogEntityTypeEnum";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import { ingredientRepository } from "../repositories/ingredientRepository";
import { logAdminAction } from "./adminLogService";

/**
 * Retrieves all ingredient groups with their assigned ingredients.
 *
 * @returns {Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>}
 *          Paginated list of ingredient groups with assigned ingredients and total count.
 */
export async function getIngredientUnitGroupWithAssignedIngredients(): Promise<
  PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>
> {
  return await ingredientRepository.getIngredientUnitGroupWithAssignedIngredients();
}

/**
 * Attempts to insert a new unit group with the given name.
 * Throws a ConflictError if a unit group with the same name already exists.
 *
 * @param name - The name of the unit group to insert.
 * @returns {Promise<UnitGroup>}
 * @throws {ConflictError} If a unit group with the same name already exists.
 */
export async function attemptInsertIngredientGroup(
  name: string
): Promise<IngredientGroup> {
  const unitGroup = await ingredientRepository.getIngredientGroupByName(name);

  if (unitGroup) {
    throw new ConflictError();
  }

  const insertedIngredientGroup =
    await ingredientRepository.insertIngredientGroup(name);

  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    insertedIngredientGroup.idIngredientGroup,
    { name }
  );

  return insertedIngredientGroup;
}

export async function attemptEditIngredientGroup(
  idIngredientGroup: number,
  name: string
): Promise<void> {
  let ingredientGroup = await ingredientRepository.getIngredientGroupById(
    idIngredientGroup
  );

  if (!ingredientGroup) {
    throw new NotFoundError();
  }

  ingredientGroup = await ingredientRepository.getIngredientGroupByName(name);

  if (ingredientGroup) {
    throw new ConflictError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.INGREDIENT_GROUP,
    idIngredientGroup,
    { name }
  );

  await ingredientRepository.updateIngredientGroup(idIngredientGroup, name);
}

export async function attemptDeleteIngredientGroup(idIngredientGroup: number) {
  const ingredientGroup = await ingredientRepository.getIngredientGroupById(
    idIngredientGroup
  );

  if (!ingredientGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.DELETE,
    AdminLogEntityTypeEnum.INGREDIENT_GROUP,
    idIngredientGroup
  );

  await ingredientRepository.deleteIngredientGroup(idIngredientGroup);
}

export const ingredientService = {
  getIngredientUnitGroupWithAssignedIngredients,
  attemptInsertIngredientGroup,
  attemptEditIngredientGroup,
  attemptDeleteIngredientGroup,
} as const;
