"use client";

//components
import { ContentHeader } from "@/components/shared/content-header";

export function Dashboard() {
  return (
    <>
      <ContentHeader mainModule="ADMIN MODULE" subModule="DASHBOARD" />
      <main className="p-4">Admin dashboard content</main>
    </>
  );
}
