"use client";

//icons
import { CirclePlus, FunnelX } from "lucide-react";

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
import { UserStatusFilter } from "@/components/table/filters/userstatus-filter";

//zustand global state
import { useTableStore } from "@/store/table-store";

//api services
import { useGetUserList } from "@/services/queries/admin-query";

export function UserManagement() {
  //zustand global state
  const { setGlobalFilter, setColumnFilters } = useTableStore();

  const getUserList = useGetUserList();

  let dataTable: UserManagementColumnProps[] = [];
  if (!getUserList.isPending) {
    const { data } = getUserList.data;
    dataTable = data.map((user: UserManagementColumnProps) => ({
      id: user.id,
      usertype: { id: user.usertype.id, usertype: user.usertype.usertype },
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
      email: user.email,
      status: user.deleted_at ? "deactivated" : user.status,
      deleted_at: user.deleted_at,
      last_login_at: user.last_login_at,
      last_login_ip: user.last_login_ip
    }));
  }

  return (
    dataTable.length != 0 && (
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
              <div className="bg-background flex flex-wrap items-center gap-2 rounded-t-xl p-4 shadow-lg">
                <SearchFilter />
                <UserTypeFilter />
                <UserStatusFilter />
                <Button
                  className="bg-amber-600/90 font-bold hover:bg-amber-600 focus-visible:ring-amber-400"
                  onClick={() => {
                    setColumnFilters([]);
                    setGlobalFilter("");
                  }}
                >
                  <FunnelX strokeWidth={3} /> Clear Filter
                </Button>
                <Button className="font-bold xl:ml-auto">
                  <CirclePlus strokeWidth={3} /> Add User
                </Button>
              </div>
              <DataTable columns={columns} data={dataTable} />
            </CardContent>
          </Card>
        </main>
        <Copyright className="mt-0 mb-8 text-sm" />
      </div>
    )
  );
}
