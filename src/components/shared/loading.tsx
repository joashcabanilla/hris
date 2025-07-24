//css utils
import { container, card } from "@/lib/tv/global";

//shadcn components
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Login = () => {
  return (
    <div className={container({ variant: "cardCenter", height: "full" })}>
      <Card className={card({ spacing: "topbottom", width: "auth" })}>
        <CardHeader className="px-0">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-[55px] w-8/12 max-w-[300px]" />
            <Skeleton className="h-[30px] w-2/12" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Skeleton className="h-[35px] w-6/12" />
              <Skeleton className="h-[20px] w-10/12" />
            </div>
            <div className="w-full space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Skeleton className="h-[30px] w-5/12" />
                  <Skeleton className="h-[35px]" />
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-[30px] w-5/12" />
                  <Skeleton className="h-[35px]" />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-end">
                    <Skeleton className="h-[30px] w-5/12" />
                  </div>
                  <Skeleton className="h-[35px]" />
                </div>
                <Skeleton className="h-[20px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const VerifyEmail = () => {
  return (
    <div className={container({ variant: "cardCenter" })}>
      <Card className={card({ spacing: "topbottom", width: "auth" })}>
        <CardHeader className="px-0">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-[55px] w-8/12 max-w-[300px]" />
            <Skeleton className="h-[30px] w-2/12" />
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Skeleton className="h-[35px] w-6/12" />
              <Skeleton className="h-[20px] w-10/12" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-[35px] w-9/12" />
              <Skeleton className="h-[25px] w-6/12" />
              <Skeleton className="h-[25px] w-10/12 mt-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
