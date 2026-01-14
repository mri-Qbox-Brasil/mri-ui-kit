import type { Meta, StoryObj } from '@storybook/react';
import { SelectSearch } from './SelectSearch';
import { useState } from 'react';

const meta: Meta<typeof SelectSearch> = {
  title: 'UI/SelectSearch',
  component: SelectSearch,
  tags: ['autodocs'],
};

export default meta;

const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow with a very long name just to test truncation behavior', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
];

const SelectSearchDemo = () => {
    const [value, setValue] = useState('red');
    return (
        <div className="w-[300px]">
            <SelectSearch
                options={options}
                value={value}
                onChange={setValue}
                placeholder="Pick a color"
                searchPlaceholder="Search colors..."
            />
            <div className="mt-4 text-sm text-gray-500">
                Selected: {value}
            </div>
        </div>
    )
};

export const Default: StoryObj<typeof SelectSearch> = {
  render: () => <SelectSearchDemo />
};
