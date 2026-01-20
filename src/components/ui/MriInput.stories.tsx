import type { Meta, StoryObj } from '@storybook/react'
import { MriInput } from './MriInput'

const meta = {
  title: 'UI/MriInput',
  component: MriInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof MriInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Some value',
    readOnly: true,
  },
}
