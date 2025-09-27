"use client";

import * as React from "react";

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

interface ComboboxFilterProps {
  classname?: string;
  placeholder: string;
  options: string[];
}

export const ComboboxFilter = ({ classname, placeholder, options }: ComboboxFilterProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={classname}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border-primary text-muted-foreground hover:text-muted-foreground relative cursor-pointer justify-between rounded-xl font-normal hover:bg-transparent"
        >
          <span className={cn("truncate", value && "text-card-foreground")}>
            {value ? options.find((option: string) => option === value) : placeholder}
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
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option}
                  <Check
                    className={cn("ml-auto", value === option ? "opacity-100" : "opacity-0")}
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
