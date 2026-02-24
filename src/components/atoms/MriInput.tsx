import * as React from 'react'
import { cn } from '../../lib/utils'

export interface MriInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'default' | 'sm'
}

export const MriInput = React.forwardRef<HTMLInputElement, MriInputProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-input bg-background/50 px-3 text-foreground focus:border-ring focus:outline-none placeholder:text-muted-foreground transition-colors disabled:opacity-50',
          size === 'default' ? 'h-9 text-sm' : 'h-8 text-xs',
          className
        )}
      />
    )
  }
)
MriInput.displayName = 'MriInput'
