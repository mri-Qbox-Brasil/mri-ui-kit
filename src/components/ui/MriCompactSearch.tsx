import { useState } from "react"
import { MriButton } from "@/components/ui/MriButton"
import {
  MriPopover,
  MriPopoverContent,
  MriPopoverTrigger,
} from "@/components/ui/MriPopover"
import {
  MriCommand,
  MriCommandEmpty,
  MriCommandGroup,
  MriCommandInput,
  MriCommandItem,
} from "@/components/ui/MriCommand"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string | number
}

interface MriCompactSearchProps {
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function MriCompactSearch({
  options,
  value,
  onChange,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled
}: MriCompactSearchProps) {
  const [open, setOpen] = useState(false)

  return (
    <MriPopover open={open} onOpenChange={setOpen}>
      <MriPopoverTrigger asChild>
        <MriButton
          variant="ghost"
          size="icon"
          disabled={disabled}
          aria-expanded={open}
          className={cn(
            "aspect-square !h-[42px] !w-[42px] p-0 border border-input rounded-md bg-background/50 backdrop-blur-sm hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm",
            className
          )}
        >
          <Search className="h-4 w-4" />
        </MriButton>
      </MriPopoverTrigger>
      <MriPopoverContent className="w-[200px] p-0 border-border bg-popover" align="start">
        <MriCommand className="bg-transparent">
          <MriCommandInput placeholder={searchPlaceholder} className="h-9" />
          <MriCommandEmpty>{emptyMessage}</MriCommandEmpty>
          <MriCommandGroup className="max-h-60 overflow-auto p-1">
            {options.map((opt) => (
              <MriCommandItem
                key={opt.value}
                value={opt.label}
                onSelect={() => {
                  onChange(String(opt.value))
                  setOpen(false)
                }}
                className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 text-primary",
                    String(value) === String(opt.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="truncate">{opt.label}</span>
              </MriCommandItem>
            ))}
          </MriCommandGroup>
        </MriCommand>
      </MriPopoverContent>
    </MriPopover>
  )
}
