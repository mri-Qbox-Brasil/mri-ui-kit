import { useState } from 'react'
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "../../lib/utils"
// Use relative paths to import internal ui-kit components to avoid circular dependencies in its own codebase
import { MriButton } from "../atoms/MriButton"
import { MriPopover, MriPopoverContent, MriPopoverTrigger } from "../molecules/MriPopover"
import { MriCommand, MriCommandEmpty, MriCommandGroup, MriCommandInput, MriCommandItem } from "../molecules/MriCommand"

export interface MriCreatableComboboxOption {
  label: string
  value: string
  [key: string]: unknown
}

export interface MriCreatableComboboxProps {
  options: MriCreatableComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  allowCreate?: boolean
  emptyMessage?: string
  createLabelPrefix?: string
}

export const MriCreatableCombobox = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  className,
  allowCreate = true,
  emptyMessage = "No results found.",
  createLabelPrefix = "Create"
}: MriCreatableComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <MriPopover open={open} onOpenChange={setOpen}>
      <MriPopoverTrigger asChild>
        <MriButton
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between bg-card hover:bg-muted font-normal", className)}
        >
          {value
            ? (selectedOption?.label || value)
            : <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </MriButton>
      </MriPopoverTrigger>
      <MriPopoverContent className="w-[300px] p-0" align="start">
        <MriCommand>
          <MriCommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
           <MriCommandEmpty className="py-2 px-4 text-sm text-muted-foreground text-center">
             {allowCreate && searchValue ? (
                <div
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => {
                        onChange(searchValue)
                        setOpen(false)
                        setSearchValue("")
                    }}
                >
                    <Plus className="w-4 h-4" />
                    <span>{createLabelPrefix} "{searchValue}"</span>
                </div>
             ) : (
                <span>{emptyMessage}</span>
             )}
           </MriCommandEmpty>
           <MriCommandGroup className="max-h-[200px] overflow-y-auto overflow-x-hidden p-1">
              {options.map((opt) => (
                  <MriCommandItem
                      key={opt.value}
                      value={`${String(opt.label || '')} ${String(opt.value || '')}`} // Combine for better searching
                      onSelect={() => {
                          onChange(opt.value)
                          setOpen(false)
                          setSearchValue("")
                      }}
                  >
                      <Check
                      className={cn(
                          "mr-2 h-4 w-4",
                          value === opt.value ? "opacity-100" : "opacity-0"
                      )}
                      />
                      {opt.label}
                  </MriCommandItem>
              ))}
              {allowCreate && searchValue && !options.some(o => o.value === searchValue) && (
                   <MriCommandItem
                      value={searchValue}
                      onSelect={() => {
                          onChange(searchValue)
                          setOpen(false)
                          setSearchValue("")
                      }}
                      className="text-primary font-medium"
                   >
                      <Plus className="mr-2 h-4 w-4" />
                      {createLabelPrefix} "{searchValue}"
                   </MriCommandItem>
              )}
           </MriCommandGroup>
        </MriCommand>
      </MriPopoverContent>
    </MriPopover>
  )
}
