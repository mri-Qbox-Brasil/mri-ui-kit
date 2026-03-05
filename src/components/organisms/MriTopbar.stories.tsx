import type { Meta, StoryObj } from '@storybook/react';
import { MriTopbar, MriTopbarItem } from './MriTopbar';
import { useState } from 'react';
import { LayoutDashboard, Users, Shield, Car, Package, Settings, LogOut, Bell, Search } from 'lucide-react';
import { MriButton } from '@/components/atoms/MriButton';

const meta: Meta<typeof MriTopbar> = {
  title: 'Organisms/MriTopbar',
  component: MriTopbar,
  tags: ['autodocs'],
  parameters: {
      layout: 'fullscreen',
  }
};

export default meta;

const items: MriTopbarItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Players', route: 'players', icon: Users },
    { label: 'Admins', route: 'admins', icon: Shield },
    { divider: true, label: '', icon: Shield },
    { label: 'Vehicles', route: 'vehicles', icon: Car },
    { label: 'Resources', route: 'resources', icon: Package },
    { label: 'Settings', route: 'settings', icon: Settings },
];

const TopbarDemo = () => {
    const [active, setActive] = useState('dashboard');
    return (
        <div className="h-[600px] flex flex-col border bg-background">
            <MriTopbar
                logo={
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">M</div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">MRI <span className="text-primary italic">UI</span></span>
                    </div>
                }
                items={items}
                activeRoute={active}
                onNavigate={setActive}
                rightContent={
                    <div className="flex items-center gap-2">
                        <MriButton variant="ghost" size="icon" className="h-9 w-9">
                            <Search className="h-4 w-4" />
                        </MriButton>
                        <MriButton variant="ghost" size="icon" className="h-9 w-9 relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                        </MriButton>
                        <div className="h-6 w-px bg-border mx-1" />
                        <MriButton variant="ghost" className="gap-2 px-3">
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">JD</div>
                            <span className="text-sm font-medium">John Doe</span>
                        </MriButton>
                        <MriButton variant="ghost" size="icon" className="h-9 w-9 text-red-400 hover:text-red-500 hover:bg-red-400/10">
                            <LogOut className="h-4 w-4" />
                        </MriButton>
                    </div>
                }
            />
            <div className="flex-1 p-8 text-foreground flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Welcome to the Dashboard</h1>
                <p className="text-muted-foreground text-lg mb-8">Selected Route: <code className="bg-muted px-2 py-1 rounded text-primary">{active}</code></p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <LayoutDashboard className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Widget {i}</h3>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${i * 30}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export const Default: StoryObj<typeof MriTopbar> = {
  render: () => <TopbarDemo />
};
