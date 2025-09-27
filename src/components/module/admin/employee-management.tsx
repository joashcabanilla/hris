"use client";

//hooks
import { useState, useLayoutEffect } from "react";

//icons
import { UserPlus } from "lucide-react";

//shadcn components
import {
  Card,
  CardContent,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { SelectFilter } from "@/components/table/filters/select-filter";
import { ComboboxFilter } from "@/components/table/filters/combobox-filter";

//api services
import {
  useGetEmployeeList,
  useGetDepartmentList,
  useGetPositionList,
  useGetEmploymentStatusList
} from "@/services/queries/admin-query";

//zustand global state
import { useTableStore } from "@/store/table-store";

export function EmployeeManagement() {
  //zustand global state
  const { setGlobalFilter, setColumnFilters, setPagination } = useTableStore();

  //tanstack api query
  const getEmployeeList = useGetEmployeeList();
  const getDepartmentList = useGetDepartmentList();
  const getPositionList = useGetPositionList();
  const getEmploymentStatusList = useGetEmploymentStatusList();

  //local state
  const [mounted, setMounted] = useState<boolean>(false);

  const column = columns();
  let dataTable: EmployeeManagementColumnProps[] = [];

  if (!getEmployeeList.isPending) {
    const { data } = getEmployeeList.data;
    dataTable = data;
  }

  useLayoutEffect(() => {
    setGlobalFilter("");
    setColumnFilters([]);
    setPagination({ pageIndex: 0, pageSize: 5 });
    setMounted(true);
  }, [setGlobalFilter, setColumnFilters, setPagination, setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    !getEmployeeList.isPending &&
    !getDepartmentList.isPending &&
    !getPositionList.isPending &&
    !getEmploymentStatusList.isPending && (
      <div>
        <ContentHeader mainModule="ADMIN MODULE" subModule="EMPLOYEE MANAGEMENT" />
        <main className="grid grid-cols-1 p-4">
          <Card className="shadow-lg">
            <CardHeader className="has-data-[slot=card-action]:grid-cols-1">
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>
                Create employee accounts, manage records, and update employee details.
              </CardDescription>
              <CardAction className="col-start-1 row-start-3 mt-2 self-center justify-self-start md:col-start-2 md:row-start-1 md:mt-0 md:justify-self-end">
                <Button className="font-bold">
                  <UserPlus strokeWidth={3} /> Add Employee
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {/* Employee Management Table */}
              <div className="bg-background flex flex-wrap items-center gap-3 rounded-t-xl p-4 shadow-lg">
                <SearchFilter classname="md:w-auto lg:w-1/2 xl:w-1/4" />
                <ComboboxFilter
                  filterId="department"
                  placeholder="Department"
                  options={getDepartmentList.data.data.map(
                    (value: { department: string }) => value.department
                  )}
                  classname="w-full md:w-auto"
                />
                <ComboboxFilter
                  filterId="position"
                  placeholder="Position"
                  options={getPositionList.data.data.map(
                    (value: { position: string }) => value.position
                  )}
                  classname="w-full md:w-auto"
                />
                <SelectFilter
                  filterId="employmentStatus"
                  options={getEmploymentStatusList.data.data.map((status: string[]) => ({
                    id: status,
                    value: status
                  }))}
                  placeholder="Employment Status"
                  label="Employment Status List"
                  classname="w-full md:w-auto"
                />
                <ClearFilterButton />
              </div>
              <DataTable columns={column} data={dataTable} />
            </CardContent>
          </Card>
        </main>
        <Copyright className="mt-0 mb-8 text-sm" />
      </div>
    )
  );
}
