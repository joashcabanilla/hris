"use client";

import { UseQueryResult } from "@tanstack/react-query";

//shadcn component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";

//zustand global state
import { useTableStore } from "@/store/table-store";

type UserTypeData = {
  id: number;
  usertype: string;
  created_at: Date;
  updated_at: Date;
};

type UserType = {
  message: string;
  success: boolean;
  data: UserTypeData[];
};

interface UserTypeFilterProps {
  getUsertypeList: UseQueryResult<UserType, Error>;
}

export function UserTypeFilter({ getUsertypeList }: UserTypeFilterProps) {
  //zustand global state
  const { columnFilters, setColumnFilters, setPagination } = useTableStore();

  if (getUsertypeList.data) {
    const { data } = getUsertypeList.data;
    return (
      <div className="w-full md:w-[150px]">
        <Select
          value={(columnFilters.find((filter) => filter.id == "usertype")?.value as string) ?? ""}
          onValueChange={(usertype) => {
            setColumnFilters((old) => [
              ...old.filter((f) => f.id !== "usertype"),
              { id: "usertype", value: usertype }
            ]);
            setPagination((old) => ({ ...old, pageIndex: 0 }));
          }}
        >
          <SelectTrigger className="border-primary relative w-full cursor-pointer rounded-xl outline-0 focus-visible:ring-[0px]">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>User Type List</SelectLabel>
              {data.map((value: UserTypeData) => (
                <SelectItem key={value.id} value={value.usertype}>
                  {value.usertype}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
}
