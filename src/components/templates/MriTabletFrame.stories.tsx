import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { LayoutDashboard, Users, Shield, Car, Package, Settings, Plus } from 'lucide-react'
import { MriTabletFrame, MriTabletFrameSize } from './MriTabletFrame'
import { MriDashboardLayout } from './MriDashboardLayout'
import { MriSidebar, MriSidebarItem } from '@/components/organisms/MriSidebar'
import { MriPageHeader } from '@/components/organisms/MriPageHeader'
import { MriButton } from '@/components/atoms/MriButton'

const meta: Meta<typeof MriTabletFrame> = {
    title: 'Templates/MriTabletFrame',
    component: MriTabletFrame,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        // Wallpaper escuro pra simular o look real no FiveM (jogo atras + tablet flutuando).
        (Story) => (
            <div
                className="w-screen h-screen"
                style={{
                    background:
                        'radial-gradient(circle at 30% 30%, #1a2332 0%, #0a0e15 60%, #000 100%)',
                }}
            >
                <Story />
            </div>
        ),
    ],
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

const PlaceholderContent = ({ route }: { route: string }) => (
    <div className="p-6 space-y-4">
        <p className="text-muted-foreground">
            Rota: <code className="bg-muted px-2 py-0.5 rounded">{route}</code>
        </p>
        <div className="grid grid-cols-3 gap-4">
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

const TabletWithDashboard = ({ size }: { size: MriTabletFrameSize }) => {
    const [active, setActive] = useState('dashboard')
    return (
        <MriTabletFrame size={size}>
            <MriDashboardLayout
                sidebar={
                    <MriSidebar items={sidebarItems} activeRoute={active} onNavigate={setActive} />
                }
                header={
                    <MriPageHeader title="Dashboard" icon={LayoutDashboard} count={42} countLabel="Items">
                        <MriButton size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Novo
                        </MriButton>
                    </MriPageHeader>
                }
            >
                <PlaceholderContent route={active} />
            </MriDashboardLayout>
        </MriTabletFrame>
    )
}

export const Default: StoryObj<typeof MriTabletFrame> = {
    render: () => <TabletWithDashboard size="md" />,
}

export const Small: StoryObj<typeof MriTabletFrame> = {
    render: () => <TabletWithDashboard size="sm" />,
}

export const Large: StoryObj<typeof MriTabletFrame> = {
    render: () => <TabletWithDashboard size="lg" />,
}

export const Fullscreen: StoryObj<typeof MriTabletFrame> = {
    render: () => <TabletWithDashboard size="fullscreen" />,
}

const Scaled = () => {
    const [scale, setScale] = useState(100)
    return (
        <>
            <MriTabletFrame scale={scale}>
                <MriDashboardLayout
                    header={<MriPageHeader title={`Scale: ${scale}%`} icon={LayoutDashboard} />}
                >
                    <PlaceholderContent route="scaled" />
                </MriDashboardLayout>
            </MriTabletFrame>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 shadow-2xl">
                <span className="text-xs text-muted-foreground">Scale</span>
                <input
                    type="range"
                    min={50}
                    max={150}
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-48 accent-primary"
                />
                <span className="text-xs font-mono w-10">{scale}%</span>
            </div>
        </>
    )
}

export const WithUserScale: StoryObj<typeof MriTabletFrame> = {
    render: () => <Scaled />,
}

const Toggleable = () => {
    const [visible, setVisible] = useState(true)
    return (
        <>
            <MriTabletFrame visible={visible}>
                <MriDashboardLayout
                    header={<MriPageHeader title="Toggleable" icon={LayoutDashboard} />}
                >
                    <PlaceholderContent route="toggleable" />
                </MriDashboardLayout>
            </MriTabletFrame>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
                <MriButton onClick={() => setVisible(!visible)}>
                    {visible ? 'Hide tablet' : 'Show tablet'}
                </MriButton>
            </div>
        </>
    )
}

export const Toggle: StoryObj<typeof MriTabletFrame> = {
    render: () => <Toggleable />,
}
