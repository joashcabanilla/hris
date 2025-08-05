/* eslint-disable @next/next/no-img-element */
export function SidebarHeaderComponent() {
  return (
    <div className="flex items-center gap-4 p-2">
      <img alt="logo" src="/logo.png" draggable={false} className="w-[50px]" />
      <h1 className="text-sidebar-foreground text-2xl font-extrabold tracking-widest">HRIS</h1>
    </div>
  );
}
