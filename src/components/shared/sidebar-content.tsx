"use client";

//hooks
import { usePathname } from "next/navigation";
//icons
import { LayoutDashboard, ChevronRight, UserRoundCog } from "lucide-react";

//shadcn components
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarContentProps {
  handleChangeMenu: (page: string) => void;
}

type MenuProps = {
  title: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
};

export function AdminSidebarContent({ handleChangeMenu }: SidebarContentProps) {
  const pathname = usePathname();
  const menu = [
    {
      title: "Dashboard",
      active: pathname.includes("admin-dashboard"),
      onClick: () => handleChangeMenu("admin-dashboard"),
      icon: <LayoutDashboard strokeWidth={pathname.includes("admin-dashboard") ? 3 : 2} />
    },
    {
      title: "User Management",
      active: pathname.includes("user-management"),
      onClick: () => handleChangeMenu("user-management"),
      icon: <UserRoundCog strokeWidth={pathname.includes("user-management") ? 3 : 2} />
    }
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">Admin Module</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu.map((subMenu) => (
            <SidebarMenuItem key={subMenu.title}>
              <SidebarMenuButton
                asChild
                isActive={subMenu.active}
                tooltip={subMenu.title}
                className="cursor-pointer"
                onClick={subMenu.onClick}
              >
                <span className="font-medium">
                  {subMenu.icon}
                  {subMenu.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function EmployeeSidebarContent({ handleChangeMenu }: SidebarContentProps) {
  const pathname = usePathname();
  const menu = [
    {
      title: "Dashboard",
      active: pathname.includes("employee-dashboard"),
      onClick: () => handleChangeMenu("employee-dashboard"),
      icon: <LayoutDashboard strokeWidth={pathname.includes("employee-dashboard") ? 3 : 2} />
    }
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">Employee Module</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu.map((subMenu) => (
            <SidebarMenuItem key={subMenu.title}>
              <SidebarMenuButton
                asChild
                isActive={subMenu.active}
                tooltip={subMenu.title}
                className="cursor-pointer"
                onClick={subMenu.onClick}
              >
                <span className="font-medium">
                  {subMenu.icon}
                  {subMenu.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function UserSidebarContent({ handleChangeMenu }: SidebarContentProps) {
  const pathname = usePathname();
  const menu: MenuProps[] = [
    {
      title: "Account Settings",
      active: pathname.includes("account-settings"),
      onClick: () => handleChangeMenu("account-settings"),
      icon: <UserRoundCog strokeWidth={pathname.includes("account-settings") ? 3 : 2} />
    }
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">User Module</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible asChild defaultOpen={false} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={"Configuration"} className="cursor-pointer">
                  <LayoutDashboard strokeWidth={2} />
                  <span className="font-medium">Configuration</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild className="cursor-pointer">
                      <span className="font-medium">
                        <LayoutDashboard strokeWidth={2} /> Leave Setup 1
                      </span>
                    </SidebarMenuSubButton>
                    <SidebarMenuSubButton asChild className="cursor-pointer">
                      <span className="font-medium">
                        <LayoutDashboard strokeWidth={2} /> Leave Setup 2
                      </span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {menu.map((subMenu) => (
            <SidebarMenuItem key={subMenu.title}>
              <SidebarMenuButton
                asChild
                isActive={subMenu.active}
                tooltip={subMenu.title}
                className="cursor-pointer"
                onClick={subMenu.onClick}
              >
                <span className="font-medium">
                  {subMenu.icon}
                  {subMenu.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
