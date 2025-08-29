import { IngredientGroup } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";
import { IngredientGroupWithAssignedIngredientsDTO } from "../dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";

/**
 * Retrieves all ingredient groups from the database along with their assigned ingredients.
 *
 * For each ingredient group, the function includes:
 * - the group's ID and name,
 * - a list of all ingredients assigned to the group (with their IDs and names).
 *
 * The function returns paginated results with the total count of ingredient groups.
 * This data is typically used for displaying ingredient group information with
 * their associated ingredients in data tables or management interfaces.
 *
 * @returns {Promise<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>}
 *          A paginated response containing:
 *          - items: Array of ingredient groups with their assigned ingredients
 *          - totalCount: Total number of ingredient groups in the database
 */
export async function getIngredientUnitGroupWithAssignedIngredients(): Promise<
  PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>
> {
  const [items, totalCount] = await Promise.all([
    prisma.ingredientGroup.findMany({
      relationLoadStrategy: "join",
      select: {
        idIngredientGroup: true,
        name: true,
        ingredient: {
          select: {
            idIngredient: true,
            name: true,
          },
        },
      },
    }),
    prisma.ingredientGroup.count(),
  ]);

  return { items, totalCount };
}

/**
 * Retrieves a specific ingredient group from the database by its name.
 *
 * The function searches for an ingredient group with the exact name match
 * and returns the complete ingredient group record if found. This is typically
 * used for validation purposes, checking if a group with a specific name
 * already exists, or for retrieving group details when only the name is known.
 *
 * @param {string} name - The exact name of the ingredient group to search for
 * @returns {Promise<IngredientGroup | null>}
 *          A promise that resolves to:
 *          - IngredientGroup object if a group with the specified name exists
 *          - null if no ingredient group with the given name is found
 */
export async function getIngredientGroupByName(
  name: string
): Promise<IngredientGroup | null> {
  return await prisma.ingredientGroup.findFirst({
    where: {
      name: {
        search: name,
        mode: "insensitive",
      },
    },
  });
}

export async function getIngredientGroupById(
  idIngredientGroup: number
): Promise<IngredientGroup | null> {
  return await prisma.ingredientGroup.findUnique({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
  });
}

/**
 * Creates a new ingredient group in the database with the specified name.
 *
 * The function inserts a new ingredient group record into the database
 * using the provided name. This is typically used when adding new categories
 * for organizing ingredients, such as "Vegetables", "Spices", "Dairy", etc.
 * The newly created group can then be used to categorize ingredients.
 *
 * @param {string} name - The name of the new ingredient group to create
 * @returns {Promise<IngredientGroup>}
 *          A promise that resolves to the newly created IngredientGroup object
 *          containing the generated ID and the provided name
 */
export async function insertIngredientGroup(
  name: string
): Promise<IngredientGroup> {
  return await prisma.ingredientGroup.create({
    data: {
      name: name,
    },
  });
}

/**
 * Updates an existing ingredient group's name in the database.
 *
 * The function modifies the name of an ingredient group identified by its ID.
 * This is typically used when renaming ingredient categories, such as changing
 * "Veggies" to "Vegetables" or correcting typos in group names. The operation
 * updates only the name field while preserving all other group properties
 * and relationships with assigned ingredients.
 *
 * @param {number} idIngredientGroup - The unique identifier of the ingredient group to update
 * @param {string} name - The new name to assign to the ingredient group
 * @returns {Promise<void>}
 *          A promise that resolves when the update operation is completed successfully.
 *          No data is returned as this is a modification operation.
 */
export async function updateIngredientGroup(
  idIngredientGroup: number,
  name: string
): Promise<void> {
  await prisma.ingredientGroup.update({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
    data: {
      name: name,
    },
  });
}

/**
 * Deletes unit group
 * @param idUnitGroup Unit group id
 */
export async function deleteIngredientGroup(idIngredientGroup: number) {
  await prisma.ingredientGroup.delete({
    where: {
      idIngredientGroup: idIngredientGroup,
    },
  });
}

export const ingredientRepository = {
  getIngredientUnitGroupWithAssignedIngredients,
  getIngredientGroupByName,
  getIngredientGroupById,
  insertIngredientGroup,
  updateIngredientGroup,
  deleteIngredientGroup,
} as const;
