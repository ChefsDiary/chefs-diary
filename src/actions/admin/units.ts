"use server";

import { revalidatePath } from "next/cache";

import unitActionValidator from "@/lib/actionValidators/admin/unitActionValidator";
import unitGroupActionValidator from "@/lib/actionValidators/admin/unitGroupActionValidator";
import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import {
  attemptAddUnitToGroup,
  attemptDeleteUnit,
  attemptDeleteUnitGroup,
  attemptEditUnit,
  attemptEditUnitGroup,
  attemptInsertUnit,
  attemptInsertUnitGroup,
  attemptRemoveUnitFromGroup,
  getUnitGroupDataForModal,
} from "@/lib/services/unitService";
import { getActualTime } from "@/lib/utils/date";
import {
  getConflictErrorFromError,
  getErrorMessageFromError,
  getNotFoundErrorFromError,
} from "@/lib/utils/error";
import { nameof } from "@/lib/utils/nameof";
import { getRequireAdminPermissions } from "@/lib/utils/server";
import { UnitFormType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";
import { UnitGroupFormType } from "@/lib/validations/schemas/admin/unitGroupFormValidationSchema";
import { Unit, UnitGroup } from "@prisma/client";

export async function insertUnitGroupAction(
  formData: FormData
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await unitGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(nameof<UnitGroupFormType>("name")) as string;
    const unitGroup = await attemptInsertUnitGroup(name);

    return {
      data: unitGroup,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Skupina jednotek již existuje"
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
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function updateUnitGroupAction(
  idUnitGroup: number,
  formData: FormData
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await unitGroupActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(nameof<UnitGroupFormType>("name")) as string;

    const unitGroup = await attemptEditUnitGroup(idUnitGroup, name);

    return {
      data: unitGroup,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Skupina jednotek neexistuje"
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
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function deleteUnitGroupAction(
  idUnitGroup: number
): Promise<ActionResponseDTO<UnitGroup>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_DELETE]);

  try {
    await attemptDeleteUnitGroup(idUnitGroup);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Skupina jednotek nelze smazat"
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
  } finally {
    revalidatePath(adminRoutes.UnitGroups);
  }
}

export async function insertUnitAction(
  formData: FormData
): Promise<ActionResponseDTO<Unit>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await unitActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(nameof<UnitFormType>("name")) as string;
    const unit = await attemptInsertUnit(name);

    return {
      data: unit,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Jednotka již existuje"
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
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}

export async function updateUnitAction(
  idUnit: number,
  formData: FormData
): Promise<ActionResponseDTO<Unit>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const validationResult = await unitActionValidator(formData);

    if (!validationResult.success) {
      return {
        data: null,
        success: false,
        error: validationResult.error,
        timeStamp: getActualTime(),
      };
    }

    const name = formData.get(nameof<UnitFormType>("name")) as string;

    const unit = await attemptEditUnit(idUnit, name);

    return {
      data: unit,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Jednotka neexistuje"
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
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}

export async function deleteUnitAction(
  idUnit: number
): Promise<ActionResponseDTO<Unit>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_DELETE]);

  try {
    await attemptDeleteUnit(idUnit);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const conflictError = getNotFoundErrorFromError(
      error,
      "Jednotka nelze smazat"
    );
    let errorMessage = conflictError.errorMessage;

    if (!conflictError.isNotFoundError) {
      errorMessage = getErrorMessageFromError(error);
    }

    return {
      data: null,
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}

export async function getUnitGroupDataForModalAction(
  idUnit: number
): Promise<ActionResponseDTO<UnitGroupModalDTO[]>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const data = await getUnitGroupDataForModal(idUnit);

    return {
      data: data,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const conflictError = getConflictErrorFromError(
      error,
      "Jednotka načíst jednotky pro modal"
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

export async function addUnitToGroupAction(
  idUnit: number,
  formData: FormData
): Promise<ActionResponseDTO<void>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    const isBaseUnitRaw = formData.get(nameof<UnitGroupModalDTO>("isBaseUnit"));
    const isBaseUnit = isBaseUnitRaw === null ? null : isBaseUnitRaw === "true";
    const idUnitGroupRaw = formData.get(
      nameof<UnitGroupModalDTO>("idUnitGroup")
    );
    const idUnitGroup = idUnitGroupRaw !== null ? Number(idUnitGroupRaw) : null;

    await attemptAddUnitToGroup(idUnit, isBaseUnit, idUnitGroup);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Jednotka neexistuje"
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
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}

export async function removeUnitFromGroupAction(
  idUnit: number,
  idUnitGroup: number
): Promise<ActionResponseDTO<void>> {
  await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

  try {
    await attemptRemoveUnitFromGroup(idUnit, idUnitGroup);

    return {
      data: null,
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const notFoundError = getNotFoundErrorFromError(
      error,
      "Jednotka nebo skupina neexistuje"
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
  } finally {
    revalidatePath(adminRoutes.Units);
  }
}
