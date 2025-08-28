import { create } from "zustand";
import { ColumnFiltersState, PaginationState, Updater } from "@tanstack/react-table";

interface TableState {
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;

  columnFilters: ColumnFiltersState;
  setColumnFilters: (
    updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => void;

  pagination: PaginationState;
  setPagination: (updater: Updater<PaginationState>) => void;
}

export const useTableStore = create<TableState>((set) => ({
  globalFilter: "",
  setGlobalFilter: (globalFilter) => set({ globalFilter }),

  columnFilters: [],
  setColumnFilters: (updater) =>
    set((state) => ({
      columnFilters:
        typeof updater === "function"
          ? (updater as (old: ColumnFiltersState) => ColumnFiltersState)(state.columnFilters)
          : updater
    })),

  pagination: { pageIndex: 0, pageSize: 5 },
  setPagination: (updater) =>
    set((state) => ({
      pagination:
        typeof updater === "function"
          ? (updater as (old: PaginationState) => PaginationState)(state.pagination)
          : updater
    }))
}));
