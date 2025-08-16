"use client";

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Action"
  }
];
