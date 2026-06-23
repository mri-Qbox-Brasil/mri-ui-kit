import type { Meta, StoryObj } from "@storybook/react"
import { MriPartialCircleRing } from "./MriPartialCircleRing"

const meta = {
  title: "HUD/Shapes/MriPartialCircleRing",
  component: MriPartialCircleRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriPartialCircleRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    height: 80,
    progressValue: 65,
    progressColor: "#00E699",
    displayNumber: 65,
    text: "KM/H",
  },
}
