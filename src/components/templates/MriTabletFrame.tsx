import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type MriTabletFrameSize = 'sm' | 'md' | 'lg' | 'fullscreen'

export interface MriTabletFrameProps {
    /** Conteudo do tablet — geralmente um <MriDashboardLayout> ou panel custom. */
    children: ReactNode
    /**
     * Toggle de visibilidade. `false` usa display:none ao inves de unmount —
     * preserva state interno (eg. video streamers, redux store) entre toggles.
     */
    visible?: boolean
    /**
     * Zoom user-controlled (0-200, default 100). Aplicado via CSS transform
     * scale a partir do centro — nao afeta layout interno.
     */
    scale?: number
    /**
     * Preset de tamanho. Cada um combina porcentagem (responsivo) com max
     * absoluto (clamp em telas grandes / 4K) e min absoluto (anti-colapso).
     *
     * - sm: ~80% até 1100x700, min 900x550
     * - md: ~85% até 1400x900, min 1000x600 (default)
     * - lg: ~90% até 1700x1080, min 1100x700
     * - fullscreen: 100% sem border/radius (debug ou caso edge)
     */
    size?: MriTabletFrameSize
    /** Classes extras pro frame externo (sobrepoe sizing/border se necessario). */
    className?: string
}

const SIZE_CLASSES: Record<MriTabletFrameSize, string> = {
    sm: 'w-[80%] h-[80%] max-w-[1100px] max-h-[700px] min-w-[900px] min-h-[550px]',
    md: 'w-[85%] h-[85%] max-w-[1400px] max-h-[900px] min-w-[1000px] min-h-[600px]',
    lg: 'w-[90%] h-[90%] max-w-[1700px] max-h-[1080px] min-w-[1100px] min-h-[700px]',
    fullscreen: 'w-full h-full',
}

/**
 * Frame de tablet centralizado pra UIs FiveM. O body do consumer precisa de
 * `background: transparent` pra deixar o jogo aparecer ao redor — nao da
 * pra forcar isso de dentro do componente.
 *
 * Composivel com qualquer conteudo, mas o caso primario e envolver um
 * <MriDashboardLayout>:
 *
 * ```tsx
 * <MriTabletFrame size="md" visible={uiOpen} scale={userZoom}>
 *   <MriDashboardLayout sidebar={...} header={...}>
 *     {children}
 *   </MriDashboardLayout>
 * </MriTabletFrame>
 * ```
 */
export function MriTabletFrame({
    children,
    visible = true,
    scale = 100,
    size = 'md',
    className,
}: MriTabletFrameProps) {
    const isFullscreen = size === 'fullscreen'

    return (
        <div
            className={cn(
                'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'bg-background text-foreground overflow-hidden',
                !isFullscreen && 'border border-border rounded-xl shadow-2xl',
                SIZE_CLASSES[size],
                className
            )}
            style={{
                display: visible ? 'block' : 'none',
                transform: `translate(-50%, -50%) scale(${scale / 100})`,
                transformOrigin: 'center center',
            }}
        >
            {children}
        </div>
    )
}
