"use client";

//shadcn components
import { Button } from "@/components/ui/button";

//icons
import { FunnelX } from "lucide-react";

//zustand global state
import { useTableStore } from "@/store/table-store";

export const ClearFilterButton = () => {
  //zustand global state
  const { setGlobalFilter, setColumnFilters, setPagination } = useTableStore();

  return (
    <Button
      className="bg-amber-600/90 font-bold hover:bg-amber-600 focus-visible:ring-amber-400"
      onClick={() => {
        setColumnFilters([]);
        setGlobalFilter("");
        setPagination((old) => ({ ...old, pageIndex: 0 }));
      }}
    >
      <FunnelX strokeWidth={3} /> Clear Filter
    </Button>
  );
};
