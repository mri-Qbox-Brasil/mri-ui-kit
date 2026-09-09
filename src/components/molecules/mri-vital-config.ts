import { Heart, Shield, Beef, GlassWater, Brain, type LucideIcon } from 'lucide-react'

export type MriVitalKey = 'health' | 'armor' | 'hunger' | 'thirst' | 'stress'

export interface MriVitalConfig {
    key: MriVitalKey
    icon: LucideIcon
    /** Rotulo default em ingles — o consumer sobrescreve via `labels`. */
    label: string
    /** Cor canonica do vital. Fonte unica pros estilos inline (fill, halo). */
    hex: string
    /** Valor que representa 100%. */
    max: number
    /** Classes Tailwind derivadas do `hex` (usadas em halos e botoes). */
    text: string
    bg: string
    border: string
    shadow: string
    /** Valor alto = ruim (stress). */
    inverted?: boolean
}

/**
 * Config canonica dos vitals do FiveM, compartilhada por [MriPlayerVitals],
 * [MriVitalBar] e [MriVitalAdjustModal]. Antes cada um tinha a propria copia e
 * elas ja tinham divergido (o shadow do hunger usava 145,158,11 enquanto o hex
 * era #f59e0b = 245,158,11).
 */
export const MRI_VITALS: Record<MriVitalKey, MriVitalConfig> = {
    health: {
        key: 'health', icon: Heart, label: 'health', hex: '#ef4444', max: 100,
        text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-500/20', shadow: 'shadow-red-500/20',
    },
    armor: {
        key: 'armor', icon: Shield, label: 'armor', hex: '#3b82f6', max: 100,
        text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-500/20', shadow: 'shadow-blue-500/20',
    },
    hunger: {
        key: 'hunger', icon: Beef, label: 'hunger', hex: '#f59e0b', max: 100,
        text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500/20', shadow: 'shadow-orange-500/20',
    },
    thirst: {
        key: 'thirst', icon: GlassWater, label: 'thirst', hex: '#06b6d4', max: 100,
        text: 'text-cyan-500', bg: 'bg-cyan-500', border: 'border-cyan-500/20', shadow: 'shadow-cyan-500/20',
    },
    stress: {
        key: 'stress', icon: Brain, label: 'stress', hex: '#a855f7', max: 100,
        text: 'text-purple-500', bg: 'bg-purple-500', border: 'border-purple-500/20', shadow: 'shadow-purple-500/20',
        inverted: true,
    },
}

/** Ordem de exibicao padrao. */
export const MRI_VITAL_ORDER: MriVitalKey[] = ['health', 'armor', 'hunger', 'thirst', 'stress']

export const MRI_VITAL_LIST: MriVitalConfig[] = MRI_VITAL_ORDER.map((k) => MRI_VITALS[k])
