import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriGameMap, MriMapFit, MriMapFocus, MriMapMarker, MriMapPolygon, MriMapPolyline, type MriMapPoint } from './MriGameMap'
import { MriMapEditorLayout } from '../templates/MriMapEditorLayout'

const meta: Meta<typeof MriGameMap> = {
  title: 'Organisms/MriGameMap',
  component: MriGameMap,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof meta>

const square = (x: number, y: number, r: number): MriMapPoint[] => [
  { x: x - r, y: y - r },
  { x: x + r, y: y - r },
  { x: x + r, y: y + r },
  { x: x - r, y: y + r },
]

const PLACES = [
  { id: 'legion', label: 'Legion Square', points: square(215, -810, 35), tone: 'primary' as const },
  { id: 'pillbox', label: 'Pillbox', points: square(300, -580, 25), tone: 'primary' as const },
  { id: 'mission', label: 'Mission Row (pátio)', points: square(410, -1020, 30), tone: 'warning' as const },
  { id: 'nopark', label: 'Proibido estacionar', points: square(150, -1040, 40), tone: 'destructive' as const },
]

const FLOORS: MriMapPoint[] = [
  { x: -1580, y: -560, z: 30 },
  { x: -1560, y: -580, z: 108 },
  { x: -1370, y: -500, z: 33 },
]

export const Shapes: Story = {
  render: () => (
    <div className="h-screen w-screen bg-background">
      <MriGameMap>
        <MriMapFit points={PLACES.flatMap((p) => p.points)} maxZoom={4} />
        {PLACES.map((p) => (
          <MriMapPolygon key={p.id} points={p.points} tone={p.tone} tooltip={p.label} />
        ))}
      </MriGameMap>
    </div>
  ),
}

function PinsDemo() {
    const [pin, setPin] = useState<MriMapPoint>({ x: -1000, y: -300, z: 40 })
    return (
      <div className="h-screen w-screen bg-background">
        <MriGameMap onMapClick={(p) => setPin({ ...p, z: pin.z })}>
          <MriMapFit points={[...FLOORS, pin]} />
          <MriMapPolyline points={FLOORS} />
          <MriMapMarker position={FLOORS[0]} count={2} tooltip="Térreo e cobertura" />
          <MriMapMarker position={FLOORS[2]} tooltip="Garagem" />
          <MriMapMarker position={pin} active permanent tooltip={`${pin.x.toFixed(0)}, ${pin.y.toFixed(0)}`} onDragEnd={setPin} />
        </MriGameMap>
      </div>
    )
}

export const Pins: Story = { render: () => <PinsDemo /> }

function EditorLayoutDemo() {
    const [selected, setSelected] = useState<string | null>(null)
    const current = PLACES.find((p) => p.id === selected)
    return (
      <div className="flex h-screen w-screen flex-col bg-background text-foreground">
        <MriMapEditorLayout
          list={
            <ul className="flex flex-col gap-1 p-2">
              {PLACES.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => setSelected(p.id)} className={`w-full rounded-md px-3 py-2 text-left text-sm ${p.id === selected ? 'bg-primary/15' : 'hover:bg-secondary'}`}>
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          }
          map={
            <MriGameMap>
              <MriMapFit points={PLACES.flatMap((p) => p.points)} maxZoom={4} />
              <MriMapFocus points={current?.points ?? null} zoom={4} />
              {PLACES.map((p) => (
                <MriMapPolygon key={p.id} points={p.points} tone={p.tone} active={p.id === selected} tooltip={p.label} onClick={() => setSelected(p.id)} />
              ))}
            </MriGameMap>
          }
          detail={<div className="p-4 text-sm text-muted-foreground">{current ? current.label : 'Escolha um lugar na lista ou no mapa.'}</div>}
        />
      </div>
    )
}

export const EditorLayout: Story = { render: () => <EditorLayoutDemo /> }
