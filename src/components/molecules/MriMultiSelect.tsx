
import { useState, useCallback } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MriButton } from "@/components/atoms/MriButton"
import { MriBadge } from "@/components/atoms/MriBadge"
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

export interface MriMultiSelectOption {
  label: string
  value: string | number
}

interface MriMultiSelectProps {
  options: MriMultiSelectOption[]
  value: (string | number)[]
  onChange: (value: (string | number)[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  disabled?: boolean
  maxVisibleValues?: number
  isLoading?: boolean
  error?: boolean | string
}

export function MriMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled,
  maxVisibleValues = 3,
  isLoading = false,
  error,
}: MriMultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleUnselect = useCallback((optionValue: string | number) => {
    onChange(value.filter((val) => val !== optionValue))
  }, [value, onChange])

  const handleSelect = useCallback((optionValue: string | number) => {
    if (value.includes(optionValue)) {
      handleUnselect(optionValue)
    } else {
      onChange([...value, optionValue])
    }
  }, [value, onChange, handleUnselect])

  const selectedOptions = options.filter((opt) => value.includes(opt.value))

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
            className={cn(
              "w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground text-foreground min-h-[40px] h-auto py-2",
              error && "border-destructive focus:ring-destructive",
              className
            )}
          >
            <div className="flex flex-wrap gap-1 items-center max-w-[90%]">
              {selectedOptions.length > 0 ? (
                <>
                  {selectedOptions.slice(0, maxVisibleValues).map((opt) => (
                    <MriBadge
                      key={opt.value}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      <span className="truncate max-w-[100px]">{opt.label}</span>
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUnselect(opt.value)
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={() => handleUnselect(opt.value)}
                      >
                        <X className="h-3 w-3 text-primary/60 hover:text-primary transition-colors" />
                      </button>
                    </MriBadge>
                  ))}
                  {selectedOptions.length > maxVisibleValues && (
                    <MriBadge variant="secondary" className="bg-muted text-muted-foreground border-border">
                      +{selectedOptions.length - maxVisibleValues}
                    </MriBadge>
                  )}
                </>
              ) : (
                <span className="text-muted-foreground font-normal">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </MriButton>
          {typeof error === "string" && (
            <p className="text-[10px] font-medium text-destructive px-1 animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>
      </MriPopoverTrigger>
      <MriPopoverContent className="w-[--radix-popover-trigger-width] p-0 border-border bg-popover z-50 shadow-2xl overflow-hidden rounded-xl">
        <MriCommand className="bg-transparent text-popover-foreground">
          <MriCommandInput 
            placeholder={searchPlaceholder} 
            className="h-10 border-none focus:ring-0 bg-transparent" 
          />
          <MriCommandEmpty className="py-6 text-sm text-center text-muted-foreground">
            {emptyMessage}
          </MriCommandEmpty>
          <MriCommandGroup className="max-h-64 overflow-auto p-1.5 space-y-0.5">
            {options.map((opt) => (
              <MriCommandItem
                key={opt.value}
                value={opt.label}
                onSelect={() => handleSelect(opt.value)}
                className="aria-selected:bg-primary/10 aria-selected:text-primary rounded-lg cursor-pointer flex items-center justify-between py-2.5 px-3 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                   <div className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all duration-200",
                        value.includes(opt.value) 
                        ? "bg-primary border-primary" 
                        : "border-border bg-background"
                   )}>
                        {value.includes(opt.value) && <Check className="h-3 w-3 text-primary-foreground stroke-[3px]" />}
                   </div>
                   <span className={cn(
                        "text-sm font-medium",
                        value.includes(opt.value) ? "text-primary" : "text-foreground"
                   )}>
                        {opt.label}
                   </span>
                </div>
              </MriCommandItem>
            ))}
          </MriCommandGroup>
        </MriCommand>
      </MriPopoverContent>
    </MriPopover>
  )
}
