import * as React from "react"

import { cn } from "../../lib/utils"

export interface MriCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adiciona um gradient hover sutil (primary/10 -> transparent) que aparece
   * em fade-in no hover do card. Padrao "ambient glow" usado em listas de
   * cards interativos (eg PermissionCard do mri_Qadmin).
   */
  glow?: boolean
}

const MriCard = React.forwardRef<HTMLDivElement, MriCardProps>(
  ({ className, glow = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        glow && "relative overflow-hidden group transition-all",
        className
      )}
      {...props}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {glow ? <div className="relative">{children}</div> : children}
    </div>
  )
)
MriCard.displayName = "MriCard"

const MriCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
MriCardHeader.displayName = "MriCardHeader"

const MriCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
MriCardTitle.displayName = "MriCardTitle"

const MriCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
MriCardDescription.displayName = "MriCardDescription"

const MriCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
MriCardContent.displayName = "MriCardContent"

const MriCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
MriCardFooter.displayName = "MriCardFooter"

export { MriCard, MriCardHeader, MriCardFooter, MriCardTitle, MriCardDescription, MriCardContent }
