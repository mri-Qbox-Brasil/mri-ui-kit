import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriSwitch } from './MriSwitch'

const meta: Meta<typeof MriSwitch> = {
    title: 'Atoms/MriSwitch',
    component: MriSwitch,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Controlled = ({ size, disabled }: { size?: 'sm' | 'default'; disabled?: boolean }) => {
    const [on, setOn] = useState(false)
    return (
        <label className="flex items-center gap-3 text-sm">
            <MriSwitch checked={on} onCheckedChange={setOn} size={size} disabled={disabled} />
            <span className="text-foreground">{on ? 'Ligado' : 'Desligado'}</span>
        </label>
    )
}

export const Default: StoryObj<typeof MriSwitch> = {
    render: () => <Controlled />,
}

export const Small: StoryObj<typeof MriSwitch> = {
    render: () => <Controlled size="sm" />,
}

export const Disabled: StoryObj<typeof MriSwitch> = {
    render: () => (
        <div className="flex flex-col gap-3">
            <Controlled disabled />
            <Controlled disabled size="sm" />
        </div>
    ),
}

export const InForm: StoryObj<typeof MriSwitch> = {
    render: () => {
        const Form = () => {
            const [debug, setDebug] = useState(false)
            const [notifications, setNotifications] = useState(true)
            const [autoSave, setAutoSave] = useState(true)
            return (
                <div className="w-80 space-y-4 p-4 border border-border rounded-lg bg-card">
                    {[
                        { label: 'Modo debug', desc: 'Logs no console F8', state: debug, setState: setDebug },
                        { label: 'Notificações', desc: 'Toast no canto inferior', state: notifications, setState: setNotifications },
                        { label: 'Auto-save', desc: 'Salva ao trocar de aba', state: autoSave, setState: setAutoSave },
                    ].map((item) => (
                        <label key={item.label} className="flex items-start justify-between gap-3 cursor-pointer">
                            <div>
                                <p className="font-semibold text-sm text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <MriSwitch checked={item.state} onCheckedChange={item.setState} aria-label={item.label} />
                        </label>
                    ))}
                </div>
            )
        }
        return <Form />
    },
}
