//hooks
import type { Metadata } from "next";

//components
import { Dashboard } from "@/components/module/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard"
};

export default function EmployeeDashboard() {
  return <Dashboard />;
}
