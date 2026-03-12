import { Heart, Shield, Beef, GlassWater, Brain, type LucideIcon } from 'lucide-react';
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
    className?: string;
    labels?: {
        health?: string;
        armor?: string;
        hunger?: string;
        thirst?: string;
        stress?: string;
    };
}

const VITAL_CONFIG: {
    key: string;
    icon: LucideIcon;
    color: string;
    hex: string;
    border: string;
    shadow: string;
    hoverBorder: string;
    hoverShadow: string;
    inverted?: boolean;
}[] = [
        { key: 'health', icon: Heart, color: 'bg-red-500', hex: '#ef4444', border: 'border-border/50', shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.4)]', hoverBorder: 'hover:border-red-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]' },
        { key: 'armor', icon: Shield, color: 'bg-blue-500', hex: '#3b82f6', border: 'border-border/50', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.4)]', hoverBorder: 'hover:border-blue-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]' },
        { key: 'hunger', icon: Beef, color: 'bg-orange-500', hex: '#f59e0b', border: 'border-border/50', shadow: 'shadow-[0_0_10px_rgba(145,158,11,0.4)]', hoverBorder: 'hover:border-orange-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]' },
        { key: 'thirst', icon: GlassWater, color: 'bg-cyan-500', hex: '#06b6d4', border: 'border-border/50', shadow: 'shadow-[0_0_10px_rgba(6,182,212,0.4)]', hoverBorder: 'hover:border-cyan-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]' },
        { key: 'stress', icon: Brain, color: 'bg-purple-500', hex: '#a855f7', border: 'border-border/50', shadow: 'shadow-[0_0_10px_rgba(168,85,247,0.4)]', hoverBorder: 'hover:border-purple-500/50', hoverShadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]', inverted: true },
    ];

const VitalBar = ({ val, color, hex, icon: Icon, label, onClick }: { val: number, color: string, hex: string, icon: LucideIcon, label?: string, onClick?: () => void }) => (
    <div
        className={cn(
            "flex items-center gap-3 w-full transition-all duration-300",
            onClick ? 'cursor-pointer hover:bg-white/[0.03] p-1.5 -m-1.5 rounded-lg group/vbar active:scale-[0.98]' : ''
        )}
        onClick={onClick}
        title={onClick ? `Adjust ${label}` : undefined}
    >
        <div className="relative">
            <Icon size={14} className="shrink-0 transition-all duration-500 group-hover/vbar:scale-110" style={{ color: hex }} />
            <div className="absolute inset-0 blur-[4px] opacity-0 group-hover/vbar:opacity-40 transition-opacity" style={{ backgroundColor: hex }} />
        </div>
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden shrink-0 border border-white/5 relative">
            <div
                className={cn("h-full transition-all duration-1000 ease-out relative z-10", color)}
                style={{ width: `${val}%` }}
            />
            <div
                className={cn("absolute inset-0 opacity-20 blur-[2px] z-0", color)}
                style={{ width: `${val}%` }}
            />
        </div>
        <span className="text-[10px] font-black font-mono opacity-40 w-8 text-right group-hover/vbar:opacity-100 group-hover/vbar:text-foreground transition-all shrink-0">{Math.round(val)}%</span>
    </div>
)

export function MriPlayerVitals({ vitals, size = 'compact', onAction, className, labels }: MriPlayerVitalsProps) {
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
            <div className={cn("space-y-3", className)}>
                {VITAL_CONFIG.filter(v => v.key !== 'stress').map((v) => {
                    const val = getVitalValue(v.key);
                    const label = getLabel(v.key);
                    return (
                        <VitalBar
                            key={v.key}
                            val={val}
                            color={v.color}
                            hex={v.hex}
                            icon={v.icon}
                            label={label}
                            onClick={onAction ? () => onAction(v.key, label, val) : undefined}
                        />
                    );
                })}
            </div>
        );
    }

    if (size === 'full') {
        return (
            <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", className)}>
                {VITAL_CONFIG.map((v) => {
                    const val = getVitalValue(v.key);
                    const label = getLabel(v.key);
                    const isLow = val < 20 && v.key !== 'stress';
                    const isHigh = val > 80 && v.key === 'stress';

                    return (
                        <div
                            key={v.key}
                            className={cn(
                                "group/vital relative space-y-3 p-4 rounded-xl bg-card border border-border/50 transition-all cursor-pointer select-none overflow-hidden",
                                "hover:border-primary/20 hover:bg-muted/50 hover:shadow-xl hover:shadow-black/20 active:scale-[0.98]",
                                (isLow || isHigh) && "animate-pulse border-red-500/20 bg-red-500/[0.02]"
                            )}
                            onClick={() => onAction?.(v.key, label, val)}
                        >
                            {/* Animated Background Glow */}
                            <div
                                className={cn("absolute -right-4 -top-4 w-16 h-16 opacity-0 group-hover/vital:opacity-10 blur-2xl rounded-full transition-opacity duration-500", v.color)}
                            />

                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover/vital:text-foreground transition-colors">
                                <span className="flex items-center gap-2">
                                    <v.icon className="w-3.5 h-3.5 transition-transform duration-500 group-hover/vital:scale-110" style={{ color: v.hex }} />
                                    {label}
                                </span>
                                <span className="font-mono text-xs group-hover/vital:scale-110 transition-transform">{val}%</span>
                            </div>

                            <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                                <div
                                    className={cn("h-full transition-all duration-1000 ease-out relative z-10", v.color)}
                                    style={{ width: `${val}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                                </div>
                                <div
                                    className={cn("absolute inset-0 opacity-20 blur-[2px] z-0", v.color)}
                                    style={{ width: `${val}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    // Default: compact
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {VITAL_CONFIG.map((v) => {
                const val = getVitalValue(v.key);
                const label = getLabel(v.key);

                return (
                    <VitalBar
                        key={v.key}
                        val={val}
                        color={v.color}
                        hex={v.hex}
                        icon={v.icon}
                        label={label}
                        onClick={onAction ? () => onAction(v.key, label, val) : undefined}
                    />
                );
            })}
        </div>
    );
}
