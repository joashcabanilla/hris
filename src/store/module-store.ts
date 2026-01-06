import { create } from "zustand";

/**
 * Employee Management Module Store
 */
interface EmployeeManagementState {
  employeeId: string | null;
}

interface EmployeeManagementAction {
  setEmployeeId: (employeeId: string | null) => void;
}

type EmployeeManagementStore = EmployeeManagementState & EmployeeManagementAction;

export const useEmployeeManagementStore = create<EmployeeManagementStore>((set) => ({
  employeeId: null,
  setEmployeeId: (employeeId) => set({ employeeId })
}));
