import type { Meta, StoryObj } from '@storybook/react';
import { MriEconomyCard } from './MriEconomyCard';

const meta: Meta<typeof MriEconomyCard> = {
  title: 'Molecules/MriEconomyCard',
  component: MriEconomyCard,
  tags: ['autodocs'],
  argTypes: {
    amountColorClass: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MriEconomyCard>;

export const Default: Story = {
  args: {
    label: 'Bank Balance',
    amount: '$5,000,000',
    amountColorClass: 'text-green-500',
    onAdd: () => alert('Add clicked'),
    onRemove: () => alert('Remove clicked'),
  },
};

export const Negative: Story = {
    args: {
        label: 'Debt',
        amount: '-$500',
        amountColorClass: 'text-red-500',
    }
}
