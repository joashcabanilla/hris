import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
interface FormErrorProps {
  title?: string;
  description?: string;
}
export const FormError = ({ title, description }: FormErrorProps) => {
  return (
    title && (
      <Alert variant="destructive" className="bg-destructive/10 border-0">
        <TriangleAlert />
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    )
  );
};
