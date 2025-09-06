"use client";
//utils
import { formatDateTime } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";

//icons
import { MoreHorizontal, Pencil, Trash2, ArchiveRestore } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";

export type UserManagementColumnProps = {
  id: string;
  usertype: { id: string; usertype: string };
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  username: string;
  status: string;
  deleted_at: Date | null;
  last_login_at: Date | null;
  last_login_ip: string | null;
};

interface ColumnsProps {
  handleDeactivateUser: (user: UserManagementColumnProps) => void;
  handleUpdateCredentials: (user: UserManagementColumnProps) => void;
}
export const columns = ({
  handleDeactivateUser,
  handleUpdateCredentials
}: ColumnsProps): ColumnDef<UserManagementColumnProps>[] => [
  {
    accessorKey: "id",
    header: "Id",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-center">{row.original.id}</p>
  },
  {
    accessorFn: (row) => row.usertype.usertype,
    id: "usertype",
    header: "User Type",
    cell: ({ row }) => <p className="text-center">{row.original.usertype.usertype}</p>
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-left whitespace-normal">{row.original.firstname}</p>
  },
  {
    accessorKey: "middlename",
    header: "Middle Name",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-left whitespace-normal">{row.original.middlename}</p>
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-left whitespace-normal">{row.original.lastname}</p>
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-center">{row.original.email}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      type variantProps = "success" | "warning" | "error";
      let variant: variantProps = "success";
      switch (row.original.status) {
        case "active":
          variant = "success";
          break;
        case "locked":
          variant = "warning";
          break;
        case "deactivated":
          variant = "error";
          break;
      }

      return (
        <div className="flex w-full items-center justify-center">
          <Badge variant={variant}>{row.original.status.toUpperCase()}</Badge>
        </div>
      );
    }
  },
  {
    accessorKey: "last_login_at",
    header: "Last Login",
    enableColumnFilter: false,
    cell: ({ row }) => (
      <p className="text-center whitespace-normal">
        {row.original.last_login_at ? formatDateTime(row.original.last_login_at) : ""}
      </p>
    )
  },
  {
    accessorKey: "last_login_ip",
    header: "Last IP Address",
    enableColumnFilter: false,
    cell: ({ row }) => (
      <p className="text-center whitespace-normal">
        {row.original.last_login_at ? row.original.last_login_ip : ""}
      </p>
    )
  },
  {
    accessorKey: "action",
    header: "Action",
    enableColumnFilter: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex w-full items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:bg-transparent focus-visible:ring-[0px]">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs font-bold">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleUpdateCredentials(user)}
                variant="default"
                className="focus:bg-accent focus:text-accent-foreground text-xs font-medium"
                disabled={row.original.status == "deactivated"}
              >
                <Pencil className="hover:text-primary-foreground" strokeWidth={2} />
                Update Credentials
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeactivateUser(user)}
                variant={row.original.status == "active" ? "destructive" : "default"}
                className="focus:bg-accent focus:text-accent-foreground text-xs font-medium"
              >
                {row.original.status == "active" ? (
                  <Trash2 strokeWidth={2} />
                ) : (
                  <ArchiveRestore strokeWidth={2} className="hover:text-primary-foreground" />
                )}
                {row.original.status == "active" ? "Deactivate" : "Reactivate"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
