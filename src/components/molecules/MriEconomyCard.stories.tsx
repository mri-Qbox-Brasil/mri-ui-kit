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
    defaultVisible: true,
  },
};

export const Negative: Story = {
  args: {
    label: 'Debt',
    amount: '-$500',
    amountColorClass: 'text-red-500',
    defaultVisible: true,
  },
};

export const HiddenByDefault: Story = {
  args: {
    label: 'Secret Balance',
    amount: '$9,999,999',
    amountColorClass: 'text-green-500',
    onAdd: () => alert('Add clicked'),
    onRemove: () => alert('Remove clicked'),
    defaultVisible: false,
  },
};

export const DisabledButtons: Story = {
  args: {
    label: 'Frozen Account',
    amount: '$1,234',
    amountColorClass: 'text-yellow-500',
    onAdd: () => alert('Add clicked'),
    onRemove: () => alert('Remove clicked'),
    disableAdd: true,
    disableRemove: true,
    defaultVisible: true,
  },
};
