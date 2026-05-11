import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Database, Webhook, Radio, EyeOff, Bell, Filter, Bookmark } from 'lucide-react'
import { MriIconToggleButton } from './MriIconToggleButton'

const meta: Meta<typeof MriIconToggleButton> = {
    title: 'Atoms/MriIconToggleButton',
    component: MriIconToggleButton,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Single = () => {
    const [on, setOn] = useState(false)
    return <MriIconToggleButton active={on} onClick={() => setOn(!on)} icon={Database} title="DB" />
}

export const Default: StoryObj<typeof MriIconToggleButton> = {
    render: () => <Single />,
}

export const Variants: StoryObj<typeof MriIconToggleButton> = {
    render: () => {
        const Demo = () => {
            const [a, setA] = useState(true)
            const [b, setB] = useState(true)
            return (
                <div className="flex items-center gap-3">
                    <MriIconToggleButton active={a} onClick={() => setA(!a)} icon={Bookmark} title="Primary" variant="primary" />
                    <MriIconToggleButton active={b} onClick={() => setB(!b)} icon={EyeOff} title="Destructive" variant="destructive" />
                </div>
            )
        }
        return <Demo />
    },
}

export const Sizes: StoryObj<typeof MriIconToggleButton> = {
    render: () => {
        const Demo = () => {
            const [a, setA] = useState(true)
            const [b, setB] = useState(true)
            return (
                <div className="flex items-center gap-3">
                    <MriIconToggleButton active={a} onClick={() => setA(!a)} icon={Filter} size="sm" title="Small" />
                    <MriIconToggleButton active={b} onClick={() => setB(!b)} icon={Filter} size="default" title="Default" />
                </div>
            )
        }
        return <Demo />
    },
}

export const Disabled: StoryObj<typeof MriIconToggleButton> = {
    render: () => (
        <div className="flex items-center gap-3">
            <MriIconToggleButton active onClick={() => { }} icon={Database} disabled title="Disabled (on)" />
            <MriIconToggleButton active={false} onClick={() => { }} icon={Database} disabled title="Disabled (off)" />
        </div>
    ),
}

// Caso de uso real do Logs.tsx do mri_Qadmin — grid de toggles por categoria
const CategoryRow = () => {
    const [state, setState] = useState({ db: true, discord: false, relay: true, mute: false })
    return (
        <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-card">
            <span className="text-sm font-medium mr-auto">Player Connect</span>
            <MriIconToggleButton active={state.db} onClick={() => setState({ ...state, db: !state.db })} icon={Database} title="Salvar no DB" />
            <MriIconToggleButton active={state.discord} onClick={() => setState({ ...state, discord: !state.discord })} icon={Webhook} title="Webhook Discord" />
            <MriIconToggleButton active={state.relay} onClick={() => setState({ ...state, relay: !state.relay })} icon={Radio} title="Relay broadcast" />
            <MriIconToggleButton active={state.mute} onClick={() => setState({ ...state, mute: !state.mute })} icon={Bell} title="Notificacoes" variant="destructive" />
        </div>
    )
}

export const InCategoryRow: StoryObj<typeof MriIconToggleButton> = {
    render: () => <CategoryRow />,
}
