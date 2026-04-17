import { useState } from "react"
import type { Meta } from "@storybook/react"
import { MriSelect } from "./MriSelect"

const meta: Meta<typeof MriSelect> = {
  title: "Molecules/MriSelect",
  component: MriSelect,
  tags: ["autodocs"],
}

export default meta

const COLOR_OPTIONS = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow with a very long name just to test truncation behavior", value: "yellow" },
  { label: "Purple", value: "purple" },
]

const TECH_OPTIONS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
  { label: "Next.js", value: "nextjs" },
  { label: "Remix", value: "remix" },
  { label: "Astro", value: "astro" },
]

const SingleDemo = () => {
  const [value, setValue] = useState("red")
  return (
    <div className="w-[300px] space-y-2">
      <MriSelect options={COLOR_OPTIONS} value={value} onChange={setValue} placeholder="Pick a color" searchPlaceholder="Search colors..." />
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  )
}

const SingleClearableDemo = () => {
  const [value, setValue] = useState("")
  return (
    <div className="w-[300px] space-y-2">
      <MriSelect options={COLOR_OPTIONS} value={value} onChange={setValue} placeholder="Select (click again to clear)" clearable />
      <p className="text-sm text-muted-foreground">Selected: {value || "—"}</p>
    </div>
  )
}

const SingleCreatableDemo = () => {
  const [options, setOptions] = useState(COLOR_OPTIONS)
  const [value, setValue] = useState("")
  return (
    <div className="w-[300px] space-y-2">
      <MriSelect
        options={options}
        value={value}
        onChange={(v) => {
          setValue(v)
          if (!options.find((o) => o.value === v)) {
            setOptions((prev) => [...prev, { label: v, value: v }])
          }
        }}
        placeholder="Select or create a color"
        creatable
        createLabelPrefix="Create"
      />
      <p className="text-sm text-muted-foreground">Selected: {value || "—"}</p>
    </div>
  )
}

const SingleSmallDemo = () => {
  const [value, setValue] = useState("red")
  return (
    <div className="w-[200px]">
      <MriSelect options={COLOR_OPTIONS} value={value} onChange={setValue} size="sm" placeholder="Pick a color" />
    </div>
  )
}

const MultipleDemo = () => {
  const [value, setValue] = useState<(string | number)[]>([])
  return (
    <div className="w-[300px] space-y-2">
      <MriSelect multiple options={TECH_OPTIONS} value={value} onChange={setValue} placeholder="Select technologies..." />
      <p className="text-sm text-muted-foreground">Selected: {value.join(", ") || "—"}</p>
    </div>
  )
}

const MultipleWithManyDemo = () => {
  const [value, setValue] = useState<(string | number)[]>(["react", "vue", "nextjs", "astro", "svelte"])
  return (
    <div className="w-[400px]">
      <MriSelect multiple options={TECH_OPTIONS} value={value} onChange={setValue} maxVisibleValues={3} />
    </div>
  )
}

export const Single = { render: () => <SingleDemo /> }
export const SingleClearable = { render: () => <SingleClearableDemo /> }
export const SingleCreatable = { render: () => <SingleCreatableDemo /> }
export const SingleSmall = { render: () => <SingleSmallDemo /> }
export const SingleLoading = {
  render: () => (
    <div className="w-[300px]">
      <MriSelect options={[]} value="" onChange={() => {}} isLoading placeholder="Fetching data..." />
    </div>
  ),
}
export const SingleError = {
  render: () => (
    <div className="w-[300px]">
      <MriSelect options={COLOR_OPTIONS} value="red" onChange={() => {}} error="You must select a valid color from the list." />
    </div>
  ),
}
export const Multiple = { render: () => <MultipleDemo /> }
export const MultipleWithMany = { render: () => <MultipleWithManyDemo /> }
export const MultipleDisabled = {
  render: () => (
    <div className="w-[300px]">
      <MriSelect multiple options={TECH_OPTIONS} value={["react"]} onChange={() => {}} disabled />
    </div>
  ),
}
export const MultipleError = {
  render: () => (
    <div className="w-[300px]">
      <MriSelect multiple options={TECH_OPTIONS} value={[]} onChange={() => {}} error="Please select at least one technology" />
    </div>
  ),
}
