import { Unit, UnitGroup } from "@prisma/client";

import { UnitGroupModalDTO } from "../dTOs/admin/UnitGroupModalDTO";
import { UnitGroupSummaries } from "../dTOs/admin/UnitGroupSummariesDTO";
import { UnitWithGroupInfoSummaryDTO } from "../dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { ActionResponseDTO } from "../dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import AdminLogActionTypeEnum from "../enums/AdminLogActionTypeEnum";
import AdminLogEntityTypeEnum from "../enums/AdminLogEntityTypeEnum";
import PermissionTypeEnum from "../enums/PermissionTypeEnum";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import { unitRepository } from "../repositories/unitRepository";
import { getActualTime } from "../utils/date";
import { getErrorMessageFromError } from "../utils/error";
import { getRequireAdminPermissions } from "../utils/server";
import { logAdminAction } from "./adminLogService";

/**
 * Attempts to insert a new unit group with the given name.
 * Throws a ConflictError if a unit group with the same name already exists.
 *
 * @param name - The name of the unit group to insert.
 * @returns {Promise<UnitGroup>}
 * @throws {ConflictError} If a unit group with the same name already exists.
 */
export async function attemptInsertUnitGroup(name: string): Promise<UnitGroup> {
  const unitGroup = await unitRepository.getUnitGroupByName(name);

  if (unitGroup) {
    throw new ConflictError();
  }

  const insertedUnitGroup = await unitRepository.insertUnitGroup(name);

  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    insertedUnitGroup.idUnitGroup,
    { name }
  );

  return insertedUnitGroup;
}

/**
 * Attempts to edit a unit group with the given id.
 * Throws a notFoundError if a unit group with the id doesn't exists.
 *
 * @param idUnitGroup - The id of the unit group to edit.
 * @param name - The name of the unit group to edit.
 * @returns {Promise<UnitGroup>}
 * @throws {NotFoundError} If a unit group with the same name already exists.
 */
export async function attemptEditUnitGroup(
  idUnitGroup: number,
  name: string
): Promise<UnitGroup> {
  const unitGroup = await unitRepository.getUnitGroupById(idUnitGroup);

  if (!unitGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    idUnitGroup,
    { name }
  );

  return await unitRepository.updateUnitGroup(idUnitGroup, name);
}

/**
 * Attempts to delete a unit group with the given id.
 * Throws a notFoundError if a unit group with the id doesn't exists.
 *
 * @param idUnitGroup - The id of the unit group to edit.
 * @throws {NotFoundError} If a unit group with the same name already exists.
 */
export async function attemptDeleteUnitGroup(idUnitGroup: number) {
  const unitGroup = await unitRepository.getUnitGroupById(idUnitGroup);

  if (!unitGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.DELETE,
    AdminLogEntityTypeEnum.UNIT_GROUP,
    idUnitGroup
  );

  await unitRepository.deleteUnitGroup(idUnitGroup);
}

/**
 * Gets unit group by idUnitGroup
 * @returns {Promise<ActionResponseDTO<UnitGroup>>}
 */
