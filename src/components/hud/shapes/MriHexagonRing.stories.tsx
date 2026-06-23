import type { Meta, StoryObj } from "@storybook/react"
import { MriHexagonRing } from "./MriHexagonRing"

const meta = {
  title: "HUD/Shapes/MriHexagonRing",
  component: MriHexagonRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriHexagonRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 80, width: 80, progressValue: 65, progressColor: "#00E699" },
}
