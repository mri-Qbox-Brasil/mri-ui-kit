import * as React from 'react'
import { cn } from '../../lib/utils'

export interface MriSettingFieldProps {
    /** Titulo curto da configuracao. */
    label: string
    /** Texto auxiliar opcional. */
    description?: string
    /** Controle (MriSelect, MriSegmentedTabs, MriNumberInput, MriColorPicker, etc). */
    children: React.ReactNode
    /** `stacked` (default): label/descricao em cima, controle embaixo (full-width).
     *  `inline`: label/descricao a esquerda, controle a direita. */
    layout?: 'stacked' | 'inline'
    className?: string
}

/**
 * Campo de configuracao generico — par titulo/descricao + um controle arbitrario.
 * Complementa o `MriSettingToggle` (que e so pra boolean): use este pra selects,
 * segmented tabs, inputs numericos, color pickers. Mantem espacamento e
 * tipografia consistentes entre paineis de settings da suite.
 *
 * ```tsx
 * <MriSettingField label="Tema do veiculo" description="Visual do velocimetro">
 *   <MriSegmentedTabs items={...} value={theme} onChange={setTheme} />
 * </MriSettingField>
 * ```
 */
export const MriSettingField = ({
    label,
    description,
    children,
    layout = 'stacked',
    className,
}: MriSettingFieldProps) => {
    if (layout === 'inline') {
        return (
            <div className={cn('flex items-center justify-between gap-4 px-3 py-2.5', className)}>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
                    )}
                </div>
                <div className="shrink-0">{children}</div>
            </div>
        )
    }

    return (
        <div className={cn('flex flex-col gap-2 px-3 py-2.5', className)}>
            <div>
                <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
                {description && (
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5">{description}</p>
                )}
            </div>
            {children}
        </div>
    )
}

MriSettingField.displayName = 'MriSettingField'
