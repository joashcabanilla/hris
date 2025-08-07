//hooks
import type { Metadata } from "next";

//components

import { Dashboard } from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard"
};

export default function AdminDashboard() {
  return <Dashboard />;
}
