import * as React from 'react'
import { cn } from '../../lib/utils'
import { MriSwitch } from '../atoms/MriSwitch'

export interface MriSettingToggleProps {
    /** Titulo curto da configuracao (linha principal). */
    label: string
    /** Texto auxiliar opcional abaixo do titulo. */
    description?: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
    /** Icone opcional a esquerda do texto (componente, ex: lucide). */
    icon?: React.ReactNode
    className?: string
}

/**
 * Linha de configuracao booleana — titulo + descricao opcional a esquerda e um
 * `MriSwitch` a direita. A linha inteira e clicavel. Pensado pra listas densas
 * de toggles dentro de um `MriCard`/secao (paineis de settings, config de HUD,
 * Qadmin). Reage ao accent via tokens.
 *
 * ```tsx
 * <MriSettingToggle
 *   label="Minimapa no veiculo"
 *   description="Mostra o minimapa apenas dentro de veiculos"
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 * ```
 */
export const MriSettingToggle = ({
    label,
    description,
    checked,
    onCheckedChange,
    disabled = false,
    icon,
    className,
}: MriSettingToggleProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/50',
                className
            )}
        >
            {icon && <span className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
                {description && (
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
                )}
            </div>
            {/* Switch puramente apresentacional: o clique e capturado pelo botao
                pai (pointer-events-none evita double-toggle). */}
            <span className="pointer-events-none shrink-0">
                <MriSwitch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} aria-label={label} />
            </span>
        </button>
    )
}

MriSettingToggle.displayName = 'MriSettingToggle'
