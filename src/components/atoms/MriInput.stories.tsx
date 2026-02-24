import type { Meta, StoryObj } from '@storybook/react'
import { MriInput } from './MriInput'

const meta = {
  title: 'Atoms/MriInput',
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

import { Mail, ShieldCheck } from 'lucide-react'

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input...',
  },
}

export const WithIcons: Story = {
  args: {
    placeholder: 'Email',
    leftIcon: <Mail />,
    rightIcon: <ShieldCheck className="text-primary" />,
  },
}

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    error: 'This field is required and must be valid.',
    value: 'Wrong value',
  },
}
