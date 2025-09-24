"use client";

//icons
import { UserPlus } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//components
import { Copyright } from "@/components/shared/copyright";
import { ContentHeader } from "@/components/shared/content-header";
import { SearchFilter } from "@/components/table/filters/search-filter";
import { DataTable } from "@/components/shared/data-table";
import {
  columns,
  type EmployeeManagementColumnProps
} from "@/components/table/columns/employee-management-column";
import { ClearFilterButton } from "@/components/table/filters/clear-filter";

//api services
import { useGetEmployeeList } from "@/services/queries/admin-query";

export function EmployeeManagement() {
  const column = columns();
  let dataTable: EmployeeManagementColumnProps[] = [];

  //tanstack api query
  const getEmployeeList = useGetEmployeeList();

  if (!getEmployeeList.isPending) {
    const { data } = getEmployeeList.data;
    dataTable = data;
  } else {
    return null;
  }

  return (
    <div>
      <ContentHeader mainModule="ADMIN MODULE" subModule="EMPLOYEE MANAGEMENT" />
      <main className="grid grid-cols-1 p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Employee Management</CardTitle>
            <CardDescription>
              Create employee accounts, manage records, and update employee details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Employee Management Table */}
            <div className="bg-background flex flex-wrap items-center gap-2 rounded-t-xl p-4 shadow-lg">
              <SearchFilter />
              <ClearFilterButton />
              <Button className="font-bold lg:ml-auto">
                <UserPlus strokeWidth={3} /> Add Employee
              </Button>
            </div>
            <DataTable columns={column} data={dataTable} />
          </CardContent>
        </Card>
      </main>
      <Copyright className="mt-0 mb-8 text-sm" />
    </div>
  );
}
