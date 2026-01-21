import type { Meta, StoryObj } from '@storybook/react';
import MriButtonGroup from './MriButtonGroup';
import { Home, User, Settings } from 'lucide-react';

const meta: Meta<typeof MriButtonGroup> = {
  title: 'Molecules/MriButtonGroup',
  component: MriButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MriButtonGroup>;

export const Default: Story = {
  args: {
    buttons: [
      { label: 'Home', icon: <Home className="w-4 h-4" />, onClick: () => alert('Home clicked') },
      { label: 'Profile', icon: <User className="w-4 h-4" />, onClick: () => alert('Profile clicked') },
      { label: 'Settings', icon: <Settings className="w-4 h-4" />, onClick: () => alert('Settings clicked') },
    ],
  },
};

export const DisabledItem: Story = {
  args: {
    buttons: [
      { label: 'Active', onClick: () => {} },
      { label: 'Disabled', disabled: true, onClick: () => {} },
    ],
  },
};
