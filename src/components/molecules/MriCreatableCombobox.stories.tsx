import type { Meta, StoryObj } from '@storybook/react'
import { MriCreatableCombobox, type MriCreatableComboboxOption } from './MriCreatableCombobox'
import { useState } from 'react'

const meta: Meta<typeof MriCreatableCombobox> = {
  title: 'Molecules/MriCreatableCombobox',
  component: MriCreatableCombobox,
  tags: ['autodocs'],
  argTypes: {
    allowCreate: { control: 'boolean' },
    placeholder: { control: 'text' },
    searchPlaceholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

const CreatableWrapper = (args: Record<string, unknown>) => {
  const [value, setValue] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = args as any
  const options = (props.options as MriCreatableComboboxOption[] || [])

  return (
    <div className="w-[300px]">
      <MriCreatableCombobox
        {...props}
        options={options}
        value={value}
        onChange={(newVal) => {
          setValue(newVal)
          props.onChange?.(newVal)

          // Allow story behavior of actual creation
          if (!options.some((o: { value: string }) => o.value === newVal)) {
             // We can't easily update the options in the wrapper if we don't own them
             // so we just do nothing here or handle local state
          }
        }}
      />
      <div className="mt-4 text-sm text-muted-foreground p-2">
         Current Value: {value || 'None'}
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select a fruit...',
    searchPlaceholder: 'Type a fruit name...',
    allowCreate: true,
  },
  render: (args) => <CreatableWrapper {...args} />,
}

export const NoCreation: Story = {
  args: {
    ...Default.args,
    allowCreate: false,
    placeholder: 'Pick a fruit (no custom)',
  },
  render: (args) => <CreatableWrapper {...args} />,
}
