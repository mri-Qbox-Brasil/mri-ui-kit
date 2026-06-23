import type { Meta, StoryObj } from "@storybook/react"
import { MriSplitCircle } from "./MriSplitCircle"

const meta = {
  title: "HUD/Shapes/MriSplitCircle",
  component: MriSplitCircle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriSplitCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
