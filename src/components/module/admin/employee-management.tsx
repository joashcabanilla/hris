"use client";

//icons
import { UserPlus } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { SearchFilter } from "@/components/table/filters/search-filter";

export function EmployeeManagement() {
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
              <Button className="font-bold lg:ml-auto">
                <UserPlus strokeWidth={3} /> Add Employee
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
