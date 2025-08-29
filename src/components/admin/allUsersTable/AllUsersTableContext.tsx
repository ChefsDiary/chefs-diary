"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ADMIN_ALL_USERS_GRID_NAME } from "@/lib/constants/gridNames";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { TableSettings } from "@/lib/types/common/table";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { Selection, SortDescriptor } from "@heroui/react";

import columns from "./allUsersColumns";

type AllUsersTableContext = {
  page: number;
  setPage: (value: number) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  visibleColumns: Selection;
  setVisibleColumns: (value: Selection) => void;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (value: SortDescriptor) => void;
};

export const AllUsersTableContext = createContext<AllUsersTableContext | null>(
  null
);

type Props = {
  children: ReactNode;
};

export function AllUsersTableContextProvider({ children }: Props) {
  const firstRender = useIsFirstRender();

  const defaultSettings: TableSettings = {
    page: 1,
    pageSize: 10,
    filterValue: "",
    visibleColumns: new Set(columns.map((item) => item.key)),
    sortDescriptor: { column: "", direction: "ascending" },
  };

  const [page, setPage] = useState<number>(defaultSettings.page);
  const [pageSize, setPageSize] = useState<number>(defaultSettings.pageSize);
  const [filterValue, setFilterValue] = useState<string>(
    defaultSettings.filterValue as string
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    defaultSettings.visibleColumns as Selection
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    defaultSettings.sortDescriptor as SortDescriptor
  );

  useEffect(() => {
    const settings = loadTableSettings(
      ADMIN_ALL_USERS_GRID_NAME,
      defaultSettings
    );

    setPage(settings.page);
    setPageSize(settings.pageSize);
    setFilterValue(settings.filterValue as string);
    setVisibleColumns(settings.visibleColumns as Selection);
    setSortDescriptor(settings.sortDescriptor as SortDescriptor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(ADMIN_ALL_USERS_GRID_NAME, {
      page,
      pageSize,
      filterValue,
      visibleColumns,
      sortDescriptor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filterValue, visibleColumns, sortDescriptor]);

  return (
    <AllUsersTableContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        filterValue,
        setFilterValue,
        visibleColumns,
        setVisibleColumns,
        sortDescriptor,
        setSortDescriptor,
      }}
    >
      {children}
    </AllUsersTableContext.Provider>
  );
}

export function useAllUsersTableContext() {
  const context = useContext(AllUsersTableContext);
  if (!context) {
    throw new Error(
      "useAllUsersTableContext must be used within a AllUsersTableContextProvider"
    );
  }

  return context;
}
