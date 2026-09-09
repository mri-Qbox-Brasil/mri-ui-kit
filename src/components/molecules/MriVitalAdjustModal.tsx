import { useState, useEffect } from 'react'
import { MriModal } from '@/components/molecules/MriModal'
import { MriButton } from '@/components/atoms/MriButton'
import { MriSlider } from '@/components/atoms/MriSlider'
import { Save, X, type LucideIcon } from 'lucide-react'
import { MRI_VITALS, type MriVitalKey } from '@/components/molecules/mri-vital-config'
import { cn } from '@/lib/utils'

export interface MriVitalAdjustModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (value: number) => void
    vital: MriVitalKey
    currentValue: number
    playerName: string
    // Top-level prop overrides
    title?: string
    description?: string
    icon?: LucideIcon
    confirmLabel?: string
    cancelLabel?: string
    newValueLabel?: string
    showFullProgress?: boolean
    labels?: {
        health?: string
        armor?: string
        hunger?: string
        thirst?: string
        stress?: string
        newValue?: string
        confirm?: string
        cancel?: string
        playerNameLabel?: string
    }
    hideBlur?: boolean
    hideOverlay?: boolean
    disabled?: boolean
}

export function MriVitalAdjustModal({
    isOpen,
    onClose,
    onSubmit,
    vital,
    currentValue,
    playerName,
    labels,
    icon,
    showFullProgress = true,
    title,
    description,
    confirmLabel,
    cancelLabel,
    newValueLabel,
    hideBlur = true,
    hideOverlay = true,
    disabled = false,
}: MriVitalAdjustModalProps) {
    const [value, setValue] = useState(currentValue)

    useEffect(() => {
        setValue(currentValue)
    }, [currentValue])

    if (!isOpen) return null

    const config = MRI_VITALS[vital]
    const Icon = icon || config.icon

    const getLabel = (key: string, defaultText: string) => {
        return labels?.[key as keyof typeof labels] || defaultText;
    };

    const displayTitle = title || getLabel(config.label, config.label.charAt(0).toUpperCase() + config.label.slice(1))
    const displayDescription = description || getLabel('playerNameLabel', playerName)
    const displayConfirm = confirmLabel || getLabel('confirm', 'Confirm')
    const displayCancel = cancelLabel || getLabel('cancel', 'Cancel')
    const displayNewValue = newValueLabel || getLabel('newValue', 'New Value')

    return (
        <MriModal hideBlur={hideBlur} hideOverlay={hideOverlay} onClose={onClose} className="w-[420px] p-0 bg-card/95 border-primary/10 backdrop-blur-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border/40 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${config.bg}/5 blur-3xl rounded-full -mr-16 -mt-16`} />
                <div className="flex items-center gap-4 relative z-10">
                    <div className={cn(
                        "p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-primary/20",
                        config.bg + "/10",
                        config.text,
                        config.border
                    )}>
                        <Icon size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tight uppercase">{displayTitle}</h2>
                        <p className="text-xs text-muted-foreground/70 font-medium">{displayDescription}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{displayNewValue}</span>
                        <div className="flex items-baseline gap-1">
                            <span className={cn("text-4xl font-black font-mono leading-none drop-shadow-sm", config.text)}>{Math.round(value)}</span>
                            <span className="text-lg font-bold text-muted-foreground">%</span>
                        </div>
                    </div>

                    <div className="relative pt-6">
                        <MriSlider
                            value={value}
                            onChange={setValue}
                            min={0}
                            max={config.max}
                            step={1}
                            disabled={disabled}
                            color={config.hex}
                            tintedTrack={showFullProgress}
                            ticks
                            formatTick={(v) => `${v}%`}
                            aria-label={displayNewValue}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-2 flex gap-4 bg-muted/30">
                <MriButton
                    variant="ghost"
                    className="flex-1 h-12 gap-2 text-muted-foreground border border-transparent hover:border-border/50 transition-all uppercase text-xs"
                    onClick={onClose}
                >
                    <X size={16} /> {displayCancel}
                </MriButton>
                <MriButton
                    variant="default"
                    disabled={disabled}
                    className={cn(
                        "flex-1 h-12 gap-2 text-white uppercase text-xs transition-all active:scale-95",
                        config.bg,
                        "hover:brightness-110 shadow-lg",
                        config.shadow
                    )}
                    onClick={!disabled ? () => onSubmit(value) : undefined}
                >
                    <Save size={16} /> {displayConfirm}
                </MriButton>
            </div>

        </MriModal>
    )
}


