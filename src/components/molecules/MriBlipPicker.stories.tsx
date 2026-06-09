import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriBlipPicker } from './MriBlipPicker'
import { type BlipManifestEntry, DEFAULT_BLIP_COLORS } from './MriBlipPicker.constants'

const meta: Meta<typeof MriBlipPicker> = {
  title: 'Molecules/MriBlipPicker',
  component: MriBlipPicker,
  tags: ['autodocs'],
  argTypes: {
    sprite: { control: { type: 'number', min: 0, max: 830 } },
    color:  { control: { type: 'number', min: 0, max: 85  } },
    scale:  { control: { type: 'number', min: 0.5, max: 3, step: 0.05 } },
    showScale:  { control: 'boolean' },
    showEnable: { control: 'boolean' },
    assetsBaseUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Manifest de exemplo para o Storybook (sem depender da CDN real)
const SAMPLE_MANIFEST: BlipManifestEntry[] = [
  { id:   1, name: 'higher_radar' },
  { id:  60, name: 'pointofinterest' },
  { id: 162, name: 'standardlift' },
  { id: 225, name: 'shopgunclub' },
  { id: 227, name: 'shopvehicle' },
  { id: 280, name: 'jewelryheist' },
  { id: 318, name: 'shopelclothes' },
  { id: 357, name: 'mp_arrow' },
  { id: 408, name: 'office' },
  { id: 488, name: 'showering' },
  { id: 526, name: 'castle' },
  { id: 568, name: 'bag' },
  { id: 615, name: 'electricshock' },
  { id: 778, name: 'parachute' },
  { id: 815, name: 'lapsplitterneutral' },
]

const Wrapper = (args: Record<string, unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = args as any
  const [state, setState] = useState({
    sprite:  (props.sprite as number)  ?? 227,
    color:   (props.color  as number)  ?? 0,
    scale:   (props.scale  as number)  ?? 1,
    enabled: (props.enabled as boolean) ?? true,
  })
  return (
    <div className="dark bg-background text-foreground p-4 max-w-3xl">
      <MriBlipPicker
        {...props}
        sprite={state.sprite}
        color={state.color}
        scale={state.scale}
        enabled={state.enabled}
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

/**
 * Default usa um manifest mockado para o Storybook não depender da CDN.
 * No uso real, omita `manifest` e o componente busca de `{assetsBaseUrl}manifest.json`.
 */
export const Default: Story = {
  args: {
    sprite: 227,
    color: 5,
    scale: 0.8,
    showScale: true,
    showEnable: false,
    manifest: SAMPLE_MANIFEST,
  },
  render: (args) => <Wrapper {...args} />,
}

export const WithEnableToggle: Story = {
  args: {
    sprite: 60,
    color: 2,
    scale: 1,
    showScale: true,
    showEnable: true,
    enabled: true,
    manifest: SAMPLE_MANIFEST,
  },
  render: (args) => <Wrapper {...args} />,
}

export const WithoutScale: Story = {
  args: {
    sprite: 408,
    color: 28,
    scale: 1,
    showScale: false,
    showEnable: false,
    manifest: SAMPLE_MANIFEST,
  },
  render: (args) => <Wrapper {...args} />,
}

/**
 * Sem prop `manifest` — o componente faz fetch de `{assetsBaseUrl}manifest.json`.
 * No Storybook (sem CDN), exibirá mensagem de erro e permitirá editar ID manualmente.
 */
export const FetchFromCDN: Story = {
  args: {
    sprite: 1,
    color: 0,
    scale: 0.9,
    assetsBaseUrl: 'https://assets.mriqbox.com.br/blips/',
  },
  render: (args) => <Wrapper {...args} />,
}

export const CustomPalette: Story = {
  args: {
    sprite: 280,
    color: 3,
    scale: 1,
    manifest: SAMPLE_MANIFEST,
    // Paleta reduzida (só as 16 primeiras cores)
    colors: DEFAULT_BLIP_COLORS.slice(0, 16),
  },
  render: (args) => <Wrapper {...args} />,
}
