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
  Zap,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { type ComponentType } from "react";
import { cn } from "../../lib/utils";

export interface MriActionCardOption {
  value: string;
  label: string;
}

export type MriActionCardItemType = "text" | "dropdown" | "button";

export interface MriActionCardItem {
  id: string;
  label: string;
  option: MriActionCardItemType;
  placeholder?: string;
  disabled?: boolean;
  options?: MriActionCardOption[];
  onTextChange?: (id: string, value: string) => void;
  onDropdownSelect?: (id: string, val: MriActionCardOption) => void;
  onButtonClick?: (item: MriActionCardItem) => void;
  selectedValue?: string;
  selectedLabel?: string;
  searchPlaceholder?: string;
  noneFoundText?: string;
  selectPlaceholder?: string;
}

export interface MriActionCardProps {
  id?: string;
  label: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  isFavorite?: boolean;
  isProcessing?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onToggleFavorite?: (id: string) => void;
  items?: MriActionCardItem[];
}

export const MriActionCard = ({
  id = "",
  label,
  icon: Icon = Zap,
  isFavorite = false,
  isProcessing = false,
  disabled = false,
  onClick,
  onToggleFavorite,
  items,
}: MriActionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState<Record<string, boolean>>({});

  const isExpandable = items && items.length > 0;

  const handleCardClick = () => {
    if (isExpandable) {
      setIsOpen((v) => !v);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-card border border-border rounded-xl transition-all overflow-hidden",
        isExpandable
          ? isOpen
            ? "border-primary/50 ring-1 ring-primary/20"
            : "hover:border-primary/50 hover:bg-muted"
          : "hover:border-primary/50 hover:bg-muted cursor-pointer p-4 flex flex-col justify-between min-h-[100px]",
        isProcessing && "opacity-50 pointer-events-none",
        disabled && "opacity-40 grayscale pointer-events-none"
      )}
      onClick={!isExpandable ? handleCardClick : undefined}
    >
      <div
        className={cn(
          "flex flex-col gap-2 relative",
          isExpandable ? "w-full p-4 cursor-pointer min-h-[100px]" : "h-full"
        )}
        onClick={isExpandable ? handleCardClick : undefined}
      >
        <div className="flex justify-between items-start">
          <div
            className={cn(
              "p-2 rounded-lg border border-border transition-colors",
              isExpandable
                ? isOpen
                  ? "bg-muted border-primary/50 text-foreground"
                  : "bg-muted/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-primary"
                : "bg-muted text-muted-foreground group-hover:text-primary group-hover:border-primary/20"
            )}
          >
            {isProcessing
              ? <Loader2 className="w-5 h-5 animate-spin" />
              : <Icon className="w-5 h-5" />
            }
          </div>

          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <div
                role="button"
                tabIndex={0}
                className="p-1 text-muted-foreground hover:text-yellow-400 cursor-pointer transition-colors z-10"
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
            {isExpandable && (
              <div className="text-muted-foreground">
                {isOpen
                  ? <ChevronDown className="h-5 w-5" />
                  : <ChevronRight className="h-5 w-5" />
                }
              </div>
            )}
          </div>
        </div>

        <span className={cn(
          "font-bold transition-colors",
          isExpandable ? "text-card-foreground mt-auto" : "text-foreground/90 group-hover:text-foreground mt-auto"
        )}>
          {label}
        </span>

        {isExpandable && isOpen && (
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-border" />
        )}
      </div>

      {!isExpandable && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      {isExpandable && isOpen && (
        <div className="p-4 space-y-4 bg-muted/30">
          {items.map((item, idx) => {
            if (item.option === "text") {
              return (
                <div key={idx} className="space-y-1.5">
                  <label className={cn("text-xs font-medium text-muted-foreground ml-1", item.disabled && "opacity-40")}>
                    {item.label}
                  </label>
                  <MriInput
                    placeholder={item.placeholder || item.label}
                    className="bg-background border-border focus:border-ring h-10"
                    disabled={item.disabled}
                    onChange={(e) => item.onTextChange?.(item.id, e.target.value)}
                  />
                </div>
              );
            } else if (item.option === "dropdown") {
              const subKey = item.id;
              return (
                <div key={idx} className="space-y-1.5">
                  <label className={cn("text-xs font-medium text-muted-foreground ml-1", item.disabled && "opacity-40")}>
                    {item.label}
                  </label>
                  <MriPopover
                    open={item.disabled ? false : Boolean(popoverOpen[subKey])}
                    onOpenChange={(v: boolean) => {
                      if (!item.disabled)
                        setPopoverOpen((prev) => ({ ...prev, [subKey]: v }));
                    }}
                  >
                    <MriPopoverTrigger asChild>
                      <MriButton
                        variant="outline"
                        role="combobox"
                        disabled={item.disabled}
                        className="w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground h-10"
                      >
                        <span className="truncate">
                          {item.selectedLabel || item.selectPlaceholder || "Select..."}
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
                          {(item.options || []).map((opt) => (
                            <MriCommandItem
                              key={String(opt.value)}
                              onSelect={() => {
                                item.onDropdownSelect?.(subKey, opt);
                                setPopoverOpen((prev) => ({ ...prev, [subKey]: false }));
                              }}
                              className="aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 text-green-500",
                                  item.selectedValue === opt.value ? "opacity-100" : "opacity-0"
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
                  disabled={item.disabled}
                  className="w-full bg-secondary hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                  onClick={() => item.onButtonClick?.(item)}
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
