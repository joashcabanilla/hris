//shadcn component
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

//components
import { SidebarComponent } from "@/components/shared/sidebar";

//provider wrapper
import { AuthProvider } from "@/providers/auth-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <SidebarComponent />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
