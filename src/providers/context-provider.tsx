//context providers
import ThemeContextProvider from "@/context/global/theme-context";
import AuthContextProvider from "@/context/auth/auth-context";

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeContextProvider>
  );
}
