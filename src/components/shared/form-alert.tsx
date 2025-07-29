//css utils
import { cn } from "@/lib/utils";

//shadcn components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

//icons
import { TriangleAlert, CircleCheckBig } from "lucide-react";

export type AlertType = "success" | "error";
interface FormAlertProps {
  title?: string;
  message?: string;
  type?: AlertType;
}
export const FormAlert = ({ title, message, type }: FormAlertProps) => {
  return (
    title && (
      <Alert
        variant={type == "error" ? "destructive" : "success"}
        className={cn("border-0", type == "error" ? "bg-destructive/10" : "bg-primary/10")}
      >
        {type && type == "error" ? <TriangleAlert /> : <CircleCheckBig />}
        <AlertTitle>{title}</AlertTitle>
        {message && <AlertDescription>{message}</AlertDescription>}
      </Alert>
    )
  );
};
