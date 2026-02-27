import type { Meta, StoryObj } from '@storybook/react'
import { MriCreatableCombobox } from './MriCreatableCombobox'
import { useState } from 'react'

const meta: Meta<typeof MriCreatableCombobox> = {
  title: 'Molecules/CreatableCombobox',
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

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select a fruit...',
    searchPlaceholder: 'Type a fruit name...',
    allowCreate: true,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState(args.options)

    return (
      <div className="w-[300px]">
        <MriCreatableCombobox
          {...args}
          options={options}
          value={value}
          onChange={(newVal) => {
            setValue(newVal)
            args.onChange?.(newVal)

            // Allow story behavior of actual creation
            if (!options.some(o => o.value === newVal)) {
               setOptions([...options, { label: newVal, value: newVal }])
            }
          }}
        />
        <div className="mt-4 text-sm text-muted-foreground p-2">
           Current Value: {value || 'None'}
        </div>
      </div>
    )
  },
}

export const NoCreation: Story = {
  args: {
    ...Default.args,
    allowCreate: false,
    placeholder: 'Pick a fruit (no custom)',
  },
  render: Default.render
}
