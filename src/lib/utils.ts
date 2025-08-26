import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatInTimeZone } from "date-fns-tz";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(datetime: Date) {
  return formatInTimeZone(datetime, "Asia/Manila", "mm/dd/yyyy hh:mm:ss a");
}
