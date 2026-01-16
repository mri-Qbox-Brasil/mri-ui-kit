import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'UI/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [time, setTime] = useState<string>("00:00");
    return <TimePicker {...args} value={time} onChange={setTime} />;
  },
};

export const WithPreselectedValue: Story = {
  render: (args) => {
    const [time, setTime] = useState<string>("14:30");
    return <TimePicker {...args} value={time} onChange={setTime} />;
  },
};

export const Disabled: Story = {
  render: (args) => {
    return <TimePicker {...args} value="12:00" onChange={() => {}} disabled />;
  },
};
