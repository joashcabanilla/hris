import { EmployeeProvider } from "@/providers/employee-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeProvider>{children}</EmployeeProvider>;
}
