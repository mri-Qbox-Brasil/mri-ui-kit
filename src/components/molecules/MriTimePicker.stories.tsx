import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MriTimePicker } from './MriTimePicker';

const meta: Meta<typeof MriTimePicker> = {
  title: 'Molecules/MriTimePicker',
  component: MriTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const TimePickerWithState = (args: React.ComponentProps<typeof MriTimePicker>) => {
    const [time, setTime] = useState<string>(args.value || "00:00");
    return <MriTimePicker {...args} value={time} onChange={setTime} />;
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

export const WithCustomLabels: Story = {
  args: {
    hourLabel: "Horas",
    minuteLabel: "Minutos",
  },
  render: (args) => <TimePickerWithState {...args} />,
};

export const Disabled: Story = {
  render: (args) => {
    return <MriTimePicker {...args} value="12:00" onChange={() => {}} disabled />;
  },
};
