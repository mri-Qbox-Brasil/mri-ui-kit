import type { Meta, StoryObj } from "@storybook/react"
import { MriIconPercentage } from "./MriIconPercentage"

const meta = {
  title: "HUD/Shapes/MriIconPercentage",
  component: MriIconPercentage,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriIconPercentage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 48, width: 48, progressValue: 65, progressColor: "#00E699" },
}
