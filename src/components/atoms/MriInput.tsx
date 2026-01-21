import * as React from 'react'
import { cn } from '../../lib/utils'

export function MriInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none placeholder:text-muted-foreground transition-colors disabled:opacity-50',
        props.className
      )}
    />
  )
}
