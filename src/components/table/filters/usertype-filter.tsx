"use client";

//shadcn component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export function UserTypeFilter() {
  return (
    <Select>
      <SelectTrigger className="border-primary h-1 cursor-pointer rounded-xl outline-0 focus-visible:ring-[0px]">
        <SelectValue placeholder="User Type" />
      </SelectTrigger>
      <SelectContent></SelectContent>
    </Select>
  );
}
