import type { Meta, StoryObj } from "@storybook/react"
import { MriTriangleRing } from "./MriTriangleRing"

const meta = {
  title: "HUD/Shapes/MriTriangleRing",
  component: MriTriangleRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriTriangleRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
