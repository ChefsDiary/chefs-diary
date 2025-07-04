// export type UnitGroupsWithAssignmentsDTO = Pick<
//   UnitGroup,
//   "idUnitGroup" | "name"
// > & {
//   baseUnit: Pick<Unit, "idUnit" | "name"> | null;
//   unitGroupUnit: (Pick<UnitGroupUnit, "isBaseUnit" | "idUnit"> & {
//     unit: Pick<Unit, "name">;
//   })[];
// };

export type UnitGroupsWithAssignmentsDTO = {
  unitGroupUnit: {
    unit: { name: string };
    idUnit: number;
    isBaseUnit: boolean;
  }[];
  name: string;
  idUnitGroup: number;
  baseUnit: { name: string; idUnit: number } | null;
};

