import type { Meta, StoryObj } from '@storybook/react';
import { MriStatusBadge } from './MriStatusBadge';

const meta: Meta<typeof MriStatusBadge> = {
  title: 'Atoms/MriStatusBadge',
  component: MriStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'outline', 'ghost'],
    },
    size: {
        control: 'select',
        options: ['xs', 'sm', 'md']
    }
  },
};

export default meta;
type Story = StoryObj<typeof MriStatusBadge>;

export const Default: Story = {
  args: {
    label: 'Default',
    variant: 'default',
    size: 'xs',
  },
};

export const Success: Story = {
    args: {
        label: 'Active',
        variant: 'success',
        size: 'sm'
    }
}

export const Warning: Story = {
    args: {
        label: 'Pending',
        variant: 'warning',
        size: 'md'
    }
}

export const Destructive: Story = {
    args: {
        label: 'Banned',
        variant: 'destructive',
    }
}
