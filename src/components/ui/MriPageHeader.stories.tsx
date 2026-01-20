import type { Meta, StoryObj } from '@storybook/react';
import { MriPageHeader } from './MriPageHeader';
import { LayoutDashboard } from 'lucide-react';
import { MriButton } from './MriButton';

const meta: Meta<typeof MriPageHeader> = {
  title: 'UI/MriPageHeader',
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
