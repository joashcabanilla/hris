//shadcn component
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

//components
import { SidebarComponent } from "@/components/shared/sidebar";

import { EmployeeProvider } from "@/providers/employee-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <EmployeeProvider>
      <SidebarProvider>
        <SidebarComponent />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </EmployeeProvider>
  );
}
