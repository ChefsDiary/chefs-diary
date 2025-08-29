"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ADMIN_UNIT_GROUPS_GRID_NAME } from "@/lib/constants/gridNames";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { TableSettings } from "@/lib/types/common/table";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { SortDescriptor } from "@heroui/react";

type UnitGroupsTableContext = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (value: SortDescriptor) => void;
};

export const UnitGroupsTableContext =
  createContext<UnitGroupsTableContext | null>(null);

type Props = {
  children: ReactNode;
};

export function UnitGroupsTableContextProvider({ children }: Props) {
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
    const settings = loadTableSettings(
      ADMIN_UNIT_GROUPS_GRID_NAME,
      defaultSettings
    );

    setPage(settings.page);
    setPageSize(settings.pageSize);
    setSortDescriptor(settings.sortDescriptor as SortDescriptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(ADMIN_UNIT_GROUPS_GRID_NAME, {
      page,
      pageSize,
      sortDescriptor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sortDescriptor]);

  return (
    <UnitGroupsTableContext.Provider
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
    </UnitGroupsTableContext.Provider>
  );
}

export function useUnitGroupsTableContext() {
  const context = useContext(UnitGroupsTableContext);
  if (!context) {
    throw new Error(
      "useUnitGroupsTableContext must be used within a UnitGroupsTableContextProvider"
    );
  }

  return context;
}
