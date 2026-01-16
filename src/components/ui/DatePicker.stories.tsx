import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

const DatePickerWithState = (args: React.ComponentProps<typeof DatePicker>) => {
  const [date, setDate] = useState<Date | undefined>(args.value || undefined);
  return <DatePicker {...args} value={date} onChange={setDate} />;
};

export const Default: Story = {
  render: (args) => <DatePickerWithState {...args} />,
};

export const WithValue: Story = {
  args: {
    value: new Date(),
  },
  render: (args) => <DatePickerWithState {...args} />,
};

import { enUS } from 'date-fns/locale';

export const EnglishLocale: Story = {
  args: {
    placeholder: "Select a date",
    locale: enUS,
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
