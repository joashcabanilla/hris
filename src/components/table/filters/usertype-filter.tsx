"use client";

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

//api services
import { useGetUsertypeList } from "@/services/queries/admin-query";

//zustand global state
import { useTableStore } from "@/store/table-store";

export function UserTypeFilter() {
  const getUsertyleList = useGetUsertypeList();

  //zustand global state
  const { columnFilters, setColumnFilters, setPagination } = useTableStore();

  if (getUsertyleList.isPending) {
    return (
      <div className="w-full md:w-1/2 lg:w-[150px]">
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
          <SelectTrigger className="border-primary relative w-full cursor-pointer rounded-xl">
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
        </Select>
      </div>
    );
  } else {
    const { data } = getUsertyleList.data;
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
              {data.map(
                (value: { id: number; usertype: string; created_at: Date; updated_at: Date }) => (
                  <SelectItem key={value.id} value={value.usertype}>
                    {value.usertype}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
}
