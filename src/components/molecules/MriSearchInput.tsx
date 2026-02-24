import { Search } from 'lucide-react'
import { MriInput } from '@/components/atoms/MriInput'
import { cn } from '@/lib/utils'

export interface MriSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  width?: string
  size?: "default" | "sm"
}

export function MriSearchInput({
  value,
  onChange,
  placeholder,
  className,
  width = "w-80",
  size = "default"
}: MriSearchInputProps) {
  return (
    <div className={cn("relative", width, className)}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <MriInput
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size={size}
            className={cn("pl-9 bg-card border-border focus:border-primary/50 w-full transition-colors", size === "default" && "h-10")}
        />
    </div>
  )
}
