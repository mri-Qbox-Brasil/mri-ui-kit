import type { Meta, StoryObj } from "@storybook/react"
import { MriCircleRing } from "./MriCircleRing"
import type { MriSvgIcon } from "./shape-types"

// Glyph de exemplo (coracao, formato FontAwesome free-solid) ja reduzido ao
// contrato MriSvgIcon — demonstra que a shape nao depende de FontAwesome.
const heartIcon: MriSvgIcon = {
  viewBox: [512, 512],
  paths:
    "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z",
}

const meta = {
  title: "HUD/Shapes/MriCircleRing",
  component: MriCircleRing,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    progressValue: { control: { type: "range", min: 0, max: 100, step: 1 } },
    ringSize: { control: { type: "range", min: 1, max: 12, step: 0.5 } },
    progressColor: { control: "color" },
    outlineColor: { control: "color" },
    innerColor: { control: "color" },
  },
} satisfies Meta<typeof MriCircleRing>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    height: 80,
    width: 80,
    progressValue: 72,
    progressColor: "#00E699",
    outlineColor: "#00E69933",
  },
}

export const WithIcon: Story = {
  args: {
    height: 80,
    width: 80,
    progressValue: 60,
    progressColor: "#00E699",
    outlineColor: "#00E69933",
    icon: heartIcon,
    iconColor: "#ffffff",
    progressDropShadowAmount: 4,
  },
}

export const ThemedViaCurrentColor: Story = {
  render: (args) => (
    <div style={{ color: "hsl(160 100% 45%)" }}>
      <MriCircleRing {...args} />
    </div>
  ),
  args: { height: 80, width: 80, progressValue: 45, displayOutline: false },
}
