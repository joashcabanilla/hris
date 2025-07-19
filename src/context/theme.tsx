"use client";

//hooks
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

//components
import { Login } from "@/components/shared/loading";

type themeState = {
  theme?: string;
};

interface themeContextProviderProps {
  children: React.ReactNode;
}

const themeContext = createContext<themeState | null>(null);

export default function ThemeContextProvider({ children }: themeContextProviderProps) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState<boolean>(false);
  const pathname = usePathname();

  const loading = {
    "/": <Login isMember={true} />,
    "/login/": <Login isMember={false} />,
  }[pathname];

  useEffect(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme);
      setMounted(true);
    }
  }, [resolvedTheme]);

  return mounted ? (
    <themeContext.Provider value={{ theme }}>{children}</themeContext.Provider>
  ) : (
    loading
  );
}

export function useThemeContext() {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return context;
}
