//shadcn components
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
}

export function ContentHeader({ mainModule, subModule, page }: contentHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-1 flex h-14 shrink-0 items-center gap-2 rounded-t-xl border-b px-4">
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
