import { cn } from '@/lib/utils'

export interface MriColorSwatch {
    id: number | string
    hex: string
    name?: string
}

export interface MriColorSwatchGridProps {
    swatches: MriColorSwatch[]
    value: MriColorSwatch['id']
    onChange: (id: MriColorSwatch['id']) => void
    /** Colunas do grid. Default: 12. */
    columns?: number
    /** Sobrepoe o id no swatch selecionado (`mix-blend-difference`). Default: true. */
    showActiveId?: boolean
    /** Altura de cada swatch. Default: 'h-6'. */
    swatchClassName?: string
    className?: string
}

/**
 * Grid de swatches de uma paleta fixa (color IDs de blip, cores de job/gang,
 * temas...). Um botao por cor, com estado ativo em ring do accent.
 *
 * O `title` de cada swatch mostra `id — name`, entao paletas grandes continuam
 * navegaveis sem legenda.
 *
 * ```tsx
 * <MriColorSwatchGrid swatches={DEFAULT_BLIP_COLORS} value={color} onChange={setColor} />
 * ```
 */
export function MriColorSwatchGrid({
    swatches,
    value,
    onChange,
    columns = 12,
    showActiveId = true,
    swatchClassName,
    className,
}: MriColorSwatchGridProps) {
    return (
        <div
            className={cn('grid gap-1', className)}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {swatches.map((c) => {
                const active = c.id === value
                return (
                    <button
                        key={c.id}
                        type="button"
                        onClick={() => onChange(c.id)}
                        title={c.name ? `${c.id} — ${c.name}` : String(c.id)}
                        aria-label={c.name ? `${c.id} — ${c.name}` : String(c.id)}
                        aria-pressed={active}
                        className={cn(
                            'relative h-6 rounded border transition-all hover:scale-110',
                            active
                                ? 'border-primary ring-2 ring-primary/40 scale-110'
                                : 'border-border/60 opacity-80 hover:opacity-100',
                            swatchClassName
                        )}
                        style={{ backgroundColor: c.hex }}
                    >
                        {active && showActiveId && (
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-white mix-blend-difference">
                                {c.id}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}
