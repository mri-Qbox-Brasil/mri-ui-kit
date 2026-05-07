import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
    LayoutDashboard,
    Users,
    Shield,
    Car,
    Package,
    Settings,
    LogOut,
    Bell,
    Plus,
} from 'lucide-react'
import { MriDashboardLayout } from './MriDashboardLayout'
import { MriSidebar, MriSidebarItem } from '@/components/organisms/MriSidebar'
import { MriTopbar, MriTopbarItem } from '@/components/organisms/MriTopbar'
import { MriPageHeader } from '@/components/organisms/MriPageHeader'
import { MriButton } from '@/components/atoms/MriButton'
import { MriThemeToggle } from '@/components/molecules/MriThemeToggle'

const meta: Meta<typeof MriDashboardLayout> = {
    title: 'Templates/MriDashboardLayout',
    component: MriDashboardLayout,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
}

export default meta

const sidebarItems: MriSidebarItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Players', route: 'players', icon: Users },
    { label: 'Admins', route: 'admins', icon: Shield },
    { divider: true, label: '', icon: Shield },
    { label: 'Vehicles', route: 'vehicles', icon: Car },
    { label: 'Resources', route: 'resources', icon: Package },
    { label: 'Settings', route: 'settings', icon: Settings },
]

const topbarItems: MriTopbarItem[] = [
    { label: 'Overview', route: 'overview', icon: LayoutDashboard },
    { label: 'Activity', route: 'activity', icon: Bell },
]

const PlaceholderContent = ({ route }: { route: string }) => (
    <div className="p-6 space-y-4">
        <p className="text-muted-foreground">
            Conteúdo da rota: <code className="bg-muted px-2 py-0.5 rounded">{route}</code>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                    key={i}
                    className="border border-border rounded-lg p-4 bg-card h-32 flex items-center justify-center text-muted-foreground"
                >
                    Card {i}
                </div>
            ))}
        </div>
    </div>
)

const FullDashboard = () => {
    const [active, setActive] = useState('dashboard')
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="h-screen">
            <MriDashboardLayout
                sidebar={
                    <MriSidebar
                        items={sidebarItems}
                        activeRoute={active}
                        onNavigate={setActive}
                        collapsed={collapsed}
                        onToggleCollapse={() => setCollapsed(!collapsed)}
                        footer={
                            collapsed ? (
                                <MriButton variant="ghost" size="icon" className="w-full justify-center">
                                    <LogOut className="h-5 w-5" />
                                </MriButton>
                            ) : (
                                <MriButton
                                    variant="ghost"
                                    className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-400/10"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </MriButton>
                            )
                        }
                    />
                }
                header={
                    <MriPageHeader
                        title="Dashboard"
                        icon={LayoutDashboard}
                        count={42}
                        countLabel="Items"
                    >
                        <MriThemeToggle />
                        <MriButton size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Novo
                        </MriButton>
                    </MriPageHeader>
                }
            >
                <PlaceholderContent route={active} />
            </MriDashboardLayout>
        </div>
    )
}

export const Default: StoryObj<typeof MriDashboardLayout> = {
    render: () => <FullDashboard />,
}

const WithTopbarBelow = () => {
    const [active, setActive] = useState('dashboard')
    const [topActive, setTopActive] = useState('overview')

    return (
        <div className="h-screen">
            <MriDashboardLayout
                topbarPlacement="below"
                topbar={
                    <MriTopbar
                        items={topbarItems}
                        activeRoute={topActive}
                        onNavigate={setTopActive}
                        logo={<span className="font-bold text-primary">MRI</span>}
                        rightContent={<MriThemeToggle />}
                    />
                }
                sidebar={
                    <MriSidebar
                        items={sidebarItems}
                        activeRoute={active}
                        onNavigate={setActive}
                    />
                }
                header={<MriPageHeader title="Visão Geral" icon={LayoutDashboard} />}
            >
                <PlaceholderContent route={`${topActive} / ${active}`} />
            </MriDashboardLayout>
        </div>
    )
}

export const TopbarBelow: StoryObj<typeof MriDashboardLayout> = {
    render: () => <WithTopbarBelow />,
}

const RightSidebar = () => {
    const [active, setActive] = useState('dashboard')

    return (
        <div className="h-screen">
            <MriDashboardLayout
                sidebarPosition="right"
                sidebar={
                    <MriSidebar
                        items={sidebarItems}
                        activeRoute={active}
                        onNavigate={setActive}
                    />
                }
                header={<MriPageHeader title="Sidebar à Direita" icon={Settings} />}
                footer={
                    <div className="px-6 py-3 text-xs text-muted-foreground">
                        © Mri UI Kit · v3.5.2
                    </div>
                }
            >
                <PlaceholderContent route={active} />
            </MriDashboardLayout>
        </div>
    )
}

export const SidebarRightWithFooter: StoryObj<typeof MriDashboardLayout> = {
    render: () => <RightSidebar />,
}