export async function getUnitGroupById(
  idUnitGroup: number
): Promise<ActionResponseDTO<UnitGroup>> {
  // TODO: Pro4 tu jako je ActionResponse, kdy6 jsem v service?
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

    const unitGroup = await unitRepository.getUnitGroupById(idUnitGroup);

    return {
      data: unitGroup,
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

/**
 * Attempts to insert a new unit with the given name.
 * Throws a ConflictError if a unit with the same name already exists.
 *
 * @param name - The name of the unit to insert.
 * @returns {Promise<Unit>}
 * @throws {ConflictError} If a unit with the same name already exists.
 */
export async function attemptInsertUnit(name: string): Promise<Unit> {
  const unit = await unitRepository.getUnitByName(name);

  if (unit) {
    throw new ConflictError();
  }

  const insertedUnit = await unitRepository.insertUnit(name);

  logAdminAction(
    AdminLogActionTypeEnum.CREATE,
    AdminLogEntityTypeEnum.UNIT,
    insertedUnit.idUnit,
    { name }
  );

  return insertedUnit;
}

/**
 * Attempts to edit a unit with the given id.
 * Throws a notFoundError if a unit with the id doesn't exists.
 *
 * @param idUnit - The id of the unit to edit.
 * @param name - The name of the unit to edit.
 * @returns {Promise<Unit>}
 * @throws {NotFoundError} If a unit with the same name already exists.
 */
export async function attemptEditUnit(
  idUnit: number,
  name: string
): Promise<Unit> {
  const unit = await unitRepository.getUnitById(idUnit);

  if (!unit) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.EDIT,
    AdminLogEntityTypeEnum.UNIT,
    idUnit,
    { name }
  );

  return await unitRepository.updateUnit(idUnit, name);
}

/**
 * Returns unit group data associated with a specific unit,
 * formatted for use in a modal dialog.
 *
 * Each returned object includes information about whether the unit
 * is assigned to the group and whether it is marked as the base unit.
 *
 * @param idUnit - The ID of the unit for which to retrieve assigned groups.
 * @returns An array of UnitGroupModalDto objects containing basic group
 *          information and assignment status related to the given unit.
 */
export async function getUnitGroupDataForModal(
  idUnit: number
): Promise<UnitGroupModalDTO[]> {
  const groups = await unitRepository.getUnitGroupsWithAssignedUnits(idUnit);

  return groups.map((item) => {
    const assignedUnit = item.unitGroupUnit.find(
      (rel) => rel.idUnit === idUnit
    );

    return {
      idUnitGroup: item.idUnitGroup,
      unitGroupName: item.name,
      isBaseUnit: assignedUnit?.isBaseUnit ?? false,
      idsUnit: item.unitGroupUnit.map((rel) => rel.idUnit),
      baseUnit: item.baseUnit,
    } satisfies UnitGroupModalDTO;
  });
}

/**
 * Attempts to delete a unit with the given id.
 * Throws a notFoundError if a unit with the id doesn't exists.
 *
 * @param idUnit - The id of the unit to edit.
 * @throws {NotFoundError} If a unit with the same name already exists.
 */
export async function attemptDeleteUnit(idUnit: number) {
  const unit = await unitRepository.getUnitById(idUnit);

  if (!unit) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.DELETE,
    AdminLogEntityTypeEnum.UNIT,
    idUnit
  );

  await unitRepository.deleteUnit(idUnit);
}

/**
 * Fetches unit group data and transforms it into a simplified summary format
 * suitable for UI display (e.g., in tables or lists).
 *
 * Each summary includes:
 * - the ID and name of the unit group,
 * - the name of the base unit (if set),
 * - a comma-separated string of unit names assigned to the group.
 *
 * @returns A list of UnitGroupSummaries objects representing simplified unit group data.
 */
export async function getUnitGroupSummaries(): Promise<
  ActionResponseDTO<PaginatedDTO<UnitGroupSummaries>>
> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

    const { items, totalCount } =
      await unitRepository.getUnitGroupOverviewList();

    const newItems = items.map((item) => {
      return {
        idUnitGroup: item.idUnitGroup,
        name: item.name,
        baseUnitName:
          item.unitGroupUnit.find((u) => u.isBaseUnit)?.unit.name ?? null,
        unitNames: item.unitGroupUnit.map((u) => u.unit.name).join(", "),
      } satisfies UnitGroupSummaries;
    });

    return {
      data: { items: newItems, totalCount },
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: { items: [], totalCount: 0 },
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}

/**
 * Retrieves a paginated summary of all units, including their group affiliation and
 * whether each unit is the base unit of its group.
 *
 * - Requires the user to have the `UNIT_EDIT` permission.
 * - If permission is denied or an error occurs, returns an empty result with error info.
 *
 * Each returned item includes:
 * - `idUnit`: Unit ID
 * - `name`: Unit name
 * - `unitGroupName`: Name of the group the unit belongs to (if any)
 * - `isBaseUnit`: Boolean flag indicating whether the unit is the group's base unit
 *
 * @returns An `ActionResponseDTO` containing a `PaginatedDTO` with unit and group summary data.
 */
