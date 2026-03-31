import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MriCompactSearch } from './MriCompactSearch';

const meta: Meta<typeof MriCompactSearch> = {
  title: 'Molecules/MriCompactSearch',
  component: MriCompactSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'next.js', label: 'Next.js' },
      { value: 'sveltekit', label: 'SvelteKit' },
      { value: 'nuxt.js', label: 'Nuxt.js' },
      { value: 'remix', label: 'Remix' },
      { value: 'astro', label: 'Astro' },
    ],
    value: "",
    onChange: () => {},
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const CompactSearchWithState = (args: Partial<React.ComponentProps<typeof MriCompactSearch>>) => {
  const [value, setValue] = useState(args.value || "");
  const baseOptions = [
    { value: 'next.js', label: 'Next.js' },
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
  ];
  return <MriCompactSearch {...args} options={args.options || baseOptions} value={value} onChange={setValue} />;
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

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => <CompactSearchWithState {...args} />,
};

export const ErrorState: Story = {
  args: {
    error: "Location not found",
  },
  render: (args) => <CompactSearchWithState {...args} />,
};

export const Clearable: Story = {
  args: {
    clearable: true,
  },
  render: (args) => <CompactSearchWithState {...args} />,
};
