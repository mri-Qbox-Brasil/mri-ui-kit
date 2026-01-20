import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { MriDatePicker } from './MriDatePicker';

const meta: Meta<typeof MriDatePicker> = {
  title: 'UI/MriDatePicker',
  component: MriDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DatePickerWithState = (args: React.ComponentProps<typeof MriDatePicker>) => {
  const [date, setDate] = useState<Date | undefined>(args.value || undefined);
  return <MriDatePicker {...args} value={date} onChange={setDate} />;
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
  render: (args) => <DatePickerWithState {...args} />,
};
