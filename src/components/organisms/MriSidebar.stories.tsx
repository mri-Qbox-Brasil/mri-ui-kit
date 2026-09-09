import type { Meta, StoryObj } from '@storybook/react';
import { MriSidebar, MriSidebarItem } from './MriSidebar';
import { useState } from 'react';
import { LayoutDashboard, Users, Shield, Car, Package, Settings, LogOut } from 'lucide-react';
import { MriButton } from '@/components/atoms/MriButton';

const meta: Meta<typeof MriSidebar> = {
  title: 'Organisms/MriSidebar',
  component: MriSidebar,
  tags: ['autodocs'],
  parameters: {
      layout: 'fullscreen',
  }
};

export default meta;

const items: MriSidebarItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Players', route: 'players', icon: Users },
    { label: 'Admins', route: 'admins', icon: Shield },
    { divider: true, label: '', icon: Shield }, // icon prop needed for type but ignored for divider
    { label: 'Vehicles', route: 'vehicles', icon: Car },
    { label: 'Resources', route: 'resources', icon: Package },
    { label: 'Settings', route: 'settings', icon: Settings },
];

const SidebarDemo = () => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false); // Start expanded in story
    return (
        <div className="h-[600px] flex border">
            <MriSidebar
                items={items}
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
                        <MriButton variant="ghost" className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-400/10">
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </MriButton>
                    )
                }
            />
            <div className="flex-1 p-8 bg-background text-foreground">
                <h1 className="text-3xl font-bold mb-4">Main Content</h1>
                <p>Selected Route: <code className="bg-muted px-2 py-1 rounded">{active}</code></p>
                <p className="mt-2">Sidebar is: <strong>{collapsed ? 'Expanded (Mode)' : 'Collapsed (Mode)'}</strong></p>
            </div>
        </div>
    )
};

export const Default: StoryObj<typeof MriSidebar> = {
  render: () => <SidebarDemo />
};

// header (logo) + heading (grupo rotulado) + icone via icon font, e o tooltip
// do modo colapsado. `icon` agora e opcional — divider/heading dispensam.
const groupedItems: MriSidebarItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Players', route: 'players', icon: Users },
    { heading: 'Moderação', label: '' },
    { label: 'Admins', route: 'admins', icon: Shield },
    { label: 'Bans', route: 'bans', icon: <span className="material-symbols-outlined text-[20px] leading-none">gavel</span> },
    { heading: 'Servidor', label: '' },
    { label: 'Vehicles', route: 'vehicles', icon: Car },
    { label: 'Resources', route: 'resources', icon: Package },
    { label: 'Settings', route: 'settings', icon: Settings },
];

const GroupedDemo = ({ startCollapsed = false }: { startCollapsed?: boolean }) => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(startCollapsed);
    return (
        <div className="h-screen flex bg-background">
            <MriSidebar
                items={groupedItems}
                activeRoute={active}
                onNavigate={setActive}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
                header={
                    collapsed ? (
                        <div className="w-8 h-8 rounded-md bg-primary/20 text-primary grid place-items-center font-black text-sm">M</div>
                    ) : (
                        <>
                            <div className="w-8 h-8 rounded-md bg-primary/20 text-primary grid place-items-center font-black text-sm shrink-0">M</div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-foreground truncate">mri_Qadmin</p>
                                <p className="text-[10px] text-muted-foreground truncate">v4.20.1</p>
                            </div>
                        </>
                    )
                }
            />
            <div className="flex-1 p-8 text-foreground">
                <h1 className="text-3xl font-bold mb-4">Grupos e tooltip</h1>
                <p>Rota: <code className="bg-muted px-2 py-1 rounded">{active}</code></p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Colapse a sidebar pra ver o tooltip de cada item.
                </p>
            </div>
        </div>
    );
};

export const WithHeaderAndGroups: StoryObj<typeof MriSidebar> = {
  render: () => <GroupedDemo />
};

export const CollapsedWithTooltips: StoryObj<typeof MriSidebar> = {
  render: () => <GroupedDemo startCollapsed />
};
