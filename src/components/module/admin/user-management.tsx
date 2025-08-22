"use client";

//icons
import { CirclePlus } from "lucide-react";

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
import { SearchFilter } from "@/components/table/filters/search-filter";
import { UserTypeFilter } from "@/components/table/filters/usertype-filter";

//temp data
import { tempData } from "@/lib/utils";

export function UserManagement() {
  const data: UserManagementColumnProps[] = tempData;
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
            <div className="bg-background flex flex-wrap items-center justify-between gap-2 rounded-t-xl p-4 shadow-lg">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <SearchFilter />
                <UserTypeFilter />
              </div>
              <div className="flex-none">
                <Button className="font-bold">
                  <CirclePlus strokeWidth={3} /> Add User
                </Button>
              </div>
            </div>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </main>
      <Copyright className="mt-0 mb-8 text-sm" />
    </div>
  );
}
