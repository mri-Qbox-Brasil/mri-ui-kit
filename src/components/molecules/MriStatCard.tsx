import * as React from "react"
import { cn } from "../../lib/utils"

/**
 * Variantes de cor disponiveis. `default` usa o accent da suite
 * (--primary), os outros sao cores tematicas independentes do tema do
 * usuario — escolha pela semantica do dado exibido (ex: warning pra
 * alertas, success pra metricas positivas).
 */
export type MriStatCardVariant =
  | "default"
  | "warning"
  | "info"
  | "success"
  | "purple"
  | "indigo"
  | "orange"
  | "destructive"

export interface MriStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rotulo do dado (eg "Jogadores Online", "Vendas Hoje"). */
  title: string
  /** Valor principal. Numero ou string ja formatada (ex: "$1,200"). */
  value: string | number
  /** Icone lucide-react (ou qualquer ReactNode). Renderizado dentro de uma caixinha translucida no topo direito. */
  icon: React.ReactNode
  /** Cor do gradient + texto do valor. Default usa o accent da suite. */
  variant?: MriStatCardVariant
  /** Sublabel opcional (ex: "+12% vs ontem"). */
  trend?: React.ReactNode
}

// Classes por variante. `default` ancora no token --primary da suite,
// reagindo automaticamente a convar mri:color. Demais variantes usam
// cores Tailwind diretas (independentes do accent).
const VARIANT_CLASSES: Record<MriStatCardVariant, string> = {
  default: "from-primary/10 to-primary/5 border-primary/20 text-primary",
  warning: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-500",
  info: "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-500",
  success: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-500",
  purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-500",
  indigo: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 text-indigo-500",
  orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-500",
  destructive: "from-destructive/10 to-destructive/5 border-destructive/20 text-destructive",
}

/**
 * Card de metrica/estatistica com gradient diagonal e icone. Pattern
 * canonico de dashboard MRI (mri_Qadmin/DashboardStats). Reuso em
 * qualquer painel admin de plugin.
 *
 * ```tsx
 * <MriStatCard
 *   title="Jogadores Online"
 *   value={42}
 *   icon={<Users className="w-6 h-6" />}
 *   variant="success"
 * />
 * ```
 *
 * Para grids responsivos tipicos: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`.
 */
export const MriStatCard = React.forwardRef<HTMLDivElement, MriStatCardProps>(
  ({ title, value, icon, variant = "default", trend, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-6 rounded-2xl border bg-gradient-to-br transition-all hover:scale-[1.02] duration-300 group",
          VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-background/50 border border-current/10 group-hover:border-current/20 transition-colors">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-3xl font-black tracking-tight text-foreground tabular-nums">
            {value}
          </h3>
          {trend && <div className="text-xs text-muted-foreground mt-1">{trend}</div>}
        </div>
      </div>
    )
  }
)
MriStatCard.displayName = "MriStatCard"
