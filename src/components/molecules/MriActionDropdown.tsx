import { useState } from "react";
import {
  MriButton,
  MriInput,
  MriPopover,
  MriPopoverContent,
  MriPopoverTrigger,
  MriCommand,
  MriCommandEmpty,
  MriCommandGroup,
  MriCommandInput,
  MriCommandItem,
} from "../../index";
import {
  Check,
  ChevronsUpDown,
  Star,
  ChevronDown,
  ChevronRight,
  MousePointerClick,
} from "lucide-react";
import { cn } from "../../lib/utils";

// Define the shape of our abstract dropdown items
export interface MriActionDropdownOption {
  value: string;
  label: string;
}

export type MriActionDropdownItemType = "text" | "dropdown" | "button";

export interface MriActionDropdownItem {
  id: string; // unique identifier for the specific field
  label: string;
  option: MriActionDropdownItemType;
  placeholder?: string;

  // For 'dropdown' option
  options?: MriActionDropdownOption[];

  // Callbacks
  onTextChange?: (id: string, value: string) => void;
  onDropdownSelect?: (id: string, val: MriActionDropdownOption) => void;
  onButtonClick?: (item: MriActionDropdownItem) => void;

  // Currently selected option value for this field (for 'dropdown' only)
  selectedValue?: string;
  selectedLabel?: string;

  // Translation fallbacks
  searchPlaceholder?: string;
  noneFoundText?: string;
  selectPlaceholder?: string;
}

export interface MriActionDropdownProps {
  id?: string;
  label: string;
  isFavorite?: boolean;
  dropdownItems?: MriActionDropdownItem[];
  onToggleFavorite?: (id: string) => void;
}

export const MriActionDropdown = ({
  id = "",
  label,
  isFavorite = false,
  dropdownItems = [],
  onToggleFavorite,
}: MriActionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({});

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl transition-all overflow-hidden group",
        isOpen
          ? "border-primary/50 ring-1 ring-primary/20"
          : "hover:border-primary/50 hover:bg-muted"
      )}
    >
      <div
        className="w-full p-4 cursor-pointer flex flex-col gap-2 relative min-h-[100px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start">
          <div
            className={cn(
              "p-2 rounded-lg border border-border transition-colors",
              isOpen
                ? "bg-muted border-primary/50 text-foreground"
                : "bg-muted/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
            )}
          >
            <MousePointerClick className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <div
                role="button"
                tabIndex={0}
                className="p-1 text-muted-foreground hover:text-yellow-400 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(id);
                }}
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    isFavorite && "fill-yellow-400 text-yellow-400"
                  )}
                />
              </div>
            )}
            <div className="text-muted-foreground">
              {isOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>

        <span className="font-bold text-card-foreground mt-auto">{label}</span>
        {isOpen && (
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-border" />
        )}
      </div>

      {isOpen && (
        <div className="p-4 space-y-4 bg-muted/30">
          {dropdownItems.map((item, idx) => {
            if (item.option === "text") {
              return (
                <div key={idx} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground ml-1">
                    {item.label}
                  </label>
                  <MriInput
                    placeholder={item.placeholder || item.label}
                    className="bg-background border-border focus:border-ring h-10"
                    onChange={(e) => {
                      if (item.onTextChange) {
                        item.onTextChange(item.id, e.target.value);
                      }
                    }}
                  />
                </div>
              );
            } else if (item.option === "dropdown") {
              const options = item.options || [];
              const subKey = item.id;

              return (
                <div key={idx} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground ml-1">
                    {item.label}
                  </label>
                  <MriPopover
                    open={Boolean(popoverOpen[subKey])}
                    onOpenChange={(v: boolean) =>
                      setPopoverOpen((prev) => ({ ...prev, [subKey]: v }))
                    }
                  >
                    <MriPopoverTrigger asChild>
                      <MriButton
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground h-10"
                      >
                        <span className="truncate">
                          {item.selectedLabel ||
                            item.selectPlaceholder ||
                            "Select..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </MriButton>
                    </MriPopoverTrigger>
                    <MriPopoverContent className="w-[300px] p-0 border-border bg-popover">
                      <MriCommand className="bg-transparent">
                        <MriCommandInput
                          placeholder={item.searchPlaceholder || "Search..."}
                          className="h-9"
                        />
                        <MriCommandEmpty>
                          {item.noneFoundText || "No results found."}
                        </MriCommandEmpty>
                        <MriCommandGroup className="max-h-64 overflow-auto p-1">
                          {options.map((opt) => (
                            <MriCommandItem
                              key={String(opt.value)}
                              onSelect={() => {
                                if (item.onDropdownSelect) {
                                  item.onDropdownSelect(subKey, {
                                    value: opt.value,
                                    label: opt.label,
                                  });
                                }
                                setPopoverOpen((prev) => ({
                                  ...prev,
                                  [subKey]: false,
                                }));
                              }}
                              className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-green-500",
                                  item.selectedValue === opt.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <span className="truncate">{opt.label}</span>
                            </MriCommandItem>
                          ))}
                        </MriCommandGroup>
                      </MriCommand>
                    </MriPopoverContent>
                  </MriPopover>
                </div>
              );
            } else if (item.option === "button") {
              return (
                <MriButton
                  key={idx}
                  variant="secondary"
                  className="w-full bg-secondary hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                  onClick={() => {
                     if (item.onButtonClick) {
                        item.onButtonClick(item)
                     }
                  }}
                >
                  {item.label}
                </MriButton>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};
