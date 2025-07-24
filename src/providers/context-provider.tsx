//context providers
import ThemeContextProvider from "@/context/theme-context";

interface ContextProviderProps {
  children: React.ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
