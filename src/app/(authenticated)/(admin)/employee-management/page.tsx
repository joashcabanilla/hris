//hooks
import type { Metadata } from "next";

//components
import { EmployeeManagement } from "@/components/module/admin/employee-management";

export const metadata: Metadata = {
  title: "Employee Management"
};

export default function Home() {
  return <EmployeeManagement />;
}
