import { MriButton } from "@/components/atoms/MriButton"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MriEconomyCardProps {
  label: string
  amount: number | string
  amountColorClass?: string
  onAdd?: () => void
  onRemove?: () => void
}

export function MriEconomyCard({
  label,
  amount,
  amountColorClass = "text-foreground",
  onAdd,
  onRemove
}: MriEconomyCardProps) {
  return (
    <div className="bg-card border border-border p-4 rounded-lg flex items-center justify-between">
      <div>
        <div className="text-xs text-muted-foreground font-bold uppercase">{label}</div>
        <div className={cn("text-xl font-bold font-mono", amountColorClass)}>
          {amount}
        </div>
      </div>
      <div className="flex gap-1">
        <MriButton
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded bg-muted hover:bg-muted/80"
          onClick={onAdd}
        >
          <Plus className="w-3.5 h-3.5" />
        </MriButton>
        <MriButton
          size="icon"
          variant="ghost"
          className="h-7 w-7 rounded bg-muted hover:bg-muted/80"
          onClick={onRemove}
        >
          <Minus className="w-3.5 h-3.5" />
        </MriButton>
      </div>
    </div>
  )
}
