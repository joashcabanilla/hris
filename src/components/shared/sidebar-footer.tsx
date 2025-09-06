"use client";

//icons
import { EllipsisVertical, Settings2, LogOut, Paintbrush, CircleUserRound } from "lucide-react";

//shadcn components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

interface SidebarFooterComponentProps {
  name: string;
  email: string;
  profilePicture: string;
  theme?: string;
  switchTheme: () => void;
  logout: () => void;
  handleChangeMenu: (page: string) => void;
}

export function SidebarFooterComponent({
  name,
  email,
  profilePicture,
  theme,
  switchTheme,
  handleChangeMenu,
  logout
}: SidebarFooterComponentProps) {
  const { isMobile } = useSidebar();

  return (
    <div>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-primary data-[state=open]:text-primary-foreground hover:[&>span[data-slot=avatar]]:border-primary-foreground data-[state=open]:[&>span[data-slot=avatar]]:border-primary-foreground hover:[&_[data-slot=avatar-fallback-svg]]:stroke-primary data-[state=open]:[&_[data-slot=avatar-fallback-svg]]:stroke-primary cursor-pointer"
              >
                <Avatar className="border-primary h-8 w-8 rounded-full border">
                  <AvatarImage src={profilePicture} alt={name} />
                  <AvatarFallback className="rounded-2xl">
                    <CircleUserRound size={50} data-slot="avatar-fallback-svg" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
                <EllipsisVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="border-primary h-8 w-8 rounded-full border">
                    <AvatarImage src={profilePicture} alt={name} />
                    <AvatarFallback className="rounded-2xl">
                      <CircleUserRound size={50} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={switchTheme}>
                  <Paintbrush className="hover:text-primary-foreground" />
                  Switch to {theme === "light" ? "dark" : "light"} theme
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleChangeMenu("account-settings")}>
                  <Settings2 className="hover:text-primary-foreground" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="hover:text-primary-foreground" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
