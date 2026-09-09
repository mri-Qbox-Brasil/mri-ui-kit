import type { LucideIcon } from 'lucide-react'
import { MriProgressBar } from '@/components/atoms/MriProgressBar'
import { cn } from '@/lib/utils'

export interface MriVitalBarProps {
    /** Valor ja normalizado em 0–100. */
    value: number
    icon: LucideIcon
    /** Cor do icone e do preenchimento. */
    color: string
    /** Nome do vital — usado no `title` e como rotulo de acessibilidade. */
    label?: string
    /** Clique na linha inteira (ex.: abrir o modal de ajuste). */
    onClick?: () => void
    /** Clique so no icone (ex.: acao rapida). Nao propaga pro `onClick`. */
    onIconClick?: () => void
    disabled?: boolean
    /** Percentual numerico a direita. Default: true. */
    showValue?: boolean
    className?: string
}

/**
 * Linha de vital: icone + barra de progresso + percentual. E a unidade que o
 * [MriPlayerVitals] repete nos modos `mini` e `compact`, exposta a parte pra
 * montar HUDs proprios sem herdar o layout do painel inteiro.
 *
 * ```tsx
 * <MriVitalBar value={hp} icon={Heart} color="#ef4444" label="Health" onClick={openAdjust} />
 * ```
 */
export function MriVitalBar({
    value,
    icon: Icon,
    color,
    label,
    onClick,
    onIconClick,
    disabled,
    showValue = true,
    className,
}: MriVitalBarProps) {
    const clickable = Boolean(onClick) && !disabled

    return (
        <div
            className={cn(
                'flex items-center gap-3 w-full transition-all duration-300',
                clickable && 'cursor-pointer hover:bg-foreground/[0.03] p-1.5 -m-1.5 rounded-lg group/vbar active:scale-[0.98]',
                disabled && 'opacity-40 grayscale pointer-events-none',
                className
            )}
            onClick={!disabled ? onClick : undefined}
            title={clickable && label ? `Adjust ${label}` : undefined}
        >
            <div
                className={cn('relative', onIconClick && !disabled && 'cursor-pointer hover:scale-110 transition-transform')}
                onClick={(e) => {
                    if (onIconClick && !disabled) {
                        e.stopPropagation()
                        onIconClick()
                    }
                }}
            >
                <Icon size={14} className="shrink-0 transition-all duration-500 group-hover/vbar:scale-110" style={{ color }} />
                <div
                    className="absolute inset-0 blur-[4px] opacity-0 group-hover/vbar:opacity-40 transition-opacity"
                    style={{ backgroundColor: color }}
                />
            </div>

            <MriProgressBar value={value} color={color} className="flex-1 shrink-0" aria-label={label} />

            {showValue && (
                <span className="text-[10px] font-black font-mono opacity-40 w-8 text-right group-hover/vbar:opacity-100 group-hover/vbar:text-foreground transition-all shrink-0">
                    {Math.round(value)}%
                </span>
            )}
        </div>
    )
}
