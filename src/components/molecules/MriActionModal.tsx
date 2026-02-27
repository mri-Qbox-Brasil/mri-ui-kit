import React from "react";
import { MriButton, MriModal } from "../../index";
import { X, LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export type MriActionModalVariant = "default" | "destructive" | "warning";

export interface MriActionModalProps {
  title: string;
  icon: LucideIcon;
  variant?: MriActionModalVariant;
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirmDisabled?: boolean;
  maxWidth?: string;
  children: React.ReactNode;
}

export const MriActionModal = ({
  title,
  icon: Icon,
  variant = "default",
  onClose,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isConfirmDisabled = false,
  maxWidth = "max-w-sm",
  children,
}: MriActionModalProps) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive",
    warning: "bg-yellow-500/10 text-yellow-500",
  };

  const confirmBtnVariant =
    variant === "destructive" ? "destructive" : "default";

  return (
    <MriModal onClose={onClose} className={cn("w-full", maxWidth)}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-lg", variantStyles[variant])}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="font-bold text-lg text-foreground">{title}</p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">{children}</div>

      <div className="mt-6 flex gap-3">
        <MriButton onClick={onClose} variant="ghost" className="flex-1">
          {cancelLabel}
        </MriButton>
        {onConfirm && (
          <MriButton
            className={cn(
              "flex-1",
              variant === "destructive" &&
                "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            )}
            onClick={onConfirm}
            disabled={isConfirmDisabled}
            variant={confirmBtnVariant}
          >
            {confirmLabel}
          </MriButton>
        )}
      </div>
    </MriModal>
  );
};
