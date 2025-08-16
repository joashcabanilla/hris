//hooks
import type { Metadata } from "next";

//components
import { UserManagement } from "@/components/module/admin/user-management";

export const metadata: Metadata = {
  title: "User Management"
};

export default function EmployeeDashboard() {
  return <UserManagement />;
}
