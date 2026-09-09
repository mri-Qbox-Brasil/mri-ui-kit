import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MriPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon: LucideIcon
  /** Linha de apoio abaixo do titulo. Sem ela o header mantem o layout de uma
   *  linha so (icone e titulo centrados verticalmente). */
  description?: React.ReactNode
  count?: number
  countLabel?: string
  children?: React.ReactNode
}

export function MriPageHeader({ title, icon: Icon, description, count, countLabel, children, className, ...props }: MriPageHeaderProps) {
  const hasDescription = description != null && description !== ''

  return (
    <div className={cn("w-full h-auto min-h-[5rem] border-b border-border flex items-center justify-between py-4 px-6 bg-card/30 shrink-0", className)} {...props}>
        <div className={cn("flex gap-4", hasDescription ? "items-start" : "items-center")}>
            {/* Com descricao o icone sobe pro topo da coluna e ganha um leve
                offset pra alinhar com a linha de base do <h1>. */}
            <div className={cn("flex gap-3", hasDescription ? "items-start" : "items-center")}>
                <Icon className={cn("w-6 h-6 text-primary shrink-0", hasDescription && "mt-0.5")} />
                <div className="min-w-0">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
                    {hasDescription && (
                        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
            </div>
            {/* Badge de contagem: rounded-md e nao rounded-full porque e uma
                pilula de texto e tem que seguir o --radius do /uiconfig —
                rounded-full e 9999px fixo e ficava imune ao slider. Circulos
                de verdade (avatar, dot, spinner) continuam full. */}
            {count !== undefined && (
                <div className={cn("bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-md shrink-0", hasDescription && "mt-1")}>
                    {count} {(countLabel || 'Records').toUpperCase()}
                </div>
            )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
            {children}
        </div>
    </div>
  )
}
