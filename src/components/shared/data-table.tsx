"use client";

//hooks
import { useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type Table as ReactTable
} from "@tanstack/react-table";

//utils
import { cn } from "@/lib/utils";

//icons
import { ChevronLeft, ChevronRight } from "lucide-react";

//shadcn component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

//zustand globla state
import { useTableStore } from "@/store/table-store";

export type HiddenColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  hidden?: boolean;
};

interface DataTableProps<TData, TValue> {
  columns: HiddenColumnDef<TData, TValue>[];
  data: TData[];
}

function PaginationControls<TData>({ table }: { table: ReactTable<TData> }) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-4 py-4 sm:flex-row sm:space-y-0 sm:space-x-2">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="disabled:hover:text-muted-foreground disabled:hover:border-border hover:border-primary hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="text-muted-foreground hidden px-2 lg:block">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => table.setPageIndex((page as number) - 1)}
              className={cn(
                currentPage === page
                  ? "bg-primary hover:accent text-primary-foreground"
                  : "hover:border-primary hover:bg-accent",
                "hidden lg:block"
              )}
            >
              {page}
            </Button>
          )
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="disabled:hover:text-muted-foreground disabled:hover:border-border hover:border-primary hover:bg-accent hover:text-accent-foreground disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const {
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination
  } = useTableStore();

  const columnVisibility = Object.fromEntries(
    columns.map((col) => {
      const key =
        "accessorKey" in col && typeof col.accessorKey === "string"
          ? col.accessorKey
          : (col.id ?? "");
      return [key, !col.hidden];
    })
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
      columnVisibility
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false
  });

  const handleEntries = useCallback(
    (value: string) => {
      const size = parseInt(value);
      setPagination({ pageIndex: 0, pageSize: size });
    },
    [setPagination]
  );

  return (
    <div className="rounded-b-xl shadow-lg">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="bg-primary text-primary-foreground pointer-events-none text-center text-sm font-bold"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="bg-background hover:bg-primary/15 border-b-2 text-xs font-medium"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="bg-background h-20 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="bg-background flex flex-wrap items-center justify-between gap-2 rounded-b-xl border-t-2 p-2 lg:flex-nowrap">
        <span className="w-full text-center text-sm lg:w-fit">
          Showing{" "}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
            (table.getFilteredRowModel().rows.length > 0 ? 1 : 0)}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </span>
        <div className="flex w-full items-center justify-center gap-4 lg:w-fit lg:justify-start">
          <div>
            <Select defaultValue="5" onValueChange={handleEntries}>
              <SelectTrigger className="border-primary cursor-pointer rounded-xl outline-0 focus-visible:ring-[0px]">
                <SelectValue placeholder="Entries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Entries</SelectItem>
                <SelectItem value="10">10 Entries</SelectItem>
                <SelectItem value="25">25 Entries</SelectItem>
                <SelectItem value="50">50 Entries</SelectItem>
                <SelectItem value="100">100 Entries</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PaginationControls table={table} />
        </div>
      </div>
    </div>
  );
}
