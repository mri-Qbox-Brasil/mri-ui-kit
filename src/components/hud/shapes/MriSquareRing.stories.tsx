import type { Meta, StoryObj } from "@storybook/react"
import { MriSquareRing } from "./MriSquareRing"

const meta = {
  title: "HUD/Shapes/MriSquareRing",
  component: MriSquareRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriSquareRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
