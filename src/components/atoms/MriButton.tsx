import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { mriButtonVariants } from "./mri-button-variants"

import { cn } from "../../lib/utils"

export interface MriButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mriButtonVariants> {
  asChild?: boolean
}

export const MriButton = React.forwardRef<HTMLButtonElement, MriButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(mriButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
MriButton.displayName = "MriButton"
