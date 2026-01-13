import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from './Sidebar';
import { useState } from 'react';
import { LayoutDashboard, Users, Shield, Car, Package, Settings, LogOut } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
      layout: 'fullscreen',
  }
};

export default meta;

const items: SidebarItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Players', route: 'players', icon: Users },
    { label: 'Admins', route: 'admins', icon: Shield },
    { divider: true, label: '', icon: Shield }, // icon prop needed for type but ignored for divider
    { label: 'Vehicles', route: 'vehicles', icon: Car },
    { label: 'Resources', route: 'resources', icon: Package },
    { label: 'Settings', route: 'settings', icon: Settings },
];

export const Default: StoryObj<typeof Sidebar> = {
  render: () => {
    const [active, setActive] = useState('dashboard');
    const [collapsed, setCollapsed] = useState(false); // Start expanded in story
    return (
        <div className="h-[600px] flex border">
            <Sidebar
                items={items}
                activeRoute={active}
                onNavigate={setActive}
                collapsed={collapsed}
                onToggleCollapse={() => setCollapsed(!collapsed)}
                footer={
                    collapsed ? (
                        <Button variant="ghost" size="icon" className="w-full justify-center">
                            <LogOut className="h-5 w-5" />
                        </Button>
                    ) : (
                        <Button variant="ghost" className="w-full justify-start gap-2 text-red-400 hover:text-red-500 hover:bg-red-400/10">
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </Button>
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
  }
};
