import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MriSwitchProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    disabled?: boolean
    /** Tamanho — 'sm' (w-7 h-4), 'default' (w-9 h-5) ou 'lg' (w-11 h-6). */
    size?: 'sm' | 'default' | 'lg'
    /** Exibe o indicador textual I/O (ligado/desligado) dentro do knob. */
    showState?: boolean
    /** Texto pra screen readers (recomendado quando o switch nao tem label visivel). */
    'aria-label'?: string
    className?: string
    id?: string
}

// Geometria por tamanho, calibrada pra gap uniforme de 2px em volta do knob
// (borda do trilho = 1px). knob = altura_interna - 4px; travel = largura_interna
// - knob - 4px. Sem isso, um knob quadrado (radius 0) fica visivelmente fora de
// centro (ex.: 16px num interno de 18px sobra 2px em cima e 0 embaixo).
const SIZES = {
    sm: { track: 'w-7 h-4', knob: 'h-[10px] w-[10px]', travel: 'translate-x-[12px]', text: 'text-[7px]' },
    default: { track: 'w-9 h-5', knob: 'h-[14px] w-[14px]', travel: 'translate-x-[16px]', text: 'text-[9px]' },
    lg: { track: 'w-11 h-6', knob: 'h-[18px] w-[18px]', travel: 'translate-x-[20px]', text: 'text-[11px]' },
} as const

/**
 * Switch (toggle iOS-style). Wrapper sobre `<input type="checkbox">` com
 * styling Tailwind via `peer`. Sem dep extra — a11y nativa do checkbox.
 *
 * - Trilho/knob seguem as vars `--ui-switch-*-radius` do /uiconfig
 *   (square/round/follow), com fallback follow no :root.
 * - `size`: sm | default | lg. `showState`: exibe I (on) / O (off) no knob.
 *
 * ```tsx
 * <MriSwitch checked={enabled} onCheckedChange={setEnabled} showState aria-label="Modo debug"/>
 * ```
 */
export const MriSwitch = React.forwardRef<HTMLInputElement, MriSwitchProps>(
    ({ checked, onCheckedChange, disabled, size = 'default', showState = false, className, id, ...rest }, ref) => {
        const s = SIZES[size]

        return (
            <label
                className={cn(
                    'relative inline-flex items-center shrink-0',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    className
                )}
            >
                <input
                    ref={ref}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onCheckedChange(e.target.checked)}
                    className="sr-only peer"
                    aria-label={rest['aria-label']}
                />
                <div
                    className={cn(
                        'relative rounded-[var(--ui-switch-track-radius)] border border-border bg-muted transition-colors',
                        'peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ring-offset-background',
                        s.track
                    )}
                >
                    {/* Knob: <span> real (nao pseudo-after) pra caber o indicador I/O. */}
                    <span
                        className={cn(
                            'absolute top-[2px] left-[2px] flex items-center justify-center',
                            'rounded-[var(--ui-switch-knob-radius)] bg-white shadow-sm transition-transform',
                            'font-bold leading-none text-black/55 select-none',
                            checked ? s.travel : 'translate-x-0',
                            s.knob,
                            s.text
                        )}
                    >
                        {showState ? (checked ? 'I' : 'O') : null}
                    </span>
                </div>
            </label>
        )
    }
)

MriSwitch.displayName = 'MriSwitch'
