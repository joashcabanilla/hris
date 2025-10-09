"use client";

//hooks
import { useState, RefObject } from "react";
import { format, isValid, parse } from "date-fns";

//css utils
import { cn } from "@/lib/utils";

//icons
import { CalendarIcon } from "lucide-react";

//shadcn components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  id: string;
  name: string;
  inputRef: RefObject<HTMLInputElement | null>;
  disabled: boolean;
  errorState: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const DatePicker = ({
  id,
  name,
  inputRef,
  disabled,
  errorState,
  value = "",
  onChange
}: DatePickerProps) => {
  //local state
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? parse(value, "MM/dd/yyyy", new Date()) : undefined
  );

  //handle date picker on change event
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    let input = e.target.value.replace(/\D/g, "");
    if (input.length >= 5) input = input.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    else if (input.length >= 3) input = input.replace(/^(\d{2})(\d+)/, "$1/$2");
    onChange?.(input);

    const parsedDate = parse(input, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate) && input.length === 10) {
      setMonth(parsedDate);
      setSelectedDate(parsedDate);
      setOpen(false);
    } else {
      setMonth(new Date());
      setSelectedDate(undefined);
    }
  };

  //handle day picker select
  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.("");
      setMonth(new Date());
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      onChange?.(format(date, "MM/dd/yyyy"));
      setOpen(false);
    }
  };

  return (
    <div className="relative flex gap-2">
      <Input
        id={id}
        name={name}
        ref={inputRef}
        disabled={disabled}
        maxLength={10}
        type="text"
        autoComplete="false"
        placeholder="MM/DD/YYYY"
        className={cn(
          "bg-background border-primary h-9 rounded-xl border-1 text-sm font-medium placeholder:font-normal",
          errorState &&
            "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
        )}
        onInput={handleDateChange}
        onFocus={() => setOpen(true)}
        value={value}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
          onOpenAutoFocus={(event: Event) => {
            event.preventDefault();
          }}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            onSelect={handleDayPickerSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
