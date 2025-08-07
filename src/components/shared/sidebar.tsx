"use client";

//hooks
import { useCallback } from "react";
import { useTheme } from "next-themes";

//shadcn components
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

//components
import { SidebarHeaderComponent } from "@/components/shared/sidebar-header";
import { SidebarFooterComponent } from "@/components/shared/sidebar-footer";
import { AdminSidebarContent, EmployeeSidebarContent } from "@/components/shared/sidebar-content";

//context global state
import { useThemeContext } from "@/context/theme-context";

//zustand global state
import { useAuthStore } from "@/store/auth-store";

//Services
import { useLogout } from "@/services/mutations/auth";

export function SidebarComponent() {
  const { theme } = useThemeContext();
  const { setTheme } = useTheme();

  //zustand global state
  const { user, setUser, setToken, setAuthenticated } = useAuthStore();

  //mutations
  const logout = useLogout();

  //handle toggle switch theme
  const switchTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  //handle logout
  const handleLogout = useCallback(() => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        setToken(null);
        setAuthenticated(false);
      }
    });
  }, [setUser, setToken, setAuthenticated, logout]);

  //handle account settings
  const handleAccountSetting = useCallback(() => {}, []);

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarHeaderComponent />
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarContent />
        <AdminSidebarContent />
        <AdminSidebarContent />
        <AdminSidebarContent />
        <AdminSidebarContent />
        <EmployeeSidebarContent />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterComponent
          name={`${user?.firstname} ${user?.lastname}`}
          email={`${user?.email}`}
          profilePicture={user?.profile_picture ? user?.profile_picture : ""}
          theme={theme}
          switchTheme={switchTheme}
          logout={handleLogout}
          accountSetting={handleAccountSetting}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
