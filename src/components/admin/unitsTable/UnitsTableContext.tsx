"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ADMIN_UNITS_GRID_NAME } from "@/lib/constants/gridNames";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { TableSettings } from "@/lib/types/common/table";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { SortDescriptor } from "@heroui/react";

type UnitsTableContext = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (value: SortDescriptor) => void;
};

export const UnitsTableContext = createContext<UnitsTableContext | null>(null);

type Props = {
  children: ReactNode;
};

export function UnitsTableContextProvider({ children }: Props) {
  const firstRender = useIsFirstRender();

  const defaultSettings: TableSettings = {
    page: 1,
    pageSize: 10,
    sortDescriptor: { column: "", direction: "ascending" },
  };

  const [page, setPage] = useState<number>(defaultSettings.page);
  const [pageSize, setPageSize] = useState<number>(defaultSettings.pageSize);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    defaultSettings.sortDescriptor as SortDescriptor
  );

  useEffect(() => {
    const settings = loadTableSettings(ADMIN_UNITS_GRID_NAME, defaultSettings);

    setPage(settings.page);
    setPageSize(settings.pageSize);
    setSortDescriptor(settings.sortDescriptor as SortDescriptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(ADMIN_UNITS_GRID_NAME, {
      page,
      pageSize,
      sortDescriptor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sortDescriptor]);

  return (
    <UnitsTableContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        sortDescriptor,
        setSortDescriptor,
      }}
    >
      {children}
    </UnitsTableContext.Provider>
  );
}

export function useUnitsTableContext() {
  const context = useContext(UnitsTableContext);
  if (!context) {
    throw new Error(
      "useUnitsTableContext must be used within a UnitsTableContextProvider"
    );
  }

  return context;
}
