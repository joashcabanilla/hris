//utils
import { cn } from "@/lib/utils";

//shadcn components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  open: boolean;
  hasCancel: boolean;
  onConfirm: () => void;
  confirmLabel: string;
  confirmClassName?: string;
  description: string;
  title: string;
  icon: React.ReactNode;
  onCancel?: () => void;
}

export default function AlertDialogComponent({
  open,
  hasCancel,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmClassName,
  description,
  title,
  icon
}: AlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            {icon}
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          {hasCancel && (
            <AlertDialogCancel onClick={onCancel} className="focus-visible:ring-[0px]">
              Cancel
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={onConfirm} className={cn("font-bold", confirmClassName)}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
