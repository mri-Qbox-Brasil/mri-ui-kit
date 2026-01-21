import type { Meta, StoryObj } from '@storybook/react';
import { MriGridActionButton } from './MriGridActionButton';
import { Home, Trash2, AlertTriangle } from 'lucide-react';

const meta: Meta<typeof MriGridActionButton> = {
  title: 'Molecules/MriGridActionButton',
  component: MriGridActionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
        control: 'select',
        options: ['default', 'destructive', 'warning'],
    },
    icon: {
        control: false
    }
  },
};

export default meta;
type Story = StoryObj<typeof MriGridActionButton>;

export const Default: Story = {
  args: {
    label: 'Go Home',
    icon: Home,
    onClick: () => alert('Clicked'),
  },
};

export const Destructive: Story = {
    args: {
        label: 'Delete Item',
        icon: Trash2,
        variant: 'destructive',
        onClick: () => alert('Delete clicked'),
    }
}

export const Warning: Story = {
    args: {
        label: 'Warning Action',
        icon: AlertTriangle,
        variant: 'warning',
        onClick: () => alert('Warning clicked'),
    }
}
