//hooks
import type { Metadata } from "next";

//components
import { Dashboard } from "@/components/employee/dashboard";

export const metadata: Metadata = {
  title: "Employee Dashboard"
};

export default function EmployeeDashboard() {
  return <Dashboard />;
}
