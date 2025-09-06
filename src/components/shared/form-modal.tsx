"use client";

//shadcn components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface FormModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onClose?: () => void;
  onEscapeKeyDown?: () => void;
}
export const FormModal = ({
  children,
  open,
  onOpenChange,
  title,
  description,
  onClose,
  onEscapeKeyDown
}: FormModalProps) => {
  return (
    <Dialog open={open} modal onOpenChange={onOpenChange}>
      <DialogContent
        onEscapeKeyDown={() => {
          onEscapeKeyDown?.();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          onClose?.();
        }}
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-screen overflow-y-auto focus:outline-0"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
