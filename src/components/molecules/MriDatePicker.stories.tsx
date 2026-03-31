import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { MriDatePicker } from './MriDatePicker';

const meta: Meta<typeof MriDatePicker> = {
  title: 'Molecules/MriDatePicker',
  component: MriDatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const DatePickerWithState = (args: any) => {
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

export const ErrorState: Story = {
  args: {
    error: "Field is required",
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const WithRangeLimit: Story = {
  args: {
    fromDate: new Date(2024, 0, 1),
    toDate: new Date(2024, 11, 31),
    placeholder: "Range: 2024 only",
  },
  render: (args) => <DatePickerWithState {...args} />,
};
