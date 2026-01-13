import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { LayoutDashboard } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof PageHeader> = {
  title: 'UI/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

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
            <Button variant="outline" size="sm">Refresh</Button>
            <Button size="sm">Add New</Button>
         </>
     )
  }
}
