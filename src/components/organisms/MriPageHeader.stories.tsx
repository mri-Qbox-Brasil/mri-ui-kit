import type { Meta, StoryObj } from '@storybook/react';
import { MriPageHeader } from './MriPageHeader';
import { LayoutDashboard } from 'lucide-react';
import { MriButton } from '@/components/atoms/MriButton';
import { MriTeleportIcon } from '@/components/atoms/MriIcons';

const meta: Meta<typeof MriPageHeader> = {
  title: 'Organisms/MriPageHeader',
  component: MriPageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MriPageHeader>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    icon: LayoutDashboard,
    count: 123,
    countLabel: 'Players',
  },
};

export const WithActions: Story = {
  args: {
     title: 'Resource Manager',
     icon: LayoutDashboard,
     count: 5,
     countLabel: 'Resources',
     children: (
         <>
            <MriButton variant="outline" size="sm">Refresh</MriButton>
            <MriButton size="sm">Add New</MriButton>
         </>
     )
  }
}

// Subtitulo: o header vira duas linhas e o icone sobe pro topo da coluna.
export const WithDescription: Story = {
  args: {
    title: 'Resource Manager',
    icon: LayoutDashboard,
    description: 'Inicie, pare e recarregue os resources do servidor sem sair do painel.',
    count: 42,
    countLabel: 'Resources',
    children: (
        <>
           <MriButton variant="outline" size="sm">Refresh</MriButton>
           <MriButton size="sm">Add New</MriButton>
        </>
    )
  },
}

// Mesma flexibilidade de icone do MriSectionHeader e do MriSidebar.
export const IconSources: Story = {
  render: () => (
    <div className="space-y-4">
      <MriPageHeader icon={LayoutDashboard} title="Lucide" />
      <MriPageHeader icon={MriTeleportIcon} title="SVG do kit (MriIcons)" />
      <MriPageHeader
        icon={<span className="material-symbols-outlined text-[24px] leading-none">gavel</span>}
        title="Icon font (elemento pronto)"
      />
    </div>
  ),
}
