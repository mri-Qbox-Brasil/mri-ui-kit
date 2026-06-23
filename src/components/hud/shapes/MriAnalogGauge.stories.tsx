import type { Meta, StoryObj } from "@storybook/react"
import { MriAnalogGauge } from "./MriAnalogGauge"

const meta = {
  title: "HUD/Instruments/MriAnalogGauge",
  component: MriAnalogGauge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MriAnalogGauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 160,
    value: 80,
    minValue: 0,
    maxValue: 200,
    arcLength: 75,
    rotation: 225,
    majorTickInterval: 20,
    minorTickCount: 4,
    ringSize: 6,
    color: "#00E699",
    outlineColor: "#ffffff",
    outlineOpacity: 0.2,
    needleStyle: "needle",
    showValue: true,
    unit: "km/h",
  },
}
