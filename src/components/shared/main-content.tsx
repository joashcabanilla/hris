"use client";

//hooks
import { useLayoutEffect, useState } from "react";

//components
import { ContentHeader } from "@/components/shared/content-header";

interface MainContentWrapperProps {
  children: React.ReactNode;
  mainModule: string;
  subModule: string;
  page?: string;
}

export function MainContentWrapper({
  children,
  mainModule,
  subModule,
  page
}: MainContentWrapperProps) {
  //local state
  const [mounted, setMounted] = useState<boolean>(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <ContentHeader mainModule={mainModule} subModule={subModule} mounted={mounted} page={page} />
      {children}
    </>
  );
}
