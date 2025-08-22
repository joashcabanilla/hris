"use client";

import { ColumnDef } from "@tanstack/react-table";

//icons
import { MoreHorizontal } from "lucide-react";
//shadcn components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type UserManagementColumnProps = {
  id: string;
  userType: string;
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  status: string;
  lastLogIn: string;
  lastIp: string;
};

export const columns: ColumnDef<UserManagementColumnProps>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "userType",
    header: "User Type"
  },
  {
    accessorKey: "firstname",
    header: "First Name"
  },
  {
    accessorKey: "middlename",
    header: "Middle Name"
  },
  {
    accessorKey: "lastname",
    header: "Last Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "lastLogIn",
    header: "Last Login"
  },
  {
    accessorKey: "lastIp",
    header: "Last IP Address"
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hover:bg-primary/30 focus-visible:ring-[0px]">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
            <DropdownMenuItem className="text-xs">Copy user ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">View user</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Edit user</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
