import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DatePicker {...args} value={date} onChange={setDate} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
