import type { Meta, StoryObj } from '@storybook/react'
import { MriMouse } from './MriMouse'

const meta = {
  title: 'Atoms/MriMouse',
  component: MriMouse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    button: {
      control: 'select',
      options: ['left', 'right', 'middle', 'scroll', 'scroll-up', 'scroll-down'],
    },
  },
} satisfies Meta<typeof MriMouse>

export default meta
type Story = StoryObj<typeof meta>

export const Left: Story = {
  args: { button: 'left' },
}

export const Right: Story = {
  args: { button: 'right' },
}

export const Scroll: Story = {
  args: { button: 'scroll' },
}

export const All: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-white text-2xl">
      <MriMouse button="left" />
      <MriMouse button="right" />
      <MriMouse button="middle" />
      <MriMouse button="scroll" />
      <MriMouse button="scroll-up" />
      <MriMouse button="scroll-down" />
    </div>
  ),
}
