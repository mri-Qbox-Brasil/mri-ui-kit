import type { Meta, StoryObj } from "@storybook/react"
import { MriClinometer } from "./MriClinometer"

const meta = {
  title: "HUD/Instruments/MriClinometer",
  component: MriClinometer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriClinometer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 160, roll: 12 },
}
