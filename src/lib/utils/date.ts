import { format, isDate, isEqual } from "date-fns";

export const formatHours = (date: Date) => {
  return format(date, "HH:mm");
};

export const formatDate = (
  date: Date | string | null,
  pFormat: string = "yyyy-MM-dd"
): string => {
  if (date === null) return "";

  if (typeof date === "string") {
    date = new Date(date);
  }

  if (!isDate(date)) return "";

  return format(date, pFormat);
};

export const formatDateTime = (
  date: Date | string | null,
  pFormat: string = "yyyy-MM-dd HH:mm"
): string => {
  if (date === null) return "";

  if (typeof date === "string") {
    date = new Date(date);
  }

  if (!isDate(date)) return "";

  return format(date, pFormat);
};

export const isDateEqual = (
  dateA: Date,

  dateB: Date,

  ignoreTime: boolean = true
): boolean => {
  const newDateA = new Date(dateA);

  const newDateB = new Date(dateB);

  if (ignoreTime) {
    newDateA.setHours(0, 0, 0, 0);

    newDateB.setHours(0, 0, 0, 0);
  }

  return isEqual(newDateA, newDateB);
};

export const getActualTime = (): number => {
  return new Date().getTime();
};
