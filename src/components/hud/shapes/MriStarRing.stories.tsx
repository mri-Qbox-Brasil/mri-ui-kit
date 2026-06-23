import type { Meta, StoryObj } from "@storybook/react"
import { MriStarRing } from "./MriStarRing"

const meta = {
  title: "HUD/Shapes/MriStarRing",
  component: MriStarRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriStarRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
