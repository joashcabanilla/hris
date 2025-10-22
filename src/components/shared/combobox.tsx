"use client";
//hooks
import { useState, RefObject } from "react";

//utils
import { cn } from "@/lib/utils";

//icons
import { Check, ChevronDownIcon } from "lucide-react";

//shadcn components
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

type optionsType = { id: string; label: string; value: string };
interface ComboboxProps {
  id: string;
  name: string;
  placeholder: string;
  options: optionsType[];
  errorState: boolean;
  value?: string;
  onChange?: (value: string) => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
}

export const Combobox = ({
  id,
  name,
  placeholder,
  options,
  errorState,
  value = "",
  onChange,
  buttonRef
}: ComboboxProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={options.length === 0}
          className={cn(
            "border-primary text-muted-foreground hover:text-muted-foreground dark:border-primary relative w-full cursor-pointer justify-between rounded-xl font-normal hover:bg-transparent",
            errorState &&
              "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
          )}
        >
          <span
            className={cn(
              "truncate text-sm",
              options.find((option) => option.value.toString() === value)?.label &&
                "text-card-foreground font-medium"
            )}
          >
            {options.find((option) => option.value.toString() === value)?.label ?? placeholder}
          </span>
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="center">
        <Command>
          <CommandInput placeholder={"Search " + placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No {placeholder} Found.</CommandEmpty>
            <CommandGroup>
              {options.map((option: optionsType) => (
                <CommandItem
                  key={option.id}
                  value={option.value}
                  onSelect={() => {
                    setOpen(false);
                    onChange?.(option.value.toString());
                  }}
                >
                  {option.label}
                  <Check
                    className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")}
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
