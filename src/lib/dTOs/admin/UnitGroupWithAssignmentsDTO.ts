// export type UnitGroupsWithAssignmentsDTO = Pick<
//   UnitGroup,
//   "idUnitGroup" | "name"
// > & {
//   baseUnit: Pick<Unit, "idUnit" | "name"> | null;
//   unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit" | "idUnit"> & {
//     unit: Pick<Unit, "name">;
//   })[];
// };

import { Prisma } from "@prisma/client";

// export type UnitGroupsWithAssignmentsDTO = {
//   unitGroupUnit: {
//     unit: { name: string };
//     idUnit: number;
//     isBaseUnit: boolean;
//   }[];
//   name: string;
//   idUnitGroup: number;
//   baseUnit: { name: string; idUnit: number } | null;
// };

export type UnitGroupsWithAssignmentsDTO = Prisma.UnitGroupGetPayload<{
  select: {
    idUnitGroup: true;
    name: true;
    baseUnit: {
      select: {
        idUnit: true;
        name: true;
      };
    };
    unitGroupUnit: {
      select: {
        isBaseUnit: true;
        idUnit: true;
        unit: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;
