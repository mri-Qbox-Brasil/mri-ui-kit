import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string | number
}

interface CompactSearchProps {
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function CompactSearch({
  options,
  value,
  onChange,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled
}: CompactSearchProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
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
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-border bg-popover" align="start">
        <Command className="bg-transparent">
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto p-1">
            {options.map((opt) => (
              <CommandItem
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
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
