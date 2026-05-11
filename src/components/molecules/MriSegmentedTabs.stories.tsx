import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { LayoutGrid, List, Users, Activity, AlertTriangle, Bell, Shield } from 'lucide-react'
import { MriSegmentedTabs } from './MriSegmentedTabs'

const meta: Meta<typeof MriSegmentedTabs> = {
    title: 'Molecules/MriSegmentedTabs',
    component: MriSegmentedTabs,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const ViewPicker = () => {
    const [view, setView] = useState('grid')
    return (
        <div className="w-64">
            <MriSegmentedTabs
                items={[
                    { id: 'grid', label: 'Grid', icon: LayoutGrid },
                    { id: 'list', label: 'List', icon: List },
                ]}
                value={view}
                onChange={setView}
            />
        </div>
    )
}

export const SingleSelect: StoryObj<typeof MriSegmentedTabs> = {
    render: () => <ViewPicker />,
}

const PlayerFilter = () => {
    const [filter, setFilter] = useState('all')
    return (
        <div className="w-96">
            <MriSegmentedTabs
                items={[
                    { id: 'all', label: 'Todos', icon: Users },
                    { id: 'online', label: 'Online', icon: Activity },
                    { id: 'banned', label: 'Banidos', icon: AlertTriangle },
                ]}
                value={filter}
                onChange={setFilter}
            />
        </div>
    )
}

export const SingleWithIcons: StoryObj<typeof MriSegmentedTabs> = {
    render: () => <PlayerFilter />,
}

const ChipFilter = () => {
    const [selected, setSelected] = useState<string[]>(['notif', 'security'])
    return (
        <div className="w-96 space-y-3">
            <MriSegmentedTabs
                type="multiple"
                items={[
                    { id: 'notif', label: 'Notificações', icon: Bell },
                    { id: 'security', label: 'Segurança', icon: Shield },
                    { id: 'activity', label: 'Atividade', icon: Activity },
                ]}
                value={selected}
                onChange={setSelected}
            />
            <p className="text-xs text-muted-foreground">
                Selecionados: {selected.length === 0 ? 'nenhum' : selected.join(', ')}
            </p>
        </div>
    )
}

export const MultipleSelect: StoryObj<typeof MriSegmentedTabs> = {
    render: () => <ChipFilter />,
}

const PremiumVariant = () => {
    const [view, setView] = useState('grid')
    return (
        <div className="w-64">
            <MriSegmentedTabs
                variant="premium"
                items={[
                    { id: 'grid', label: 'Grid', icon: LayoutGrid },
                    { id: 'list', label: 'List', icon: List },
                ]}
                value={view}
                onChange={setView}
            />
        </div>
    )
}

export const PremiumVariant_: StoryObj<typeof MriSegmentedTabs> = {
    render: () => <PremiumVariant />,
}
