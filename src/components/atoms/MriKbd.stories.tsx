import type { Meta, StoryObj } from '@storybook/react'
import { MriKbd } from './MriKbd'

const meta = {
  title: 'Atoms/MriKbd',
  component: MriKbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'danger'],
    },
  },
} satisfies Meta<typeof MriKbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'E' },
}

export const Accent: Story = {
  args: { variant: 'accent', children: 'ENTER' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'BACK' },
}

export const Row: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-white">
      <MriKbd>W</MriKbd>
      <MriKbd>A</MriKbd>
      <MriKbd>S</MriKbd>
      <MriKbd>D</MriKbd>
    </div>
  ),
}
