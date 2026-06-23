import type { Meta, StoryObj } from "@storybook/react"
import { MriSquareFill } from "./MriSquareFill"

const meta = {
  title: "HUD/Shapes/MriSquareFill",
  component: MriSquareFill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriSquareFill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
