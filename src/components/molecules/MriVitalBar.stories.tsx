import type { Meta, StoryObj } from '@storybook/react'
import { MriVitalBar } from './MriVitalBar'
import { MRI_VITAL_LIST } from './mri-vital-config'

const meta: Meta<typeof MriVitalBar> = {
    title: 'Molecules/MriVitalBar',
    component: MriVitalBar,
    tags: ['autodocs'],
}

export default meta

const VALUES: Record<string, number> = { health: 92, armor: 40, hunger: 68, thirst: 25, stress: 12 }

export const Default: StoryObj<typeof MriVitalBar> = {
    render: () => (
        <div className="w-80 space-y-3">
            {MRI_VITAL_LIST.map((v) => (
                <MriVitalBar key={v.key} value={VALUES[v.key]} icon={v.icon} color={v.hex} label={v.label} />
            ))}
        </div>
    ),
}

// Com onClick a linha inteira vira alvo; o icone pode ter acao propria.
export const Interactive: StoryObj<typeof MriVitalBar> = {
    render: () => (
        <div className="w-80 space-y-3">
            {MRI_VITAL_LIST.map((v) => (
                <MriVitalBar
                    key={v.key}
                    value={VALUES[v.key]}
                    icon={v.icon}
                    color={v.hex}
                    label={v.label}
                    onClick={() => console.log('ajustar', v.key)}
                    onIconClick={() => console.log('ação rápida', v.key)}
                />
            ))}
        </div>
    ),
}

export const Disabled: StoryObj<typeof MriVitalBar> = {
    render: () => (
        <div className="w-80 space-y-3">
            {MRI_VITAL_LIST.slice(0, 3).map((v, i) => (
                <MriVitalBar
                    key={v.key}
                    value={VALUES[v.key]}
                    icon={v.icon}
                    color={v.hex}
                    label={v.label}
                    disabled={i === 1}
                    onClick={() => {}}
                />
            ))}
        </div>
    ),
}

export const WithoutValue: StoryObj<typeof MriVitalBar> = {
    render: () => (
        <div className="w-64 space-y-3">
            {MRI_VITAL_LIST.slice(0, 2).map((v) => (
                <MriVitalBar key={v.key} value={VALUES[v.key]} icon={v.icon} color={v.hex} label={v.label} showValue={false} />
            ))}
        </div>
    ),
}
