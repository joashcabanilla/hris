import { create } from "zustand";

interface TableState {
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
}

export const useTableStore = create<TableState>((set) => ({
  globalFilter: "",
  setGlobalFilter: (globalFilter) => set({ globalFilter })
}));
