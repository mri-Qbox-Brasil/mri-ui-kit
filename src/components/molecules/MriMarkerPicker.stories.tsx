import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriMarkerPicker } from './MriMarkerPicker'
import { type MarkerColor, type MarkerScale } from './MriMarkerPicker.constants'

const meta: Meta<typeof MriMarkerPicker> = {
  title: 'Molecules/MriMarkerPicker',
  component: MriMarkerPicker,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'number', min: 0, max: 43 } },
    scaleMode: {
      control: 'select',
      options: ['uniform', 'xyz'],
    },
    compact:  { control: 'boolean' },
    cdnBase:  { control: 'text' },
    indexUrl: { control: 'text' },
    showUnavailable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const Wrapper = (args: Record<string, unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = args as any
  const [state, setState] = useState({
    type:  (props.type  as number)       ?? 1,
    color: (props.color as MarkerColor)  ?? { r: 255, g: 200, b: 0, a: 200 },
    scale: (props.scale as MarkerScale)  ?? { x: 1, y: 1, z: 1 },
  })
  return (
    <div className="dark bg-background text-foreground p-4 max-w-3xl">
      <MriMarkerPicker
        {...props}
        type={state.type}
        color={state.color}
        scale={state.scale}
        onChange={(val) => {
          setState(s => ({ ...s, ...val }))
          props.onChange?.(val)
        }}
      />
      <pre className="mt-4 text-xs text-muted-foreground font-mono">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}

export const Default: Story = {
  args: {
    type: 1,
    color: { r: 255, g: 200, b: 0, a: 200 },
    scale: { x: 1.5, y: 1.5, z: 1.5 },
    scaleMode: 'uniform',
  },
  render: (args) => <Wrapper {...args} />,
}

export const VerticalCylinderGreen: Story = {
  args: {
    type: 1,
    color: { r: 0, g: 255, b: 100, a: 180 },
    scale: { x: 2, y: 2, z: 2 },
    scaleMode: 'uniform',
  },
  render: (args) => <Wrapper {...args} />,
}

export const XYZScaleMode: Story = {
  args: {
    type: 23,
    color: { r: 100, g: 150, b: 255, a: 255 },
    scale: { x: 3, y: 3, z: 0.5 },
    scaleMode: 'xyz',
  },
  render: (args) => <Wrapper {...args} />,
}

export const DollarSign: Story = {
  args: {
    type: 29,
    color: { r: 255, g: 220, b: 0, a: 220 },
    scale: { x: 1.2, y: 1.2, z: 1.2 },
    scaleMode: 'uniform',
  },
  render: (args) => <Wrapper {...args} />,
}

export const NumberMarker: Story = {
  args: {
    type: 13,  // Number 3
    color: { r: 255, g: 100, b: 100, a: 230 },
    scale: { x: 1, y: 1, z: 1 },
    scaleMode: 'uniform',
  },
  render: (args) => <Wrapper {...args} />,
}

/**
 * Modo compacto com fetch automático do índice oficial — trigger mostra
 * o preview do marker selecionado tingido com a cor (mix-blend-mode multiply).
 */
export const Compact: Story = {
  args: {
    type: 1,
    color: { r: 255, g: 200, b: 0, a: 200 },
    scale: { x: 1.5, y: 1.5, z: 1.5 },
    scaleMode: 'uniform',
    compact: true,
  },
  render: (args) => <Wrapper {...args} />,
}
