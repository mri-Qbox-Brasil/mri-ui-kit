import type { Meta, StoryObj } from "@storybook/react"
import { MriInnerCircle } from "./MriInnerCircle"

const meta = {
  title: "HUD/Shapes/MriInnerCircle",
  component: MriInnerCircle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriInnerCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
