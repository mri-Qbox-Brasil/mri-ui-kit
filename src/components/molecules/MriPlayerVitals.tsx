import { Skull } from 'lucide-react';
import { MriProgressBar } from '@/components/atoms/MriProgressBar';
import { MriVitalBar } from '@/components/molecules/MriVitalBar';
import { MRI_VITAL_LIST } from '@/components/molecules/mri-vital-config';
import { cn } from '@/lib/utils';

export interface VitalsData {
    health: number;
    armor: number;
    metadata?: {
        hunger?: number;
        thirst?: number;
        stress?: number;
        isdead?: boolean;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface MriPlayerVitalsProps {
    vitals: VitalsData;
    size?: 'mini' | 'compact' | 'full';
    onAction?: (vital: string, label: string, value: number) => void;
    onIconClick?: (vital: string, label: string, value: number) => void;
    className?: string;
    labels?: {
        health?: string;
        armor?: string;
        hunger?: string;
        thirst?: string;
        stress?: string;
        dead?: string;
    };
    disabledVitals?: string[];
}

const DeadOverlay = ({ label }: { label: string }) => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/60 backdrop-blur-[2px] rounded-xl">
        <Skull className="w-6 h-6 text-red-500/80" />
        <span className="text-[10px] font-black uppercase tracking-widest text-red-500/80">{label}</span>
    </div>
)

export function MriPlayerVitals({ vitals, size = 'compact', onAction, onIconClick, className, labels, disabledVitals = [] }: MriPlayerVitalsProps) {
    const isDead = vitals?.metadata?.isdead ?? false
    const deadLabel = labels?.dead ?? 'Dead'

    const getVitalValue = (key: string): number => {
        if (!vitals) return 0;
        const val = (vitals[key] !== undefined ? vitals[key] : vitals.metadata?.[key]) as number | undefined;

        if (key === 'health') {
            // FiveM Health: 100 = 0%, 200 = 100%
            return Math.max(0, Math.min(100, Math.round((val || 0) - 100)));
        }

        return Math.max(0, Math.min(100, Math.round(val || 0)));
    };

    const getLabel = (key: string) => {
        return labels?.[key as keyof typeof labels] || key.charAt(0).toUpperCase() + key.slice(1);
    };

    if (size === 'mini') {
        return (
            <div className={cn("relative space-y-3", className)}>
                {isDead && <DeadOverlay label={deadLabel} />}
                {MRI_VITAL_LIST.filter(v => !v.inverted).map((v) => {
                    const val = getVitalValue(v.key);
                    const label = getLabel(v.key);
                    return (
                        <MriVitalBar
                            key={v.key}
                            value={val}
                            color={v.hex}
                            icon={v.icon}
                            label={label}
                            onClick={onAction ? () => onAction(v.key, label, val) : undefined}
                            onIconClick={onIconClick ? () => onIconClick(v.key, label, val) : undefined}
                            disabled={disabledVitals.includes(v.key)}
                        />
                    );
                })}
            </div>
        );
    }

    if (size === 'full') {
        return (
            <div className={cn("relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", className)}>
                {isDead && <DeadOverlay label={deadLabel} />}
                {MRI_VITAL_LIST.map((v) => {
                    const val = getVitalValue(v.key);
                    const label = getLabel(v.key);
                    const isLow = val < 20 && !v.inverted;
                    const isHigh = val > 80 && Boolean(v.inverted);

                    const isDisabled = disabledVitals.includes(v.key);
                    return (
                        <div
                            key={v.key}
                            className={cn(
                                "group/vital relative space-y-3 p-4 rounded-xl bg-card border border-border/50 transition-all cursor-pointer select-none overflow-hidden",
                                "hover:border-primary/20 hover:bg-muted/50 hover:shadow-xl hover:shadow-black/20 active:scale-[0.98]",
                                (isLow || isHigh) && "animate-pulse border-red-500/20 bg-red-500/[0.02]",
                                isDisabled && "opacity-40 grayscale pointer-events-none"
                            )}
                            onClick={!isDisabled ? () => onAction?.(v.key, label, val) : undefined}
                        >
                            {/* Animated Background Glow */}
                            <div
                                className={cn("absolute -right-4 -top-4 w-16 h-16 opacity-0 group-hover/vital:opacity-10 blur-2xl rounded-full transition-opacity duration-500", v.bg)}
                            />

                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/vital:text-foreground transition-colors">
                                <span className="flex items-center gap-2">
                                    <div
                                        className={cn("p-1 -m-1 rounded-md transition-all", onIconClick && !isDisabled && "hover:bg-white/10 cursor-pointer active:scale-90")}
                                        onClick={(e) => {
                                            if (onIconClick && !isDisabled) {
                                                e.stopPropagation();
                                                onIconClick(v.key, label, val);
                                            }
                                        }}
                                    >
                                        <v.icon className="w-3.5 h-3.5 transition-transform duration-500 group-hover/vital:scale-110" style={{ color: v.hex }} />
                                    </div>
                                    {label}
                                </span>
                                <span className="font-mono text-xs group-hover/vital:scale-110 transition-transform">{val}%</span>
                            </div>

                            <MriProgressBar value={val} color={v.hex} size="lg" shimmer aria-label={label} />
                        </div>
                    );
                })}
            </div>
        );
    }

    // Default: compact
    return (
        <div className={cn("relative flex flex-col gap-4", className)}>
            {isDead && <DeadOverlay label={deadLabel} />}
            {MRI_VITAL_LIST.map((v) => {
                const val = getVitalValue(v.key);
                const label = getLabel(v.key);

                return (
                    <MriVitalBar
                        key={v.key}
                        value={val}
                        color={v.hex}
                        icon={v.icon}
                        label={label}
                        onClick={onAction ? () => onAction(v.key, label, val) : undefined}
                        onIconClick={onIconClick ? () => onIconClick(v.key, label, val) : undefined}
                        disabled={disabledVitals.includes(v.key)}
                    />
                );
            })}
        </div>
    );
}
