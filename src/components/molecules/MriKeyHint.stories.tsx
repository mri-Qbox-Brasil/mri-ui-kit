import type { Meta, StoryObj } from '@storybook/react'
import { MriKeyHint } from './MriKeyHint'
import { MriKbd } from '../atoms/MriKbd'
import { MriMouse } from '../atoms/MriMouse'

const meta = {
  title: 'Molecules/MriKeyHint',
  component: MriKeyHint,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MriKeyHint>

export default meta
type Story = StoryObj<typeof meta>

export const Key: Story = {
  args: {
    keys: <MriKbd variant="accent">E</MriKbd>,
    label: 'selecionar',
  },
}

export const Combo: Story = {
  args: {
    keys: (
      <>
        <MriKbd>W</MriKbd>
        <MriKbd>A</MriKbd>
        <MriKbd>S</MriKbd>
        <MriKbd>D</MriKbd>
      </>
    ),
    label: 'voar',
  },
}

export const Mouse: Story = {
  args: {
    keys: <MriMouse button="right" />,
    label: 'girar câmera',
  },
}

export const Danger: Story = {
  args: {
    keys: <MriKbd variant="danger">BACK</MriKbd>,
    label: 'cancelar',
    danger: true,
  },
}
