import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface MriBlipSpriteProps {
    /** URL completa do sprite (PNG/WEBP). */
    src: string
    /** Cor do blip. Com ela o sprite é tingido mantendo o contorno; sem ela vira `<img>`. */
    tint?: string
    className?: string
    style?: React.CSSProperties
}

/**
 * Sprite de blip do FiveM. Com `tint`, a cor entra em multiply só dentro do
 * sprite, então o branco vira a cor do blip e o contorno escuro continua
 * (o mesmo efeito do jogo); sem `tint` cai num `<img>` normal. Erro de carregamento vira um placeholder
 * `?` com o motivo no `title` em vez de imagem quebrada.
 *
 * ```tsx
 * <MriBlipSprite src={url} tint="#ef4444" className="w-6 h-6" />
 * ```
 */
export function MriBlipSprite({ src, tint, className, style }: MriBlipSpriteProps) {
    const [errored, setErrored] = useState(false)
    const [lastSrc, setLastSrc] = useState(src)

    // Padrão "Adjusting state on prop change" do React docs — preferido sobre
    // setState em useEffect porque evita render cascateado.
    if (src !== lastSrc) {
        setLastSrc(src)
        setErrored(false)
    }

    useEffect(() => {
        const img = new Image()
        img.onerror = () => setErrored(true)
        img.src = src
    }, [src])

    if (errored) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center text-[8px] text-muted-foreground/60 font-mono bg-muted/30 rounded',
                    className
                )}
                style={style}
                title={`Não foi possível carregar: ${src}`}
            >
                ?
            </div>
        )
    }

    if (tint) {
        // Multiply keeps the sprite's dark outline; a plain mask would flatten it into the tint.
        return (
            <div className={cn('relative isolate', className)} style={style}>
                <img
                    src={src}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-contain"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: tint,
                        mixBlendMode: 'multiply',
                        WebkitMask: `url(${src}) center/contain no-repeat`,
                        mask: `url(${src}) center/contain no-repeat`,
                    }}
                />
            </div>
        )
    }

    return (
        <img
            src={src}
            alt=""
            className={cn('object-contain', className)}
            style={style}
            onError={() => setErrored(true)}
        />
    )
}
