import * as React from 'react'
import { cn } from '@/lib/utils'
import type { MarkerColor } from './MriMarkerPicker.constants'

export interface MriMarkerPreviewProps {
    /** Path do arquivo dentro do CDN. Sem ele, renderiza so o quadrado da cor. */
    file: string | undefined
    /** Base do CDN, concatenada direto com `file`. */
    base: string
    color: MarkerColor
    className?: string
    /** Estilo do `<img>` — usado pra refletir o scale do marker no preview. */
    imageStyle?: React.CSSProperties
    /** Texto mostrado quando nao ha `file` (ex.: "Type 27"). */
    fallbackText?: string
}

/**
 * Preview de marker do FiveM.
 *
 * Aplica `mix-blend-mode: multiply` sobre fundo colorido sólido pra replicar
 * o que DrawMarker faz no jogo: textura branca-acinzentada multiplicada pela
 * cor RGBA. Onde o PNG é claro (marker), a cor aparece; onde é escuro (fundo
 * do PNG), permanece escuro. Alpha controla a opacidade da camada inteira.
 *
 * ```tsx
 * <MriMarkerPreview file={m.file} base={cdn} color={color} className="w-24 h-24 rounded" />
 * ```
 */
export function MriMarkerPreview({ file, base, color, className, imageStyle, fallbackText }: MriMarkerPreviewProps) {
    const colorCss = `rgba(${color.r}, ${color.g}, ${color.b}, ${(color.a / 255).toFixed(2)})`

    if (!file) {
        return (
            <div
                className={cn('flex items-center justify-center border border-border', className)}
                style={{ backgroundColor: colorCss }}
            >
                {fallbackText && (
                    <span className="text-[8px] font-mono text-white mix-blend-difference">
                        {fallbackText}
                    </span>
                )}
            </div>
        )
    }

    return (
        <div
            className={cn('relative flex items-center justify-center border border-border overflow-hidden', className)}
            style={{ backgroundColor: '#000', isolation: 'isolate' }}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    opacity: color.a / 255,
                }}
            />
            <img
                src={`${base}${file}`}
                alt=""
                className="relative object-contain w-full h-full"
                style={{
                    ...imageStyle,
                    mixBlendMode: 'multiply',
                    opacity: color.a / 255,
                }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
        </div>
    )
}
