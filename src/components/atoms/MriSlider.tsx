import * as React from 'react'
import { colord } from 'colord'
import { cn } from '@/lib/utils'

export interface MriSliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    /**
     * Cor da parte preenchida + thumb. Qualquer cor CSS solida (hex, rgb, nome).
     * Default: o accent da suite (`--primary`).
     */
    color?: string
    /** Altura do trilho / tamanho do thumb — 'sm' | 'default' | 'lg'. */
    size?: 'sm' | 'default' | 'lg'
    /** Pinta o trecho restante do trilho com a cor a 20% em vez de `--muted`. */
    tintedTrack?: boolean
    /** Halo colorido em volta do thumb. Default: true. */
    glow?: boolean
    /** Marcacoes abaixo do trilho. `true` = 5 marcas; numero = quantidade. */
    ticks?: boolean | number
    /** Formata cada marca. Default: `String(v)`. */
    formatTick?: (value: number) => string
    className?: string
    'aria-label'?: string
    id?: string
}

// Trilho e thumb por tamanho. O thumb tem 3px de anel na cor do fundo, entao o
// diametro visivel da bolinha e ~6px menor que o valor abaixo.
const SIZES = {
    sm: { track: '4px', thumb: '14px' },
    default: { track: '6px', thumb: '20px' },
    lg: { track: '8px', thumb: '24px' },
} as const

// CSS injetado uma unica vez no <head>. Pseudo-elementos de range (::-webkit-
// slider-thumb / ::-moz-range-thumb) nao aceitam style inline, entao precisam de
// folha de estilo; tudo que varia por instancia entra como CSS var no elemento.
const SLIDER_CSS = `
.mri-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: var(--mri-slider-track);
    /* Trilho segue o --radius do /uiconfig (rounded-sm). */
    border-radius: calc(var(--radius) - 4px);
    outline: none;
    border: 1px solid hsl(var(--border));
    background: var(--mri-slider-bg);
    transition: background 0.15s ease, box-shadow 0.2s ease;
}
.mri-slider:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring));
}
.mri-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--mri-slider-thumb);
    height: var(--mri-slider-thumb);
    background: var(--mri-slider-color);
    cursor: pointer;
    /* Thumb segue o --radius (rounded-md); no radius 0 vira quadrado. */
    border-radius: calc(var(--radius) - 2px);
    /* Anel segue o tema (bg do painel) em vez de preto fixo. */
    border: 3px solid hsl(var(--background));
    box-shadow: var(--mri-slider-glow);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
}
.mri-slider::-moz-range-thumb {
    box-sizing: border-box;
    width: var(--mri-slider-thumb);
    height: var(--mri-slider-thumb);
    background: var(--mri-slider-color);
    cursor: pointer;
    border-radius: calc(var(--radius) - 2px);
    border: 3px solid hsl(var(--background));
    box-shadow: var(--mri-slider-glow);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
}
.mri-slider:not(:disabled)::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--mri-slider-glow-hover);
}
.mri-slider:not(:disabled)::-moz-range-thumb:hover {
    transform: scale(1.2);
    box-shadow: var(--mri-slider-glow-hover);
}
.mri-slider:disabled {
    opacity: 0.4;
    filter: grayscale(1);
    cursor: not-allowed;
}
.mri-slider:disabled::-webkit-slider-thumb { cursor: not-allowed; }
.mri-slider:disabled::-moz-range-thumb { cursor: not-allowed; }
`

let cssInjected = false

function useSliderCss() {
    React.useEffect(() => {
        if (cssInjected || typeof document === 'undefined') return
        cssInjected = true
        const el = document.createElement('style')
        el.setAttribute('data-mri-slider', '')
        el.textContent = SLIDER_CSS
        document.head.appendChild(el)
    }, [])
}

// Deriva a versao translucida da cor pro halo/trilho. `color` pode ser qualquer
// cor CSS; se o colord nao souber parsear (ex.: uma var()), devolve a propria
// cor — o halo fica solido em vez de sumir.
function withAlpha(color: string, alpha: number) {
    const c = colord(color)
    return c.isValid() ? c.alpha(alpha).toRgbString() : color
}

/**
 * Slider (range) com trilho preenchido, thumb com halo e marcacoes opcionais.
 * Wrapper sobre `<input type="range">` — sem dep extra, a11y nativa (setas,
 * Home/End, PageUp/PageDown).
 *
 * - Trilho/thumb seguem o `--radius` do /uiconfig; anel do thumb usa o
 *   `--background` do tema.
 * - `color` aceita qualquer cor CSS solida; sem ela usa o accent (`--primary`).
 *
 * ```tsx
 * const [hp, setHp] = useState(80)
 * <MriSlider value={hp} onChange={setHp} color="#ef4444" tintedTrack ticks formatTick={(v) => `${v}%`} />
 * ```
 */
export const MriSlider = React.forwardRef<HTMLInputElement, MriSliderProps>(
    (
        {
            value,
            onChange,
            min = 0,
            max = 100,
            step = 1,
            disabled = false,
            color,
            size = 'default',
            tintedTrack = false,
            glow = true,
            ticks = false,
            formatTick = String,
            className,
            id,
            ...rest
        },
        ref
    ) => {
        useSliderCss()

        const s = SIZES[size]
        // `hsl(h s l / a)` funciona porque os tokens sao triplas HSL sem hsl().
        const fill = color ?? 'hsl(var(--primary))'
        const soft = color ? withAlpha(color, 0.6) : 'hsl(var(--primary) / 0.6)'
        const faint = color ? withAlpha(color, 0.2) : 'hsl(var(--primary) / 0.2)'

        const span = max - min
        const pct = span > 0 ? Math.min(100, Math.max(0, ((value - min) / span) * 100)) : 0

        const tickCount = ticks === true ? 5 : typeof ticks === 'number' ? ticks : 0
        const tickValues =
            tickCount > 1
                ? Array.from({ length: tickCount }, (_, i) => min + (span * i) / (tickCount - 1))
                : []

        return (
            <div className={cn('w-full', className)}>
                <input
                    ref={ref}
                    id={id}
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="mri-slider"
                    style={
                        {
                            '--mri-slider-track': s.track,
                            '--mri-slider-thumb': s.thumb,
                            '--mri-slider-color': fill,
                            '--mri-slider-bg': `linear-gradient(to right, ${fill} ${pct}%, ${tintedTrack ? faint : 'hsl(var(--muted))'} ${pct}%)`,
                            '--mri-slider-glow': glow ? `0 0 15px ${soft}` : 'none',
                            '--mri-slider-glow-hover': glow ? `0 0 25px ${fill}` : 'none',
                        } as React.CSSProperties
                    }
                    aria-label={rest['aria-label']}
                />
                {tickValues.length > 0 && (
                    <div className="flex justify-between mt-2 text-[10px] font-black font-mono text-muted-foreground/40 uppercase tracking-tighter">
                        {tickValues.map((v, i) => (
                            <span key={i}>{formatTick(v)}</span>
                        ))}
                    </div>
                )}
            </div>
        )
    }
)

MriSlider.displayName = 'MriSlider'
