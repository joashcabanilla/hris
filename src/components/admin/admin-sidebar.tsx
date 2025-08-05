"use client";

//hooks
import { useCallback, useLayoutEffect, useState } from "react";
import { useTheme } from "next-themes";

//shadcn components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";

//components
import { SidebarHeaderComponent } from "@/components/shared/sidebar-header";
import { SidebarFooterComponent } from "@/components/shared/sidebar-footer";

//context global state
import { useThemeContext } from "@/context/theme-context";

//zustand global state
import { useAuthStore, type User } from "@/store/auth-store";

export function AdminSidebar() {
  const { theme } = useThemeContext();
  const { setTheme } = useTheme();

  //zustand global state
  const { user, setUser, setToken, setAuthenticated } = useAuthStore();

  //local state
  const [userData, setUserData] = useState<User | undefined>(undefined);

  //handle toggle switch theme
  const switchTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  //handle logout
  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthenticated(false);
  }, [setUser, setToken, setAuthenticated]);

  useLayoutEffect(() => { 
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarHeaderComponent />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarFooterComponent
          name={`${userData?.firstname} ${userData?.lastname}`}
          email={userData?.email}
          profilePicture=""
          theme={theme}
          switchTheme={switchTheme}
          logout={handleLogout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
