import type { Meta, StoryObj } from "@storybook/react"
import { MriCircleFill } from "./MriCircleFill"

const meta = {
  title: "HUD/Shapes/MriCircleFill",
  component: MriCircleFill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriCircleFill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
