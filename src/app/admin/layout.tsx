//shadcn component
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

//components
import { SidebarComponent } from "@/components/shared/sidebar";

//provider wrapper
import { AdminProvider } from "@/providers/admin-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <SidebarProvider>
        <SidebarComponent />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AdminProvider>
  );
}
