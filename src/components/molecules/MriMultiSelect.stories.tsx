
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { MriMultiSelect, type MriMultiSelectProps } from "./MriMultiSelect"

const meta: Meta<typeof MriMultiSelect> = {
  title: "Molecules/MriMultiSelect",
  component: MriMultiSelect,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
}

export default meta
type Story = StoryObj<typeof MriMultiSelect>

const OPTIONS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
  { label: "Next.js", value: "nextjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

interface MriMultiSelectStatefulProps extends Omit<MriMultiSelectProps, "value" | "onChange"> {
  defaultValue?: (string | number)[]
}

const MriMultiSelectStateful = ({ defaultValue = [], ...args }: MriMultiSelectStatefulProps) => {
  const [value, setValue] = useState<(string | number)[]>(defaultValue)
  return <MriMultiSelect {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <MriMultiSelectStateful {...args} />
    </div>
  ),
  args: {
    options: OPTIONS,
    placeholder: "Select technologies...",
  },
}

export const ManySelected: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <MriMultiSelectStateful {...args} defaultValue={["react", "vue", "nextjs", "astro", "svelte"]} />
    </div>
  ),
  args: {
    options: OPTIONS,
    maxVisibleValues: 3,
  },
}

export const Error: Story = {
  args: {
    options: OPTIONS,
    value: [],
    error: "Please select at least one technology",
  },
}

export const Loading: Story = {
  args: {
    options: OPTIONS,
    value: [],
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    options: OPTIONS,
    value: ["react"],
    disabled: true,
  },
}
