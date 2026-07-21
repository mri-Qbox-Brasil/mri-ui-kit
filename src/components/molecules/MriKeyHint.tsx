import * as React from "react"

import { cn } from "@/lib/utils"

export interface MriKeyHintProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: React.ReactNode
  label: React.ReactNode
  danger?: boolean
}

function MriKeyHint({ keys, label, danger, className, ...props }: MriKeyHintProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide whitespace-nowrap",
        danger ? "text-red-400" : "text-foreground/60",
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1">{keys}</span>
      <span>{label}</span>
    </span>
  )
}

export { MriKeyHint }
