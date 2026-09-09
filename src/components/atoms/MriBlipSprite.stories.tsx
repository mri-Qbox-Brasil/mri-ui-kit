import type { Meta, StoryObj } from '@storybook/react'
import { MriBlipSprite } from './MriBlipSprite'
import { DEFAULT_BLIP_COLORS } from '@/components/molecules/MriBlipPicker.constants'

const meta: Meta<typeof MriBlipSprite> = {
    title: 'Atoms/MriBlipSprite',
    component: MriBlipSprite,
    tags: ['autodocs'],
}

export default meta

// Path real no CDN — se a CDN tiver o asset, mostra o sprite; senao cai no
// placeholder "?" do proprio componente (mesma abordagem do MriBlipPicker).
const CDN = 'https://assets.mriqbox.com.br/'
const SPRITE = `${CDN}blips/001_radar_level.png`

export const Default: StoryObj<typeof MriBlipSprite> = {
    render: () => <MriBlipSprite src={SPRITE} className="w-10 h-10" />,
}

// Com `tint`, o sprite e tingido via CSS mask — o mesmo efeito do color ID no jogo.
export const Tinted: StoryObj<typeof MriBlipSprite> = {
    render: () => (
        <div className="flex flex-wrap gap-3">
            {DEFAULT_BLIP_COLORS.slice(0, 12).map(c => (
                <div key={c.id} className="flex flex-col items-center gap-1">
                    <MriBlipSprite src={SPRITE} tint={c.hex} className="w-9 h-9" />
                    <span className="text-[9px] font-mono text-muted-foreground">{c.id}</span>
                </div>
            ))}
        </div>
    ),
}

export const Sizes: StoryObj<typeof MriBlipSprite> = {
    render: () => (
        <div className="flex items-end gap-4">
            {['w-5 h-5', 'w-8 h-8', 'w-12 h-12', 'w-20 h-20'].map(size => (
                <MriBlipSprite key={size} src={SPRITE} tint="#ef4444" className={size} />
            ))}
        </div>
    ),
}

// URL inexistente: vira placeholder "?" com o motivo no title, nunca imagem quebrada.
export const BrokenSource: StoryObj<typeof MriBlipSprite> = {
    render: () => (
        <div className="flex gap-3">
            <MriBlipSprite src={`${CDN}blips/000_nao_existe.png`} className="w-10 h-10" />
            <MriBlipSprite src={`${CDN}blips/000_nao_existe.png`} tint="#ef4444" className="w-10 h-10" />
        </div>
    ),
}
