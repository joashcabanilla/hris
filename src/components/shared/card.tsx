/* eslint-disable @next/next/no-img-element */
"use client";

//css utils
import { card } from "@/lib/tv/global";

//Shadcn Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";

//Components
import { SwitchTheme } from "@/components/shared/switch-theme";
import { Copyright } from "@/components/shared/copyright";

export const LoginHeader = () => {
  return (
    <CardHeader className="px-0">
      <div className="flex w-full items-center justify-between">
        <img alt="header" src="/header.png" draggable={false} className="w-8/12 max-w-[300px]" />
        <div className="flex items-center">
          <SwitchTheme />
        </div>
      </div>
    </CardHeader>
  );
};

interface LoginCardProps {
  children: React.ReactNode;
}
export const LoginCard = ({ children }: LoginCardProps) => {
  return (
    <Card className={card({ spacing: "topbottom", width: "auth" })}>
      <LoginHeader />
      <CardContent className="px-0">
        <div className="grid gap-4">
          {children}
          <Copyright />
        </div>
      </CardContent>
    </Card>
  );
};
