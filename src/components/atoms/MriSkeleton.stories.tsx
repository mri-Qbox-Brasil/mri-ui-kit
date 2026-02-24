import type { Meta, StoryObj } from '@storybook/react'
import { MriSkeleton } from './MriSkeleton'

const meta = {
  title: 'Atoms/MriSkeleton',
  component: MriSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MriSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "w-[100px] h-[20px]",
  },
}

export const Circle: Story = {
  args: {
    className: "w-12 h-12 rounded-full",
  },
}

export const CardDemo: Story = {
  render: () => (
    <div className="flex items-center space-x-4 p-4 border rounded-xl w-[300px]">
      <MriSkeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <MriSkeleton className="h-4 w-[200px]" />
        <MriSkeleton className="h-4 w-[150px]" />
      </div>
    </div>
  ),
}
