"use client";

import { cn } from "@/lib/utils";

interface CopyrightProps {
  className?: string;
}
export const Copyright = ({ className }: CopyrightProps) => {
  return (
    <div className={cn("text-muted-foreground mt-4 text-center text-xs", className)}>
      <p>
        © 2025 NVDC-HRIS · Developed by
        <a href="https://github.com/joashcabanilla" target="_blank">
          {" "}
          Joash Cabanilla
        </a>
      </p>
    </div>
  );
};
