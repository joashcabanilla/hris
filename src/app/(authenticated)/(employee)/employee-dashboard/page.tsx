//hooks
import type { Metadata } from "next";

//components
import { Dashboard } from "@/components/module/employee/dashboard";

export const metadata: Metadata = {
  title: "Employee Dashboard"
};

export default function EmployeeDashboard() {
  return <Dashboard />;
}
