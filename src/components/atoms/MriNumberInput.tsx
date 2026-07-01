import * as React from 'react'
import { cn } from '../../lib/utils'

export interface MriNumberInputProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    /** Tamanho do campo de digitacao em chars (afeta a largura). Default compacto. */
    className?: string
    'aria-label'?: string
}

function clamp(val: number, min: number, max: number) {
    const clamped = Math.max(min, Math.min(max, val))
    // Evita ruido de ponto flutuante (ex: 0.1 + 0.2) arredondando a 2 casas.
    return Math.round(clamped * 100) / 100
}

/**
 * Input numerico com steppers `-` / `+`. Sem dependencia extra — wrapper sobre
 * `<input type="text">` com parsing tolerante (aceita digitacao parcial como
 * `1.` sem zerar). Reage ao accent da suite via tokens (`--primary`/`--border`).
 *
 * Uso controlado:
 * ```tsx
 * const [n, setN] = useState(50)
 * <MriNumberInput value={n} onChange={setN} min={0} max={200} step={5} />
 * ```
 */
export const MriNumberInput = React.forwardRef<HTMLInputElement, MriNumberInputProps>(
    ({ value, onChange, min = 0, max = 100, step = 1, disabled = false, className, ...rest }, ref) => {
        function adjust(dir: 1 | -1) {
            if (disabled) return
            onChange(clamp(value + dir * step, min, max))
        }

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const raw = e.target.value
            // Deixa o usuario digitar o ponto decimal antes do proximo digito.
            if (raw.endsWith('.') || raw === '' || raw === '-') return
            const n = Number(raw)
            if (!isNaN(n)) onChange(clamp(n, min, max))
        }

        return (
            <div
                className={cn(
                    'inline-flex flex-row h-9 rounded-md border border-border overflow-hidden bg-background',
                    disabled && 'opacity-50 pointer-events-none',
                    className
                )}
            >
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => adjust(-1)}
                    aria-label="decrement"
                    className="w-8 grid place-items-center bg-card border-r border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
                >
                    <span className="text-lg font-bold leading-none">−</span>
                </button>
                <input
                    ref={ref}
                    type="text"
                    inputMode="decimal"
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    className="w-12 min-w-0 flex-1 text-center text-sm bg-background text-foreground focus:outline-none"
                    {...rest}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => adjust(1)}
                    aria-label="increment"
                    className="w-8 grid place-items-center bg-card border-l border-border text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus:outline-none"
                >
                    <span className="text-lg font-bold leading-none">+</span>
                </button>
            </div>
        )
    }
)

MriNumberInput.displayName = 'MriNumberInput'
