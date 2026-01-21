import type { Meta, StoryObj } from '@storybook/react';
import { MriSearchInput } from './MriSearchInput';
import { useState } from 'react';

const meta: Meta<typeof MriSearchInput> = {
  title: 'Molecules/MriSearchInput',
  component: MriSearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MriSearchInput>;

const SearchInputWrapper = (args: React.ComponentProps<typeof MriSearchInput>) => {
    const [val, setVal] = useState(args.value || '');
    return <MriSearchInput {...args} value={val} onChange={setVal} />
}

export const Default: Story = {
  args: {
    placeholder: 'Search players...',
    value: '',
  },
  render: (args) => <SearchInputWrapper {...args} />
};

export const CustomWidth: Story = {
    args: {
        placeholder: 'Full width search...',
        value: '',
        width: 'w-full'
    },
    render: (args) => <div className="w-[500px] border p-4"><SearchInputWrapper {...args} /></div>
}
