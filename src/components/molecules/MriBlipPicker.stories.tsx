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
    showUnavailable: { control: 'boolean' },
    compact:  { control: 'boolean' },
    cdnBase:  { control: 'text' },
    indexUrl: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Manifest de exemplo para o Storybook (sem depender da CDN real).
// `file` aponta para o path real no CDN — se a CDN tiver os assets, mostra
// thumbnail; senão, renderiza placeholder "?".
const SAMPLE_MANIFEST: BlipManifestEntry[] = [
  { id:   1, name: 'radar_level',       file: 'blips/001_radar_level.png',       available: true },
  { id:  60, name: 'radar_lift_arm',    file: 'blips/060_radar_lift_arm.png',    available: true },
  { id: 162, name: 'radar_lifeinvader', file: 'blips/162_radar_lifeinvader.png', available: true },
  { id: 225, name: 'radar_strangers_mysteries', file: 'blips/225_radar_strangers_mysteries.png', available: true },
  { id: 227, name: 'radar_property_general',    file: 'blips/227_radar_property_general.png',    available: true },
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
 * Sem prop `manifest` — o componente faz fetch de `indexUrl` (default oficial).
 * Lê o array `blips` do índice e popula a lista automaticamente.
 */
export const FetchFromCDN: Story = {
  args: {
    sprite: 1,
    color: 0,
    scale: 0.9,
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

/**
 * Modo compacto: renderiza trigger pequeno com preview do item selecionado;
 * clique abre a UI completa em popover flutuante.
 */
export const Compact: Story = {
  args: {
    sprite: 227,
    color: 5,
    scale: 0.8,
    compact: true,
    showScale: true,
    manifest: SAMPLE_MANIFEST,
  },
  render: (args) => <Wrapper {...args} />,
}

export const CompactWithEnable: Story = {
  args: {
    sprite: 60,
    color: 2,
    scale: 1,
    compact: true,
    showEnable: true,
    enabled: true,
    manifest: SAMPLE_MANIFEST,
  },
  render: (args) => <Wrapper {...args} />,
}
