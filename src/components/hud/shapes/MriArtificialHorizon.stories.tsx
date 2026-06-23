import type { Meta, StoryObj } from "@storybook/react"
import { MriArtificialHorizon } from "./MriArtificialHorizon"

const meta = {
  title: "HUD/Instruments/MriArtificialHorizon",
  component: MriArtificialHorizon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriArtificialHorizon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 160, pitch: 10, roll: 15 },
}
