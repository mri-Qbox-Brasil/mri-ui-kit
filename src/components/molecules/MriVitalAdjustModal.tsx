import React, { useState, useEffect } from 'react'
import { MriModal } from '@/components/molecules/MriModal'
import { MriButton } from '@/components/atoms/MriButton'
import { Heart, Shield, Beef, GlassWater, Brain, Save, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MriVitalAdjustModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (value: number) => void
    vital: 'health' | 'armor' | 'hunger' | 'thirst' | 'stress'
    currentValue: number
    playerName: string
    labels?: {
        health?: string
        armor?: string
        hunger?: string
        thirst?: string
        stress?: string
        newValue?: string
        confirm?: string
        cancel?: string
    }
}

const VITAL_CONFIG: Record<string, { icon: LucideIcon; color: string; bgColor: string; hex: string; label: string; max: number }> = {
    health: { icon: Heart, color: 'text-red-500', bgColor: 'bg-red-500', hex: '#ef4444', label: 'health', max: 100 },
    armor: { icon: Shield, color: 'text-blue-500', bgColor: 'bg-blue-500', hex: '#3b82f6', label: 'armor', max: 100 },
    hunger: { icon: Beef, color: 'text-orange-500', bgColor: 'bg-orange-500', hex: '#f59e0b', label: 'hunger', max: 100 },
    thirst: { icon: GlassWater, color: 'text-cyan-500', bgColor: 'bg-cyan-500', hex: '#06b6d4', label: 'thirst', max: 100 },
    stress: { icon: Brain, color: 'text-purple-500', bgColor: 'bg-purple-500', hex: '#a855f7', label: 'stress', max: 100 },
}

export function MriVitalAdjustModal({ isOpen, onClose, onSubmit, vital, currentValue, playerName, labels }: MriVitalAdjustModalProps) {
    const [value, setValue] = useState(currentValue)

    useEffect(() => {
        setValue(currentValue)
    }, [currentValue])

    if (!isOpen) return null

    const config = VITAL_CONFIG[vital]
    const Icon = config.icon

    const getLabel = (key: string, defaultText: string) => {
        return labels?.[key as keyof typeof labels] || defaultText;
    };

    return (
        <MriModal onClose={onClose} className="w-[420px] p-0 bg-card/95 border-primary/10 backdrop-blur-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border/40 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${config.bgColor}/5 blur-3xl rounded-full -mr-16 -mt-16`} />
                <div className="flex items-center gap-4 relative z-10">
                    <div className={cn(
                        "p-3 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-primary/20",
                        config.bgColor + "/10",
                        config.color,
                        vital === 'health' ? 'border-red-500/20' :
                            vital === 'armor' ? 'border-blue-500/20' :
                                vital === 'hunger' ? 'border-orange-500/20' :
                                    vital === 'thirst' ? 'border-cyan-500/20' : 'border-purple-500/20'
                    )}>
                        <Icon size={24} className="animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-foreground tracking-tight uppercase">{getLabel(config.label, config.label.charAt(0).toUpperCase() + config.label.slice(1))}</h2>
                        <p className="text-xs text-muted-foreground/70 font-medium">{playerName}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{getLabel('newValue', 'New Value')}</span>
                        <div className="flex items-baseline gap-1">
                            <span className={cn("text-4xl font-black font-mono leading-none drop-shadow-sm", config.color)}>{Math.round(value)}</span>
                            <span className="text-lg font-bold text-muted-foreground">%</span>
                        </div>
                    </div>

                    <div className="relative pt-6">
                        <input
                            type="range"
                            min="0"
                            max={config.max}
                            step="1"
                            value={value}
                            onChange={(e) => setValue(Number(e.target.value))}
                            className="vital-adjust-slider"
                            style={{
                                background: `linear-gradient(to right, ${config.hex} ${value}%, var(--muted) ${value}%)`,
                                '--vital-color': config.hex,
                                '--vital-color-60': config.hex + '66',
                                '--vital-color-20': config.hex + '33'
                            } as React.CSSProperties}
                        />
                        <div className="flex justify-between mt-4 text-[10px] font-black font-mono text-muted-foreground/40 uppercase tracking-tighter">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-2 flex gap-4 bg-muted/30">
                <MriButton
                    variant="ghost"
                    className="flex-1 h-12 gap-2 text-muted-foreground font-bold border border-transparent hover:border-border/50 transition-all uppercase text-xs"
                    onClick={onClose}
                >
                    <X size={16} /> {getLabel('cancel', 'Cancel')}
                </MriButton>
                <MriButton
                    variant="default"
                    className={cn(
                        "flex-1 h-12 gap-2 text-white font-black uppercase text-xs transition-all active:scale-95",
                        config.bgColor,
                        "hover:brightness-110 shadow-lg",
                        vital === 'health' ? 'shadow-red-500/20' :
                            vital === 'armor' ? 'shadow-blue-500/20' :
                                vital === 'hunger' ? 'shadow-orange-500/20' :
                                    vital === 'thirst' ? 'shadow-cyan-500/20' : 'shadow-purple-500/20'
                    )}
                    onClick={() => onSubmit(value)}
                >
                    <Save size={16} /> {getLabel('confirm', 'Confirm')}
                </MriButton>
            </div>

            <style>{`
                .vital-adjust-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    border-radius: 10px;
                    outline: none;
                    border: 1px solid var(--border);
                    transition: all 0.3s ease;
                    background: var(--muted);
                }
                .vital-adjust-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: var(--vital-color);
                    cursor: pointer;
                    border-radius: 6px;
                    border: 3px solid #09090b;
                    box-shadow: 0 0 15px var(--vital-color-60);
                    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .vital-adjust-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2) rotate(5deg);
                    box-shadow: 0 0 25px var(--vital-color);
                }
                .vital-adjust-slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: var(--vital-color);
                    cursor: pointer;
                    border-radius: 6px;
                    border: 3px solid #09090b;
                    box-shadow: 0 0 15px var(--vital-color-60);
                }
            `}</style>
        </MriModal>
    )
}


