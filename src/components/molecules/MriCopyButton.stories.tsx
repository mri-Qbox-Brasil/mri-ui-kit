import type { Meta, StoryObj } from '@storybook/react';
import { MriCopyButton } from './MriCopyButton';

const meta: Meta<typeof MriCopyButton> = {
  title: 'Molecules/MriCopyButton',
  component: MriCopyButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'outline', 'default', 'secondary', 'link'],
    },
    iconSize: {
        control: 'number',
        description: 'Size of the icon in Tailwind units (4 = 1rem)'
    }
  },
};

export default meta;
type Story = StoryObj<typeof MriCopyButton>;

export const Default: Story = {
  args: {
    text: 'Text to copy',
    iconSize: 4,
    variant: 'ghost',
  },
};

export const WithCustomSize: Story = {
    args: {
        text: 'Large Icon',
        iconSize: 6,
        variant: 'outline',
        className: 'w-10 h-10'
    }
}
