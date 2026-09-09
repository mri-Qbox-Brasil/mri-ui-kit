import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriCheckbox } from './MriCheckbox'

const meta: Meta<typeof MriCheckbox> = {
    title: 'Atoms/MriCheckbox',
    component: MriCheckbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Controlled = ({ label, ...props }: { label?: string; size?: 'sm' | 'default' | 'lg'; disabled?: boolean }) => {
    const [on, setOn] = useState(false)
    return <MriCheckbox checked={on} onCheckedChange={setOn} label={label ?? 'Blip habilitado no mapa'} {...props} />
}

export const Default: StoryObj<typeof MriCheckbox> = {
    render: () => <Controlled />,
}

export const Sizes: StoryObj<typeof MriCheckbox> = {
    render: () => (
        <div className="flex flex-col gap-3">
            <Controlled size="sm" label="Pequeno" />
            <Controlled size="default" label="Padrão" />
            <Controlled size="lg" label="Grande" />
        </div>
    ),
}

export const Disabled: StoryObj<typeof MriCheckbox> = {
    render: () => (
        <div className="flex flex-col gap-3">
            <MriCheckbox checked={false} onCheckedChange={() => {}} disabled label="Desmarcado" />
            <MriCheckbox checked onCheckedChange={() => {}} disabled label="Marcado" />
        </div>
    ),
}

// Estado parcial: o pai reflete uma selecao mista dos filhos.
export const Indeterminate: StoryObj<typeof MriCheckbox> = {
    render: () => {
        const Tree = () => {
            const [items, setItems] = useState([true, false, false])
            const all = items.every(Boolean)
            const some = items.some(Boolean) && !all
            return (
                <div className="space-y-2">
                    <MriCheckbox
                        checked={all}
                        indeterminate={some}
                        onCheckedChange={(v) => setItems(items.map(() => v))}
                        label="Todos os blips"
                    />
                    <div className="ml-6 space-y-2">
                        {items.map((it, i) => (
                            <MriCheckbox
                                key={i}
                                checked={it}
                                onCheckedChange={(v) => setItems(items.map((old, j) => (j === i ? v : old)))}
                                label={`Blip ${i + 1}`}
                                size="sm"
                            />
                        ))}
                    </div>
                </div>
            )
        }
        return <Tree />
    },
}
