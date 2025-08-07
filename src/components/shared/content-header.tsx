//shadcn components
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

//utils
import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface contentHeaderProps {
  mainModule: string;
  subModule: string;
  page?: string;
  mounted: boolean;
}

export function ContentHeader({ mainModule, subModule, page, mounted }: contentHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background flex h-14 shrink-0 items-center gap-2 rounded-t-xl border-b px-4",
        mounted && "sticky top-0"
      )}
    >
      <SidebarTrigger className="-ml-1 rounded-4xl" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        {page ? (
          <BreadcrumbList>
            <BreadcrumbItem className="pointer-events-none hidden md:block">
              <BreadcrumbLink>{mainModule}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="pointer-events-none hidden md:block">
              <BreadcrumbLink>{subModule}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="pointer-events-none">
              <BreadcrumbPage className="font-bold tracking-wider">{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        ) : (
          <BreadcrumbList>
            <BreadcrumbItem className="pointer-events-none hidden md:block">
              <BreadcrumbLink>{mainModule}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="pointer-events-none">
              <BreadcrumbPage className="font-bold tracking-wider">{subModule}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        )}
      </Breadcrumb>
    </header>
  );
}
