import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

const TimePickerWithState = (args: React.ComponentProps<typeof TimePicker>) => {
    const [time, setTime] = useState<string>(args.value || "00:00");
    return <TimePicker {...args} value={time} onChange={setTime} />;
};

export const Default: Story = {
  render: (args) => <TimePickerWithState {...args} />,
};

export const WithPreselectedValue: Story = {
  args: {
    value: "14:30",
  },
  render: (args) => <TimePickerWithState {...args} />,
};

export const Disabled: Story = {
  render: (args) => {
    return <TimePicker {...args} value="12:00" onChange={() => {}} disabled />;
  },
};
