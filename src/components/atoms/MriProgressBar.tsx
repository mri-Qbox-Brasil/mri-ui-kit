import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MriProgressBarProps {
    value: number
    /** Valor que representa 100%. Default: 100. */
    max?: number
    /** Cor do preenchimento. Qualquer cor CSS solida. Default: accent (`--primary`). */
    color?: string
    /** Altura do trilho — 'sm' (h-1.5) | 'default' (h-2) | 'lg' (h-2.5). */
    size?: 'sm' | 'default' | 'lg'
    /** Halo borrado atras do preenchimento. Default: true. */
    glow?: boolean
    /** Brilho que varre o preenchimento (usa o keyframe `shimmer`). */
    shimmer?: boolean
    /** Classe extra do trilho (fundo/borda). */
    trackClassName?: string
    className?: string
    'aria-label'?: string
}

const SIZES = {
    sm: 'h-1.5',
    default: 'h-2',
    lg: 'h-2.5',
} as const

/**
 * Barra de progresso. Trilho + preenchimento colorido, com halo e shimmer
 * opcionais. Puramente apresentacional (`role="progressbar"`).
 *
 * - Trilho segue o `--radius` do /uiconfig (rounded-sm) e usa `foreground/5`,
 *   entao funciona no tema claro e no escuro sem hardcode de branco/preto.
 * - `color` aceita qualquer cor CSS; sem ela usa o accent da suite.
 *
 * ```tsx
 * <MriProgressBar value={hp} color="#ef4444" shimmer aria-label="Health" />
 * ```
 */
export const MriProgressBar = React.forwardRef<HTMLDivElement, MriProgressBarProps>(
    (
        {
            value,
            max = 100,
            color = 'hsl(var(--primary))',
            size = 'default',
            glow = true,
            shimmer = false,
            trackClassName,
            className,
            ...rest
        },
        ref
    ) => {
        const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={rest['aria-label']}
                className={cn(
                    'relative w-full overflow-hidden rounded-sm border border-foreground/5 bg-foreground/5',
                    SIZES[size],
                    trackClassName,
                    className
                )}
            >
                <div
                    className="relative z-10 h-full overflow-hidden transition-all duration-1000 ease-out"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                >
                    {shimmer && (
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    )}
                </div>
                {glow && (
                    <div
                        className="absolute inset-y-0 left-0 z-0 opacity-20 blur-[2px] transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                )}
            </div>
        )
    }
)

MriProgressBar.displayName = 'MriProgressBar'
