import type { Meta, StoryObj } from '@storybook/react'
import { MriKeyboardVisualizer } from './MriKeyboardVisualizer'

const meta: Meta<typeof MriKeyboardVisualizer> = {
  title: 'Organisms/MriKeyboardVisualizer',
  component: MriKeyboardVisualizer,
  tags: ['autodocs'],
  argTypes: {
    pressedKeys: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pressedKeys: ['W', 'SHIFT', 'SPACE', 'LMB'],
  },
  render: (args) => (
    <div className="p-8 bg-black">
      <MriKeyboardVisualizer {...args} />
    </div>
  )
}
