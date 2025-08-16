"use client";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { Copyright } from "@/components/shared/copyright";
import {
  columns,
  type UserManagementColumnProps
} from "@/components/table/columns/user-management-column";
import { DataTable } from "@/components/shared/data-table";

export function UserManagement() {
  const tempData: UserManagementColumnProps[] = [
    {
      id: "1",
      userType: "Admin",
      firstname: "John",
      middlename: null,
      lastname: "Doe",
      email: "john.doe@example.com",
      status: "Active",
      lastLogIn: "date",
      lastIp: "192.168.1.1"
    },
    {
      id: "2",
      userType: "User",
      firstname: "Jane",
      middlename: "A.",
      lastname: "Smith",
      email: "jane.smith@example.com",
      status: "Inactive",
      lastLogIn: "date",
      lastIp: "10.0.0.5"
    },
    {
      id: "3",
      userType: "User",
      firstname: "Peter",
      middlename: null,
      lastname: "Jones",
      email: "peter.jones@example.com",
      status: "Active",
      lastLogIn: "date",
      lastIp: "172.16.2.3"
    }
  ];

  return (
    <div>
      <ContentHeader mainModule="ADMIN MODULE" subModule="USER MANAGEMENT" />
      <main className="grid grid-cols-1 p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Create, update, and deactivate employee accounts and manage user permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Management Table */}
            <div className="bg-background flex w-full items-center gap-2 rounded-t-xl p-4">
              <p>other filters</p>
              <Button className="">Add User</Button>
            </div>
            <DataTable columns={columns} data={tempData} />
          </CardContent>
        </Card>
      </main>
      <Copyright className="mt-0 mb-8 text-sm" />
    </div>
  );
}
