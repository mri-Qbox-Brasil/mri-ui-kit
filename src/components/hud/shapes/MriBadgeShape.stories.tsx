import type { Meta, StoryObj } from "@storybook/react"
import { MriBadgeShape } from "./MriBadgeShape"

const meta = {
  title: "HUD/Shapes/MriBadgeShape",
  component: MriBadgeShape,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriBadgeShape>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { height: 16, width: 80, progressValue: 65, progressColor: "#00E699" },
}
