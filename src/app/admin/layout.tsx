import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/shared/sidebar";
import { AdminProvider } from "@/providers/admin-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <SidebarProvider className="p-2">
        <AdminSidebar />
        <SidebarInset className="shadow-2xl">{children}</SidebarInset>
      </SidebarProvider>
    </AdminProvider>
  );
}
