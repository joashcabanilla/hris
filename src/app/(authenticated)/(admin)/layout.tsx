//provider wrapper
import { AdminAuthenticated } from "@/providers/auth-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthenticated>{children}</AdminAuthenticated>;
}
