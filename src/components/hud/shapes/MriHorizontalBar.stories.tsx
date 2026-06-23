import type { Meta, StoryObj } from "@storybook/react"
import { MriHorizontalBar } from "./MriHorizontalBar"

const meta = {
  title: "HUD/Shapes/MriHorizontalBar",
  component: MriHorizontalBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriHorizontalBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 28, width: 120, progressValue: 65, progressColor: "#00E699" },
}
