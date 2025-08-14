"use client";

//hooks
import { usePathname, useRouter } from "next/navigation";
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

export function AdminSidebarContent() {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">Admin Module</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={false}
              tooltip="Dashboard"
              className="cursor-pointer"
              onClick={() => {
                router.replace("/admin/dashboard", {
                  scroll: false
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="font-medium">
                <LayoutDashboard strokeWidth={2} />
                Dashboard
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function EmployeeSidebarContent() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">Employee Module</SidebarGroupLabel>
    </SidebarGroup>
  );
}

interface userSidebarContentProps {
  handleAccountSetting: () => void;
}

export function UserSidebarContent({ handleAccountSetting }: userSidebarContentProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="tracking-wider">User Module</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.includes("account-settings")}
              tooltip="Dashboard"
              className="cursor-pointer"
              onClick={handleAccountSetting}
            >
              <span className="font-medium">
                <UserRoundCog strokeWidth={pathname.includes("account-settings") ? 3 : 2} />
                Account Settings
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
