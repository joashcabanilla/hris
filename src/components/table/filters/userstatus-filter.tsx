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

//zustand global state
import { useTableStore } from "@/store/table-store";

export function UserStatusFilter() {
  //zustand global state
  const { columnFilters, setColumnFilters, setPagination } = useTableStore();

  const options = ["Active", "Locked", "Deactivated"];

  return (
    <div className="w-full md:w-[150px]">
      <Select
        value={(columnFilters.find((filter) => filter.id == "status")?.value as string) ?? ""}
        onValueChange={(status) => {
          setColumnFilters((old) => [
            ...old.filter((f) => f.id !== "status"),
            { id: "status", value: status }
          ]);
          setPagination((old) => ({ ...old, pageIndex: 0 }));
        }}
      >
        <SelectTrigger className="border-primary relative w-full cursor-pointer rounded-xl outline-0 focus-visible:ring-[0px]">
          <SelectValue placeholder="User Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status List</SelectLabel>
            {options.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
