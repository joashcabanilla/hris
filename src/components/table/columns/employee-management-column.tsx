"use client";

//utils
import { formatDate } from "@/lib/utils";

//shadcn components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

//icons
import { CircleUserRound, MoreHorizontal, View } from "lucide-react";

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

//data table type
import { HiddenColumnDef } from "@/components/shared/data-table";

export type EmployeeManagementColumnProps = {
  id: string;
  employeeNo: string;
  userId: string;
  pbno: string | null;
  memid: string | null;
  name: string;
  profile_picture: string | null;
  department: string;
  position: string;
  employmentStatus: string;
  birthdate: Date;
  gender: string;
  civilStatus: string;
  contactNo: string;
  region: number;
  province: number;
  city: number;
  barangay: number;
  address: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactNo: string;
  dateHired: Date;
  dateResigned: Date | null;
  tin: string;
  sss: string;
  pagibig: string;
  philhealth: string;
};

interface ColumnsProps {
  handleViewEmployee: (employee: EmployeeManagementColumnProps) => void;
}

export const columns = ({
  handleViewEmployee
}: ColumnsProps): HiddenColumnDef<EmployeeManagementColumnProps, boolean>[] => [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-center">{row.original.id.toLocaleString()}</p>
  },
  {
    accessorKey: "name",
    header: "Employee",
    size: 300,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="border-primary h-9 w-9 rounded-full border">
            <AvatarImage
              src={employee.profile_picture ?? undefined}
              alt={employee.name}
              draggable={false}
            />
            <AvatarFallback className="rounded-2xl">
              <CircleUserRound size={50} />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-left whitespace-normal">{employee.name}</p>
            <p className="text-muted-foreground text-left whitespace-normal">{employee.position}</p>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "employeeNo",
    header: "Employee No",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-center">{row.original.employeeNo}</p>
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <p className="text-center">{row.original.department}</p>
  },
  {
    accessorKey: "position",
    header: "Department",
    hidden: true
  },
  {
    accessorKey: "employmentStatus",
    header: "Employment Status",
    cell: ({ row }) => {
      type variantProps = "success" | "warning" | "info";
      let variant: variantProps = "success";
      switch (row.original.employmentStatus) {
        case "Regular":
          variant = "success";
          break;
        case "Probationary":
          variant = "warning";
          break;
        case "Contractual":
          variant = "info";
          break;
      }
      return (
        <div className="flex w-full items-center justify-center">
          {row.original.employmentStatus && (
            <Badge variant={variant}>{row.original.employmentStatus}</Badge>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "dateHired",
    header: "Date Hired",
    enableColumnFilter: false,
    cell: ({ row }) => <p className="text-center">{formatDate(row.original.dateHired)}</p>
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 50,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const data = row.original;
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
                onClick={() => handleViewEmployee(data)}
                variant="default"
                className="focus:bg-accent focus:text-accent-foreground text-xs font-medium"
              >
                <View className="hover:text-primary-foreground" strokeWidth={2} />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
  }
];