export async function getUnitWithGroupInfoSummary(): Promise<
  ActionResponseDTO<PaginatedDTO<UnitWithGroupInfoSummaryDTO>>
> {
  try {
    await getRequireAdminPermissions([PermissionTypeEnum.UNIT_EDIT]);

    const { items, totalCount } =
      await unitRepository.getUnitsWithGroupMemberships();

    const newItems = items.map((item) => {
      const unitGroupUnits = item.unitGroupUnit;
      const unitGroupNames = unitGroupUnits
        .map((m) => m.unitGroup?.name)
        .join(", ");
      const baseUnitGroup = unitGroupUnits.filter((bu) => bu.isBaseUnit);
      const isBaseUnitInGroup = baseUnitGroup
        .map((gn) => gn.unitGroup?.name)
        .join(", ");
      const baseUnitGroupIds: number[] = baseUnitGroup.map(
        (gn) => gn.idUnitGroup
      );

      return {
        idUnit: item.idUnit,
        name: item.name,
        unitGroupNames,
        isBaseUnitInGroup,
        baseUnitGroupIds,
      } satisfies UnitWithGroupInfoSummaryDTO;
    });

    return {
      data: { items: newItems, totalCount },
      success: true,
      timeStamp: getActualTime(),
    };
  } catch (error) {
    const errorMessage = getErrorMessageFromError(error);

    return {
      data: { items: [], totalCount: 0 },
      success: false,
      error: errorMessage,
      timeStamp: getActualTime(),
    };
  }
}

/**
 * Attempts to assign a unit to a group and optionally mark it as the base unit.
 *
 * - Verifies that the unit with the given ID exists.
 * - Logs the admin action before applying the change.
 * - Delegates the group assignment logic to `addUnitToGroup`.
 *
 * @param idUnit - ID of the unit to assign.
 * @param isBaseUnit - Whether the unit should be marked as the base unit of the group.
 * @param idUnitGroup - ID of the group to assign the unit to.
 *
 * @throws {NotFoundError} If the unit with the specified ID does not exist.
 */
export async function attemptAddUnitToGroup(
  idUnit: number,
  isBaseUnit: boolean | null,
  idUnitGroup: number | null
): Promise<void> {
  const unit = await unitRepository.getUnitById(idUnit);
  // TODO: Přidat kontroly, že je ve skupině již základní jednotka, že jednotka ve skupině již existuje, a pod
  // TODO: Pokud odškrtnu, že je zakladní, musí se že je zakladní jednotak smazat

  if (!unit) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.ADD_TO_GROUP,
    AdminLogEntityTypeEnum.UNIT,
    idUnit,
    { isBaseUnit, idUnitGroup }
  );

  await unitRepository.addUnitToGroup(idUnit, isBaseUnit, idUnitGroup);
}

/**
 * Removes a unit from a specific group after validating its existence.
 *
 * - Verifies that both the unit and the group with the given IDs exist.
 * - Logs the admin action before performing the removal.
 * - Delegates the actual removal to `removeUnitFromGroup`.
 *
 * @param idUnit - ID of the unit to be removed from the group.
 * @param idUnitGroup - ID of the group from which the unit should be removed.
 *
 * @throws {NotFoundError} If the unit or group with the specified IDs does not exist.
 *
 * @returns {Promise<void>}
 */
export async function attemptRemoveUnitFromGroup(
  idUnit: number,
  idUnitGroup: number
): Promise<void> {
  const unit = await unitRepository.getUnitById(idUnit);
  const unitGroup = await unitRepository.getUnitGroupById(idUnitGroup);

  if (!unit || !unitGroup) {
    throw new NotFoundError();
  }

  logAdminAction(
    AdminLogActionTypeEnum.REMOVE_FROM_GROUP,
    AdminLogEntityTypeEnum.UNIT,
    idUnit,
    { idUnitGroup }
  );

  await unitRepository.deleteUnitFromGroup(idUnit, idUnitGroup);
}
