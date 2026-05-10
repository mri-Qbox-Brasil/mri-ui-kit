import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MapPin, Settings, Users, Shield, Plus } from 'lucide-react'
import { MriTabs, MriTabsItem } from './MriTabs'
import { MriBadge } from '@/components/atoms/MriBadge'
import { MriButton } from '@/components/atoms/MriButton'

const meta: Meta<typeof MriTabs> = {
    title: 'Molecules/MriTabs',
    component: MriTabs,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
}

export default meta

const items: MriTabsItem[] = [
    { label: 'Spawns', icon: MapPin, route: 'spawns' },
    { label: 'Configurações', icon: Settings, route: 'config' },
]

const Controlled = () => {
    const [route, setRoute] = useState('spawns')
    return (
        <div className="w-full max-w-3xl">
            <MriTabs items={items} activeRoute={route} onNavigate={setRoute} />
            <div className="p-6 text-sm text-muted-foreground">
                Conteúdo da rota: <code className="bg-muted px-2 py-0.5 rounded">{route}</code>
            </div>
        </div>
    )
}

export const Default: StoryObj<typeof MriTabs> = {
    render: () => <Controlled />,
}

const WithBadges = () => {
    const [route, setRoute] = useState('users')
    return (
        <div className="w-full max-w-3xl">
            <MriTabs
                activeRoute={route}
                onNavigate={setRoute}
                items={[
                    {
                        label: 'Users',
                        icon: Users,
                        route: 'users',
                        badge: <MriBadge variant="secondary">42</MriBadge>,
                    },
                    {
                        label: 'Permissions',
                        icon: Shield,
                        route: 'perms',
                        badge: <MriBadge variant="destructive">3</MriBadge>,
                    },
                    { label: 'Settings', icon: Settings, route: 'settings' },
                ]}
            />
        </div>
    )
}

export const WithBadges_: StoryObj<typeof MriTabs> = {
    render: () => <WithBadges />,
}

const WithRightAction = () => {
    const [route, setRoute] = useState('spawns')
    return (
        <div className="w-full max-w-3xl">
            <MriTabs
                items={items}
                activeRoute={route}
                onNavigate={setRoute}
                rightContent={
                    <MriButton size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Novo
                    </MriButton>
                }
            />
        </div>
    )
}

export const WithRightAction_: StoryObj<typeof MriTabs> = {
    render: () => <WithRightAction />,
}

const WithDisabled = () => {
    const [route, setRoute] = useState('spawns')
    return (
        <div className="w-full max-w-3xl">
            <MriTabs
                activeRoute={route}
                onNavigate={setRoute}
                items={[
                    { label: 'Spawns', icon: MapPin, route: 'spawns' },
                    { label: 'Settings', icon: Settings, route: 'config' },
                    { label: 'Coming soon', icon: Shield, route: 'soon', disabled: true },
                ]}
            />
        </div>
    )
}

export const WithDisabled_: StoryObj<typeof MriTabs> = {
    render: () => <WithDisabled />,
}
