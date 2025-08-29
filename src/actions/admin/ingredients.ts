"use server";

import ingredientGroupActionValidator from "@/lib/actionValidators/admin/ingredientGroupActionValidator";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { ingredientService } from "@/lib/services/ingredientService";
import { getActualTime } from "@/lib/utils/date";
import {
  getConflictErrorFromError,
  getErrorMessageFromError,
  getNotFoundErrorFromError,
} from "@/lib/utils/error";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { IngredientGroupFormType } from "@/lib/validations/schemas/admin/ingredientGroupFormValidationSchema";
import { IngredientGroup } from "@prisma/client";

export async function getIngredientUnitGroupWithAssignedIngredientsAction(): Promise<
  ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const data =
      await ingredientService.getIngredientUnitGroupWithAssignedIngredients();

    return {
      data: data,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}

export async function insertIngredientGroupAction(
  formData: FormData
): Promise<ActionResponseDTO<IngredientGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(
      nameof<IngredientGroupFormType>("name")
    ) as string;
    const unitGroup = await ingredientService.attemptInsertIngredientGroup(
      name
    );

    return {
      data: unitGroup,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Skupina ingrediencí již existuje"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isConflictError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}

export async function updateIngredientGroupAction(
  idIngredientGroup: number,
  formData: FormData
): Promise<ActionResponseDTO<IngredientGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_EDIT]);

  try {
    const validationResult = await ingredientGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(
      nameof<IngredientGroupFormType>("name")
    ) as string;

    await ingredientService.attemptEditIngredientGroup(idIngredientGroup, name);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Skupina ingrediencí neexistuje"
    );
    let errorMessage = notFoundError.errorMessage;

    if (!notFoundError.isNotFoundError) {
      const conflictError = getConflictErrorFromError(
        error,
        "Skupina ingrediencí již existuje"
      );
      if (conflictError.isConflictError) {
        errorMessage = conflictError.errorMessage;
      } else {
        errorMessage = getErrorMessageFromError(error);
      }
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}

export async function deleteIngredientGroupAction(
  idIngredientGroup: number
): Promise<ActionResponseDTO<IngredientGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.INGREDIENT_DELETE]);

  try {
    await ingredientService.attemptDeleteIngredientGroup(idIngredientGroup);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Skupina ingrediencí nelze smazat"
    );
    let errorMessage = notFoundError.errorMessage;

    if (!notFoundError.isNotFoundError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}
