import { CircleAlertIcon } from "lucide-react";

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
  hasCancle: boolean;
  onConfirm: () => void;
  confirmLabel: string;
  description: string;
  title: string;
  icon: React.ReactNode;
}

export default function AlertDialogComponent({
  open,
  hasCancle,
  onConfirm,
  confirmLabel,
  description,
  title,
  icon
}: AlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            {icon}
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">{description}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          {hasCancle && <AlertDialogCancel>Cancel</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm} className="font-bold">{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
