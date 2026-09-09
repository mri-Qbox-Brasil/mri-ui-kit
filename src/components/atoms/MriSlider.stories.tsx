import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriSlider, type MriSliderProps } from './MriSlider'

const meta: Meta<typeof MriSlider> = {
    title: 'Atoms/MriSlider',
    component: MriSlider,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Controlled = ({ initial = 60, ...props }: Partial<MriSliderProps> & { initial?: number }) => {
    const [v, setV] = useState(initial)
    return (
        <div className="w-80">
            <MriSlider {...props} value={v} onChange={setV} />
        </div>
    )
}

export const Default: StoryObj<typeof MriSlider> = {
    render: () => <Controlled />,
}

export const Sizes: StoryObj<typeof MriSlider> = {
    render: () => (
        <div className="flex flex-col gap-6">
            <Controlled size="sm" />
            <Controlled size="default" />
            <Controlled size="lg" />
        </div>
    ),
}

// Cor livre + trilho tingido: o formato usado no MriVitalAdjustModal.
export const Vitals: StoryObj<typeof MriSlider> = {
    render: () => (
        <div className="flex flex-col gap-8">
            {[
                { label: 'Health', color: '#ef4444' },
                { label: 'Armor', color: '#3b82f6' },
                { label: 'Stress', color: '#a855f7' },
            ].map((v) => (
                <div key={v.label} className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{v.label}</p>
                    <Controlled color={v.color} tintedTrack ticks formatTick={(n) => `${n}%`} />
                </div>
            ))}
        </div>
    ),
}

// Faixa fracionaria (scale de blip/marker): step decimal e marcas formatadas.
export const FractionalRange: StoryObj<typeof MriSlider> = {
    render: () => (
        <Controlled initial={1} min={0.5} max={1.5} step={0.05} ticks={2} formatTick={(n) => `${n.toFixed(1)}x`} />
    ),
}

// Sem halo: util em listas densas (ex.: canais RGBA).
export const Flat: StoryObj<typeof MriSlider> = {
    render: () => (
        <div className="flex flex-col gap-4">
            {(['R', 'G', 'B', 'A'] as const).map((ch) => (
                <div key={ch} className="flex items-center gap-3">
                    <span className="w-3 text-[10px] font-mono uppercase text-muted-foreground">{ch}</span>
                    <Controlled initial={128} max={255} size="sm" glow={false} />
                </div>
            ))}
        </div>
    ),
}

export const Disabled: StoryObj<typeof MriSlider> = {
    render: () => <Controlled disabled color="#ef4444" tintedTrack ticks formatTick={(n) => `${n}%`} />,
}
