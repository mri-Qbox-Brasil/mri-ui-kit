import { MriButton } from '@/components/atoms/MriButton'
import { MriSimpleTooltip } from '@/components/molecules/MriTooltip'
import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { renderMriIcon, type MriIconProp } from '@/lib/icon'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export interface MriSidebarItem {
    label: string
    route?: string
    /** Ver MriIconProp: componente de icone ou elemento pronto (icon fonts). */
    icon?: MriIconProp
    onClick?: () => void
    divider?: boolean
    /** Transforma o item num rotulo de grupo. Some no modo colapsado (vira divider). */
    heading?: string
}

export interface MriSidebarProps {
    items: MriSidebarItem[]
    activeRoute?: string
    onNavigate?: (route: string) => void
    collapsed?: boolean
    onToggleCollapse?: () => void
    /** Topo da sidebar — logo, nome do servidor, avatar. */
    header?: ReactNode
    footer?: ReactNode
    children?: ReactNode
    className?: string
}

export function MriSidebar({
    items,
    activeRoute,
    onNavigate,
    collapsed = false,
    onToggleCollapse,
    header,
    footer,
    children,
    className
}: MriSidebarProps) {

  const NavButton = ({ item }: { item: MriSidebarItem }) => {
      if (item.divider) {
          return <div className="my-2 border-b border-border opacity-50" />
      }

      // Rotulo de grupo: no colapsado nao ha largura pro texto, entao vira um
      // separador simples pra nao perder a divisao visual.
      if (item.heading) {
          if (collapsed) return <div className="my-2 border-b border-border opacity-50" />
          return (
              <p className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  {item.heading}
              </p>
          )
      }

      const isActive = item.route && activeRoute === item.route
      const iconClass = cn("h-5 w-5 shrink-0", isActive && "text-primary drop-shadow-[0_0_8px_rgba(0,227,150,0.5)]")

      const icon = renderMriIcon(item.icon, iconClass)

      return (
        <MriSimpleTooltip content={collapsed ? item.label : undefined} side="right">
          <MriButton
            variant="ghost"
            className={cn(
                "w-full justify-start gap-3 relative transition-all duration-200 border",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary/10 text-primary border-primary/50 shadow-[inset_3px_0_0_0_var(--primary)]"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
                className
            )}
            onClick={() => {
                if (item.onClick) item.onClick()
                if (item.route && onNavigate) onNavigate(item.route)
            }}
          >
            {icon}
            {!collapsed && <span className={cn("truncate font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>}

            {/* Active Glow for collapsed mode */}
            {collapsed && isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-md z-[-1]" />
            )}
          </MriButton>
        </MriSimpleTooltip>
      )
  }

  return (
    <div className={cn("h-full flex flex-col items-center py-4 border-border transition-all duration-300 bg-card", collapsed ? "w-16 px-2" : "w-60 px-3", className)}>
      {header && (
        <div className={cn("w-full flex items-center shrink-0 pb-4 mb-2 border-b border-border", collapsed ? "justify-center" : "gap-2")}>
          {header}
        </div>
      )}

      <div className="flex-1 flex flex-col gap-1 w-full overflow-y-auto pr-1 no-scrollbar">
        {items.map((item, index) => (
            <NavButton key={index} item={item} />
        ))}
        {children}
      </div>

      <div className="mt-auto w-full flex flex-col gap-2 pt-4 border-t border-border">
        {footer}

        {onToggleCollapse && (
            <button
            onClick={onToggleCollapse}
            className={cn(
                "flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground w-full mt-2",
            )}
            >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
        )}
      </div>
    </div>
  )
}
