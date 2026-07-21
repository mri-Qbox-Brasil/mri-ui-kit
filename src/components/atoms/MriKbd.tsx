import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

export const mriKbdVariants = cva(
  "inline-flex items-center justify-center min-w-[1.6em] h-[1.6em] px-[0.45em] rounded-[0.35em] font-mono text-[0.72em] font-bold leading-none border border-b-2 select-none align-middle",
  {
    variants: {
      variant: {
        default: "text-foreground/90 bg-foreground/[0.08] border-foreground/20",
        accent: "text-primary bg-primary/10 border-primary/40",
        danger: "text-red-400 bg-red-500/10 border-red-500/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MriKbdProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof mriKbdVariants> {}

function MriKbd({ className, variant, ...props }: MriKbdProps) {
  return <span className={cn(mriKbdVariants({ variant }), className)} {...props} />
}

export { MriKbd }
