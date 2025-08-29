import { TableSettings } from "../types/common/table";

export function loadTableSettings(
  gridName: string,
  defaultValue: TableSettings = {
    page: 1,
    pageSize: 10,
    filterValue: "",
    visibleColumns: new Set([]),
    sortDescriptor: { column: "", direction: "ascending" },
  }
): TableSettings {
  if (typeof window === "undefined") return defaultValue;

  try {
    const raw = localStorage.getItem(gridName);
    const allSettings = raw ? JSON.parse(raw) : defaultValue;

    return {
      ...allSettings,
      visibleColumns: new Set(allSettings.visibleColumns),
    };
  } catch (err) {
    console.error("Error loading table settings:", err);
    return defaultValue;
  }
}

export function saveTableSettings(gridName: string, settings: TableSettings) {
  if (typeof window === "undefined") return;

  try {
    const plainArray = Array.from(settings.visibleColumns ?? new Set([]));
    const serializableSettings = {
      ...settings,
      visibleColumns: plainArray,
    };

    localStorage.setItem(gridName, JSON.stringify(serializableSettings));
  } catch (err) {
    console.error("Error saving table settings:", err);
  }
}
