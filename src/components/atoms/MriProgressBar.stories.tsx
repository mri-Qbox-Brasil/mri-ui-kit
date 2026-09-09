import type { Meta, StoryObj } from '@storybook/react'
import { MriProgressBar } from './MriProgressBar'

const meta: Meta<typeof MriProgressBar> = {
    title: 'Atoms/MriProgressBar',
    component: MriProgressBar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

export const Default: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80">
            <MriProgressBar value={64} aria-label="Progresso" />
        </div>
    ),
}

export const Sizes: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80 space-y-4">
            <MriProgressBar value={40} size="sm" />
            <MriProgressBar value={60} size="default" />
            <MriProgressBar value={80} size="lg" />
        </div>
    ),
}

export const Colors: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80 space-y-4">
            {[
                { c: '#ef4444', v: 92 },
                { c: '#3b82f6', v: 55 },
                { c: '#f59e0b', v: 38 },
                { c: '#06b6d4', v: 71 },
                { c: '#a855f7', v: 18 },
            ].map((b) => (
                <MriProgressBar key={b.c} value={b.v} color={b.c} />
            ))}
        </div>
    ),
}

// `shimmer` usa o keyframe homonimo da tailwind.config.
export const Shimmer: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80 space-y-4">
            <MriProgressBar value={75} color="#ef4444" size="lg" shimmer />
            <MriProgressBar value={45} size="lg" shimmer />
        </div>
    ),
}

export const NoGlow: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80">
            <MriProgressBar value={50} glow={false} />
        </div>
    ),
}

// `max` diferente de 100 — o percentual sai do proprio range.
export const CustomMax: StoryObj<typeof MriProgressBar> = {
    render: () => (
        <div className="w-80 space-y-2">
            <p className="text-xs text-muted-foreground">120 / 250 munições</p>
            <MriProgressBar value={120} max={250} color="#f59e0b" />
        </div>
    ),
}
