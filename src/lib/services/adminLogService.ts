import { JsonObject } from "next-auth/adapters";

import { auth } from "@/config/auth/authAdmin";
import { adminLogRepository } from "@/lib/repositories/adminLogRepository";

import AdminLogActionTypeEnum from "../enums/AdminLogActionTypeEnum";
import AdminLogEntityTypeEnum from "../enums/AdminLogEntityTypeEnum";
import LogAdminActionDataType from "../types/data/LogAdminActionDataType";
import { getErrorMessageFromError } from "../utils/error";

/**
 * Logs an admin action into the AdminLog table.
 *
 * @template T - The type of the changes object, must be JSON-serializable.
 * @param {AdminLogActionTypeEnum} action - The type of action performed (CREATE, EDIT, DELETE).
 * @param {AdminLogEntityTypeEnum} entity - The entity type affected by the action (USER, UNIT, etc.).
 * @param {number} [idEntity] - Optional ID of the affected entity; can be undefined for new entities.
 * @param {T} changes - An object describing the changes made, will be serialized to JSON.
 */
export function logAdminAction<T>(
  action: AdminLogActionTypeEnum,
  entity: AdminLogEntityTypeEnum,
  idEntity: number,
  changes?: T
) {
  //TODO: Tak jak to mám udělané, nepoznám jaké změny uživatel udělal. Udělám si nějaou funkci, kterí mi bude načítat změny a na ui je budu ukazovat
  //   function getChangedFields<T extends Record<string, any>>(original: T, updated: Partial<T>) {
  //   const changes: Record<string, unknown> = {};

  //   for (const key in updated) {
  //     if (
  //       Object.hasOwn(original, key) &&
  //       JSON.stringify(original[key]) !== JSON.stringify(updated[key])
  //     ) {
  //       changes[key] = updated[key];
  //     }
  //   }

  //   return changes;
  // }
  (async () => {
    try {
      //TODO: Použít funkci z session
      const session = await auth();
      const changesJson: JsonObject = changes
        ? JSON.parse(JSON.stringify(changes))
        : undefined;

      const data: LogAdminActionDataType = {
        idUser: session?.user?.id ?? "",
        action,
        entity,
        changes: changesJson,
        idEntity,
      };

      await adminLogRepository.logAdminAction(data);
    } catch (error) {
      getErrorMessageFromError(error, {
        consoleErrorTitle: `Admin log for action: ${action}, entity: ${entity}, changes: ${changes}`,
      });
    }
  })(); // <-- fire-and-forget
}
