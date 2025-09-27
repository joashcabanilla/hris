"use client";

import { useState } from "react";

//icons
import { Check, ChevronDownIcon } from "lucide-react";

//utils
import { cn } from "@/lib/utils";

//shadcn components
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

//zustand global state
import { useTableStore } from "@/store/table-store";

interface ComboboxFilterProps {
  filterId: string;
  classname?: string;
  placeholder: string;
  options: string[];
}

export const ComboboxFilter = ({
  filterId,
  classname,
  placeholder,
  options
}: ComboboxFilterProps) => {
  //zustand global state
  const { columnFilters, setColumnFilters, setPagination } = useTableStore();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={classname}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border-primary text-muted-foreground hover:text-muted-foreground dark:border-primary relative cursor-pointer justify-between rounded-xl font-normal hover:bg-transparent"
        >
          <span
            className={cn(
              "truncate",
              (columnFilters.find((filter) => filter.id == filterId)?.value as string) &&
                "text-card-foreground"
            )}
          >
            {(columnFilters.find((filter) => filter.id == filterId)?.value as string) ??
              placeholder}
          </span>
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={"Search " + placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option: string) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    setColumnFilters((old) => [
                      ...old.filter((f) => f.id !== filterId),
                      { id: filterId, value: currentValue }
                    ]);
                    setPagination((old) => ({ ...old, pageIndex: 0 }));
                    setOpen(false);
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto",
                      (columnFilters.find((filter) => filter.id == filterId)?.value as string) ===
                        option
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
