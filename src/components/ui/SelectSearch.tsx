
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
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string | number
}

interface SelectSearchProps {
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
}

export function SelectSearch({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled
}: SelectSearchProps) {
  const [open, setOpen] = useState(false)

  const selectedOption = options.find((opt) => String(opt.value) === String(value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-expanded={open}
          className={cn("w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground text-foreground", className)}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-border bg-popover">
        <Command className="bg-transparent">
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto p-1">
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.label} // Command searches by value/label text content usually
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
