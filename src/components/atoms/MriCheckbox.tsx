import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MriCheckboxProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    /** Estado parcial (pai de uma lista com selecao mista). Sobrepoe o visual de `checked`. */
    indeterminate?: boolean
    disabled?: boolean
    /** Tamanho — 'sm' (14px), 'default' (16px) ou 'lg' (20px). */
    size?: 'sm' | 'default' | 'lg'
    /** Texto ao lado da caixa. Sem ele, passe `aria-label`. */
    label?: React.ReactNode
    'aria-label'?: string
    className?: string
    id?: string
}

const SIZES = {
    sm: { box: 'h-3.5 w-3.5', icon: 10, text: 'text-[11px]' },
    default: { box: 'h-4 w-4', icon: 12, text: 'text-xs' },
    lg: { box: 'h-5 w-5', icon: 14, text: 'text-sm' },
} as const

/**
 * Checkbox. Wrapper sobre `<input type="checkbox">` com styling Tailwind via
 * `peer` — sem dep extra, a11y nativa (espaco, foco, form). Mesma abordagem do
 * [MriSwitch]; use o switch pra ligar/desligar algo imediato e o checkbox pra
 * selecao dentro de formulario/lista.
 *
 * - A caixa segue o `--radius` do /uiconfig (rounded-sm).
 *
 * ```tsx
 * <MriCheckbox checked={on} onCheckedChange={setOn} label="Blip habilitado no mapa" />
 * ```
 */
export const MriCheckbox = React.forwardRef<HTMLInputElement, MriCheckboxProps>(
    (
        { checked, onCheckedChange, indeterminate = false, disabled, size = 'default', label, className, id, ...rest },
        ref
    ) => {
        const s = SIZES[size]
        const innerRef = React.useRef<HTMLInputElement | null>(null)

        // `indeterminate` so existe como propriedade do DOM — nao ha atributo HTML.
        React.useEffect(() => {
            if (innerRef.current) innerRef.current.indeterminate = indeterminate
        }, [indeterminate])

        return (
            <label
                className={cn(
                    'inline-flex items-center gap-2 select-none',
                    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                    className
                )}
            >
                <input
                    ref={(node) => {
                        innerRef.current = node
                        if (typeof ref === 'function') ref(node)
                        else if (ref) ref.current = node
                    }}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onCheckedChange(e.target.checked)}
                    className="sr-only peer"
                    aria-label={rest['aria-label']}
                />
                <span
                    className={cn(
                        'grid shrink-0 place-items-center rounded-sm border border-border bg-background text-primary-foreground transition-colors',
                        'peer-checked:border-primary peer-checked:bg-primary',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 ring-offset-background',
                        indeterminate && 'border-primary bg-primary',
                        s.box
                    )}
                >
                    {indeterminate ? (
                        <Minus size={s.icon} strokeWidth={3} />
                    ) : (
                        <Check size={s.icon} strokeWidth={3} className={cn(!checked && 'invisible')} />
                    )}
                </span>
                {label != null && <span className={cn('text-foreground', s.text)}>{label}</span>}
            </label>
        )
    }
)

MriCheckbox.displayName = 'MriCheckbox'
