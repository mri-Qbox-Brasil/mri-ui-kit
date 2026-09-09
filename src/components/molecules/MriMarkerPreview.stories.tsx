import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriMarkerPreview } from './MriMarkerPreview'
import { MriSlider } from '@/components/atoms/MriSlider'
import type { MarkerColor } from './MriMarkerPicker.constants'

const meta: Meta<typeof MriMarkerPreview> = {
    title: 'Molecules/MriMarkerPreview',
    component: MriMarkerPreview,
    tags: ['autodocs'],
}

export default meta

const CDN = 'https://assets.mriqbox.com.br/'
const FILE = 'markers/27_vertical_cylinder.png'

const GREEN: MarkerColor = { r: 0, g: 230, b: 153, a: 255 }

export const Default: StoryObj<typeof MriMarkerPreview> = {
    render: () => <MriMarkerPreview file={FILE} base={CDN} color={GREEN} className="w-28 h-28 rounded" />,
}

// A cor entra por multiply, replicando o DrawMarker: onde o PNG e claro a cor
// aparece, onde e escuro permanece escuro.
export const Colors: StoryObj<typeof MriMarkerPreview> = {
    render: () => (
        <div className="flex gap-3">
            {[
                { r: 239, g: 68, b: 68, a: 255 },
                { r: 59, g: 130, b: 246, a: 255 },
                { r: 245, g: 158, b: 11, a: 255 },
                { r: 168, g: 85, b: 247, a: 255 },
            ].map((c, i) => (
                <MriMarkerPreview key={i} file={FILE} base={CDN} color={c} className="w-20 h-20 rounded" />
            ))}
        </div>
    ),
}

// O alpha controla a opacidade da camada inteira.
export const AlphaLive: StoryObj<typeof MriMarkerPreview> = {
    render: () => {
        const Demo = () => {
            const [a, setA] = useState(255)
            return (
                <div className="w-64 space-y-3">
                    <MriMarkerPreview file={FILE} base={CDN} color={{ ...GREEN, a }} className="w-28 h-28 rounded" />
                    <MriSlider value={a} onChange={setA} max={255} size="sm" />
                    <p className="text-xs font-mono text-muted-foreground">alpha: {a}</p>
                </div>
            )
        }
        return <Demo />
    },
}

// Sem `file`, vira so o quadrado da cor — com texto opcional de fallback.
export const NoFile: StoryObj<typeof MriMarkerPreview> = {
    render: () => (
        <MriMarkerPreview file={undefined} base={CDN} color={GREEN} className="w-24 h-24 rounded" fallbackText="Type 27" />
    ),
}
