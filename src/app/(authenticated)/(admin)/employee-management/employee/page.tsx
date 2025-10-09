//hooks
import type { Metadata } from "next";

//components
import { Employee } from "@/components/module/admin/add-view-employee";

export const metadata: Metadata = {
  title: "Employee Management"
};

export default function Home() {
  return <Employee />;
}
