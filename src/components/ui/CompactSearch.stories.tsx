import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
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

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <CompactSearch {...args} options={options} value={value} onChange={setValue} />;
  },
};

export const Preselected: Story = {
  render: (args) => {
    const [value, setValue] = useState("sveltekit");
    return <CompactSearch {...args} options={options} value={value} onChange={setValue} />;
  },
};
