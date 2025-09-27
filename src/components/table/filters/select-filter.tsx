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

type Option = {
  id?: string;
  value: string;
  created_at?: Date;
  updated_at?: Date;
};
interface SelectFilterProps {
  filterId: string;
  placeholder: string;
  label: string;
  options: Option[];
  classname?: string;
}
export const SelectFilter = ({
  filterId,
  placeholder,
  label,
  options,
  classname
}: SelectFilterProps) => {
  //zustand global state
  const { columnFilters, setColumnFilters, setPagination } = useTableStore();

  return (
    <div className={classname}>
      <Select
        value={(columnFilters.find((filter) => filter.id == filterId)?.value as string) ?? ""}
        onValueChange={(value) => {
          setColumnFilters((old) => [
            ...old.filter((f) => f.id !== filterId),
            { id: filterId, value: value }
          ]);
          setPagination((old) => ({ ...old, pageIndex: 0 }));
        }}
      >
        <SelectTrigger className="border-primary relative w-full cursor-pointer rounded-xl outline-0 focus-visible:ring-[0px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option: Option) => (
              <SelectItem key={option.id} value={option.id ?? option.value}>
                {option.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
