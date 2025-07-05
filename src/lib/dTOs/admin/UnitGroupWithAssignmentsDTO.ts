import { Unit, UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitGroupsWithAssignmentsDTO = Pick<
  UnitGroup,
  "idUnitGroup" | "name"
> & {
  baseUnit: Pick<Unit, "idUnit" | "name"> | null;
  unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit" | "idUnit"> & {
    unit: Pick<Unit, "name">;
  })[];
};
