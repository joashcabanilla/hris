"use client";

//icons
import { Search } from "lucide-react";

//shadcn components
import { Input } from "@/components/ui/input";

//zustand global state
import { useTableStore } from "@/store/table-store";

export function SearchFilter() {
  const { globalFilter, setGlobalFilter } = useTableStore();

  return (
    <div className="relative grow">
      <Search
        className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex h-9 items-center justify-center ps-2 peer-disabled:opacity-50"
        size={25}
      />
      <Input
        name="searchfilter"
        placeholder="Search"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="peer border-primary h-9 rounded-xl ps-7 indent-1 text-sm font-normal"
      />
    </div>
  );
}
