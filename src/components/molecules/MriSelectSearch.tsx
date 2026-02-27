
import { useState } from "react"

import { MriButton } from "@/components/atoms/MriButton"
import {
  MriPopover,
  MriPopoverContent,
  MriPopoverTrigger,
} from "@/components/molecules/MriPopover"
import {
  MriCommand,
  MriCommandEmpty,
  MriCommandGroup,
  MriCommandInput,
  MriCommandItem,
} from "@/components/molecules/MriCommand"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string | number
}

interface MriSelectSearchProps {
  options: Option[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  size?: "default" | "sm"
  isLoading?: boolean
  error?: boolean | string
  clearable?: boolean
}

export function MriSelectSearch({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled,
  size = "default",
  isLoading = false,
  error,
  clearable = false
}: MriSelectSearchProps) {
  const [open, setOpen] = useState(false)

  const selectedOption = options.find((opt) => String(opt.value) === String(value))

  return (
    <MriPopover open={open} onOpenChange={setOpen}>
      <MriPopoverTrigger asChild>
        <div className="w-full space-y-1">
          <MriButton
            variant="outline"
            role="combobox"
            disabled={disabled || isLoading}
            isLoading={isLoading}
            aria-expanded={open}
            size={size}
            className={cn(
              "w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground text-foreground",
              error && "border-destructive focus:ring-destructive",
              className
            )}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </MriButton>
          {typeof error === "string" && (
            <p className="text-[10px] font-medium text-destructive px-1 animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>
      </MriPopoverTrigger>
      <MriPopoverContent className="w-[--radix-popover-trigger-width] p-0 border-border bg-popover z-50">
        <MriCommand className="bg-transparent text-popover-foreground">
          <MriCommandInput placeholder={searchPlaceholder} className="h-9" />
          <MriCommandEmpty>{emptyMessage}</MriCommandEmpty>
          <MriCommandGroup className="max-h-60 overflow-auto p-1">
            {options.map((opt) => (
              <MriCommandItem
                key={opt.value}
                value={opt.label} // Command searches by value/label text content usually
                onSelect={() => {
                  const newValue = String(opt.value)
                  if (clearable && String(value) === newValue) {
                    onChange("")
                  } else {
                    onChange(newValue)
                  }
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
