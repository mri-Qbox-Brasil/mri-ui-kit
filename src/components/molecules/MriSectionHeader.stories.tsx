import type { Meta, StoryObj } from '@storybook/react';
import { MriSectionHeader } from './MriSectionHeader';
import { Settings, Info } from 'lucide-react';

const meta: Meta<typeof MriSectionHeader> = {
  title: 'Molecules/MriSectionHeader',
  component: MriSectionHeader,
  tags: ['autodocs'],
  argTypes: {
      icon: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof MriSectionHeader>;

export const Default: Story = {
  args: {
    title: 'General Settings',
    icon: Settings,
  },
};

export const CustomColor: Story = {
    args: {
        title: 'Important Info',
        icon: Info,
        className: 'text-blue-500'
    }
}
