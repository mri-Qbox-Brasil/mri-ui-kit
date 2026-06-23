import type { Meta, StoryObj } from "@storybook/react"
import { MriDiamondRing } from "./MriDiamondRing"

const meta = {
  title: "HUD/Shapes/MriDiamondRing",
  component: MriDiamondRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriDiamondRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
