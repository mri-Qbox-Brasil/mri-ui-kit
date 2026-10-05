import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useRef, type CSSProperties } from 'react'
import { startGameGlass } from './gameGlass'

// Stands in for the GTA frame: busy enough to show blur, refraction and color split.
function paintScene(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const g = canvas.getContext('2d')
  if (!g) return
  const grad = g.createLinearGradient(0, 0, canvas.width, canvas.height)
  grad.addColorStop(0, '#1d2b64')
  grad.addColorStop(0.5, '#c0392b')
  grad.addColorStop(1, '#f8f4e3')
  g.fillStyle = grad
  g.fillRect(0, 0, canvas.width, canvas.height)
  for (let x = 0; x < canvas.width; x += 48) {
    g.fillStyle = x % 96 ? '#ffffff' : '#000000'
    g.fillRect(x, 0, 5, canvas.height)
  }
  g.font = 'bold 72px system-ui'
  g.fillStyle = '#ffeb3b'
  g.fillText('LOS SANTOS', 90, 210)
}

const glass: CSSProperties = {
  position: 'absolute',
  boxSizing: 'border-box',
  padding: '18px 22px',
  color: '#fff',
  font: '500 15px system-ui',
  background: 'rgba(255, 255, 255, 0.06)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 12px 32px rgba(0, 0, 0, 0.25)',
}

function Demo() {
  const scene = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!scene.current) return
    paintScene(scene.current)
    const handle = startGameGlass({ fallbackImage: scene.current, temporal: 1 })
    return () => handle.stop()
  }, [])
  return (
    <>
      <style>{'html, body, #storybook-root { background: transparent !important; } [data-glass-backdrop="bright"] { color: #111 !important; }'}</style>
      <canvas ref={scene} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
        <div data-glass style={{ ...glass, left: 60, top: 60, width: 340, height: 200, borderRadius: 24 }}>Fosco</div>
        <div data-glass="liquid" style={{ ...glass, left: 440, top: 60, width: 340, height: 200, borderRadius: 32 }}>Liquid</div>
        <div data-glass="liquid" style={{ ...glass, left: 820, top: 50, width: 220, height: 220, borderRadius: '50%' }}>Orb</div>
        <div data-glass="liquid" style={{ ...glass, left: 60, top: 300, width: 300, height: 64, borderRadius: 999 }}>Pílula</div>
        <div data-glass="liquid" data-glass-dispersion="1" data-glass-specular="0.9" style={{ ...glass, left: 440, top: 300, width: 340, height: 140, borderRadius: 28 }}>Dispersão 1, brilho 0.9</div>
        <div data-glass style={{ ...glass, left: 60, top: 400, width: 300, height: 90, borderRadius: 16, opacity: 0.5 }}>Opacidade 0.5</div>
      </div>
    </>
  )
}

const meta = {
  title: 'Lib/GameGlass',
  component: Demo,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Showcase: Story = {}
