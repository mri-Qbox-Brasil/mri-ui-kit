import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriColorSwatchGrid } from './MriColorSwatchGrid'
import { DEFAULT_BLIP_COLORS } from './MriBlipPicker.constants'

const meta: Meta<typeof MriColorSwatchGrid> = {
    title: 'Molecules/MriColorSwatchGrid',
    component: MriColorSwatchGrid,
    tags: ['autodocs'],
}

export default meta

// A paleta oficial de color IDs de blip — o caso que originou o componente.
export const BlipColors: StoryObj<typeof MriColorSwatchGrid> = {
    render: () => {
        const Demo = () => {
            const [id, setId] = useState<number | string>(1)
            return (
                <div className="w-[520px] space-y-2">
                    <MriColorSwatchGrid swatches={DEFAULT_BLIP_COLORS} value={id} onChange={setId} />
                    <p className="text-xs text-muted-foreground">
                        Selecionado: <span className="font-mono">{id}</span>
                    </p>
                </div>
            )
        }
        return <Demo />
    },
}

export const FewColumns: StoryObj<typeof MriColorSwatchGrid> = {
    render: () => {
        const Demo = () => {
            const [id, setId] = useState<number | string>('gang')
            return (
                <div className="w-56">
                    <MriColorSwatchGrid
                        columns={4}
                        swatches={[
                            { id: 'police', hex: '#3b82f6', name: 'Polícia' },
                            { id: 'ems', hex: '#ef4444', name: 'EMS' },
                            { id: 'mech', hex: '#f59e0b', name: 'Mecânica' },
                            { id: 'gang', hex: '#a855f7', name: 'Gang' },
                        ]}
                        value={id}
                        onChange={setId}
                        showActiveId={false}
                        swatchClassName="h-10"
                    />
                </div>
            )
        }
        return <Demo />
    },
}
