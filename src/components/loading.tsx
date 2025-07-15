//css utils
import { container, card } from "@/lib/tv/global";

//shadcn components
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoginProps {
  isMember: boolean;
}
export const Login = ({ isMember }: LoginProps) => {
  return (
    <div className={container({ variant: "cardCenter", height: "full" })}>
      <Card className={card({ spacing: "topbottom", width: "auth" })}>
        <CardHeader className="px-0">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-[70px] w-8/12 max-w-[300px]" />
            <Skeleton className="h-[35px] w-2/12" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Skeleton className="h-[40px] w-6/12" />
              <Skeleton className="h-[25px] w-10/12" />
            </div>
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-end">
                    <Skeleton className="h-[35px] w-5/12" />
                  </div>
                  <Skeleton className="h-[35px]" />
                  {isMember && (
                    <div className="flex justify-center">
                      <Skeleton className="h-[30px] w-11/12" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Register = () => {
  return (
    <div className={container({ variant: "cardCenter" })}>
      <Card className={card({ spacing: "topbottom", width: "auth" })}>
        <CardHeader className="px-0">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-[70px] w-8/12 max-w-[300px]" />
            <Skeleton className="h-[35px] w-2/12" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Skeleton className="h-[40px] w-6/12" />
              <Skeleton className="h-[25px] w-10/12" />
            </div>
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px] w-5/12" />
                  <Skeleton className="h-[40px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[35px]" />
                  <div className="flex justify-center">
                    <Skeleton className="h-[30px] w-11/12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
