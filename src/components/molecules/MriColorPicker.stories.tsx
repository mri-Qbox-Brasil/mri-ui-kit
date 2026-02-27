import type { Meta, StoryObj } from '@storybook/react'
import { MriColorPicker } from './MriColorPicker'
import { useState } from 'react'

const meta: Meta<typeof MriColorPicker> = {
  title: 'Molecules/MriColorPicker',
  component: MriColorPicker,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    active: { control: 'boolean' },
    format: {
      control: 'select',
      options: ['hex', 'hsl-string'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const ColorPickerWrapper = (args: Record<string, unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = args as any
  const [color, setColor] = useState((props.color as string) || '')
  return (
    <div className="p-4 flex gap-4 items-center">
      <MriColorPicker
        {...props}
        color={color}
        onChange={(newColor) => {
          setColor(newColor)
          props.onChange?.(newColor)
        }}
      />
      <div className="font-mono text-sm">Selected: {color}</div>
    </div>
  )
}

export const Default: Story = {
  args: {
    color: '#ff0000',
    active: true,
    format: 'hex',
  },
  render: (args) => <ColorPickerWrapper {...args} />,
}

export const Inactive: Story = {
  args: {
    color: '#00ff00',
    active: false,
    format: 'hsl-string',
  },
}
