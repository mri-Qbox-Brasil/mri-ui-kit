import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CompactSearch } from './CompactSearch';

const meta: Meta<typeof CompactSearch> = {
  title: 'UI/CompactSearch',
  component: CompactSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const CompactSearchWithState = (args: React.ComponentProps<typeof CompactSearch>) => {
  const [value, setValue] = useState(args.value || "");
  return <CompactSearch {...args} options={options} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <CompactSearchWithState {...args} />,
};

export const Preselected: Story = {
  args: {
    value: "sveltekit",
  },
  render: (args) => <CompactSearchWithState {...args} />,
};
