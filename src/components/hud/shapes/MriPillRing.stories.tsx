import type { Meta, StoryObj } from "@storybook/react"
import { MriPillRing } from "./MriPillRing"

const meta = {
  title: "HUD/Shapes/MriPillRing",
  component: MriPillRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriPillRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 32, progressValue: 65, progressColor: "#00E699" },
}
