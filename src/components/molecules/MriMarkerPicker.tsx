import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { MriInput } from "@/components/atoms/MriInput"

// ────────────────────────────────────────────────────────────
// Lista oficial de marker types (0-43) do GTA V / FiveM
// Fonte: docs.fivem.net/natives/?_0x28477EC23D892089 (DrawMarker)
// ────────────────────────────────────────────────────────────

export interface MarkerType {
  id: number
  name: string
  description?: string
}

export const DEFAULT_MARKER_TYPES: MarkerType[] = [
  { id: 0,  name: "Upside Down Cone",              description: "Cone apontando para baixo (mais comum)" },
  { id: 1,  name: "Vertical Cylinder",             description: "Cilindro vertical" },
  { id: 2,  name: "Thick Chevron Up",              description: "Chevron grosso apontando para cima" },
  { id: 3,  name: "Thin Chevron Up",               description: "Chevron fino apontando para cima" },
  { id: 4,  name: "Checkered Flag Rect",           description: "Bandeira quadriculada retangular" },
  { id: 5,  name: "Checkered Flag Circle",         description: "Bandeira quadriculada circular" },
  { id: 6,  name: "Verticle Circle",               description: "Círculo vertical (typo original)" },
  { id: 7,  name: "Plane Model",                   description: "Modelo 3D de avião" },
  { id: 8,  name: "Lost MC Dark",                  description: "Logo Lost MC versão escura" },
  { id: 9,  name: "Lost MC Light",                 description: "Logo Lost MC versão clara" },
  { id: 10, name: "Number 0",                      description: "Dígito 0" },
  { id: 11, name: "Number 1",                      description: "Dígito 1" },
  { id: 12, name: "Number 2",                      description: "Dígito 2" },
  { id: 13, name: "Number 3",                      description: "Dígito 3" },
  { id: 14, name: "Number 4",                      description: "Dígito 4" },
  { id: 15, name: "Number 5",                      description: "Dígito 5" },
  { id: 16, name: "Number 6",                      description: "Dígito 6" },
  { id: 17, name: "Number 7",                      description: "Dígito 7" },
  { id: 18, name: "Number 8",                      description: "Dígito 8" },
  { id: 19, name: "Number 9",                      description: "Dígito 9" },
  { id: 20, name: "Chevron Up x1",                 description: "1 chevron empilhado" },
  { id: 21, name: "Chevron Up x2",                 description: "2 chevrons empilhados" },
  { id: 22, name: "Chevron Up x3",                 description: "3 chevrons empilhados" },
  { id: 23, name: "Horizontal Circle Fat",         description: "Círculo horizontal grosso (anel no chão)" },
  { id: 24, name: "Replay Icon",                   description: "Ícone de replay" },
  { id: 25, name: "Horizontal Circle Skinny",      description: "Círculo horizontal fino" },
  { id: 26, name: "Horizontal Circle Skinny Arrow",description: "Círculo horizontal fino com seta" },
  { id: 27, name: "Horizontal Split Arrow Circle", description: "Círculo horizontal com seta dividida" },
  { id: 28, name: "Debug Sphere",                  description: "Esfera sólida de debug" },
  { id: 29, name: "Dollar Sign",                   description: "Cifrão" },
  { id: 30, name: "Horizontal Bars",               description: "Barras horizontais" },
  { id: 31, name: "Wolf Head",                     description: "Cabeça de lobo" },
  { id: 32, name: "Question Mark",                 description: "Ponto de interrogação" },
  { id: 33, name: "Plane Symbol",                  description: "Símbolo de avião" },
  { id: 34, name: "Helicopter Symbol",             description: "Símbolo de helicóptero" },
  { id: 35, name: "Boat Symbol",                   description: "Símbolo de barco" },
  { id: 36, name: "Car Symbol",                    description: "Símbolo de carro" },
  { id: 37, name: "Motorcycle Symbol",             description: "Símbolo de moto" },
  { id: 38, name: "Bike Symbol",                   description: "Símbolo de bicicleta" },
  { id: 39, name: "Truck Symbol",                  description: "Símbolo de caminhão" },
  { id: 40, name: "Parachute Symbol",              description: "Símbolo de paraquedas" },
  { id: 41, name: "Unknown (41)",                  description: "ID reservado / desconhecido" },
  { id: 42, name: "Sawblade Symbol",               description: "Símbolo de serra circular" },
  { id: 43, name: "Unknown (43)",                  description: "ID reservado / desconhecido" },
]

// ────────────────────────────────────────────────────────────
// Props
// ────────────────────────────────────────────────────────────

export interface MarkerColor {
  r: number  // 0-255
  g: number  // 0-255
  b: number  // 0-255
  a: number  // 0-255
}

export interface MarkerScale {
  x: number
  y: number
  z: number
}

export interface MriMarkerPickerProps {
  type: number
  color: MarkerColor
  scale: MarkerScale
  onChange: (val: { type: number; color: MarkerColor; scale: MarkerScale }) => void
  /** Lista customizada de marker types. Default: 44 oficiais. */
  markerTypes?: MarkerType[]
  /** URL opcional para previews dos markers. Se fornecido, mostra `{url}{idPadded2}.webp` */
  previewsBaseUrl?: string
  /** Modo de scale. 'uniform' usa 1 input que aplica em x/y/z. 'xyz' permite editar separado. Default 'uniform'. */
  scaleMode?: "uniform" | "xyz"
  /** Classe wrapper externa */
  className?: string
}

// ────────────────────────────────────────────────────────────
// Componente
// ────────────────────────────────────────────────────────────

export function MriMarkerPicker({
  type,
  color,
  scale,
  onChange,
  markerTypes = DEFAULT_MARKER_TYPES,
  previewsBaseUrl,
  scaleMode = "uniform",
  className,
}: MriMarkerPickerProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return markerTypes
    const q = search.toLowerCase()
    return markerTypes.filter(m =>
      String(m.id).includes(q) ||
      m.name.toLowerCase().includes(q) ||
      (m.description?.toLowerCase().includes(q) ?? false)
    )
  }, [markerTypes, search])

  const selected = markerTypes.find(m => m.id === type)
  const colorCss = `rgba(${color.r}, ${color.g}, ${color.b}, ${(color.a / 255).toFixed(2)})`

  const update = (patch: Partial<{ type: number; color: MarkerColor; scale: MarkerScale }>) => {
    onChange({
      type: patch.type ?? type,
      color: patch.color ?? color,
      scale: patch.scale ?? scale,
    })
  }

  const updateColor = (key: keyof MarkerColor, value: number) => {
    update({ color: { ...color, [key]: Math.max(0, Math.min(255, value | 0)) } })
  }

  const updateScale = (key: keyof MarkerScale, value: number) => {
    if (scaleMode === "uniform") {
      update({ scale: { x: value, y: value, z: value } })
    } else {
      update({ scale: { ...scale, [key]: value } })
    }
  }

  return (
    <div className={cn("flex gap-3 rounded-md border border-border bg-card p-3", className)}>
      {/* Coluna esquerda: lista de marker types */}
      <div className="flex flex-col gap-2 w-72 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          <MriInput
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar tipo (ID ou nome)..."
            className="pl-7 text-xs"
          />
        </div>

        <div className="flex-1 max-h-72 overflow-y-auto rounded border border-border bg-background/30 divide-y divide-border/50">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-xs text-muted-foreground">
              Nenhum resultado
            </div>
          ) : (
            filtered.map(m => (
              <button
                key={m.id}
                onClick={() => update({ type: m.id })}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 text-left transition-colors",
                  m.id === type
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent"
                )}
                title={m.description}
              >
                <span className="text-[10px] font-mono text-muted-foreground w-6 flex-shrink-0">
                  {String(m.id).padStart(2, "0")}
                </span>
                <span className="text-xs truncate">{m.name}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Coluna direita: preview + cor + escala */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Preview */}
        <div className="rounded border border-border bg-background/30 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Preview</p>
          <div className="flex items-center gap-3">
            {previewsBaseUrl ? (
              <div className="flex items-center justify-center w-24 h-24 rounded bg-background border border-border">
                <img
                  src={`${previewsBaseUrl}${String(type).padStart(2, "0")}.webp`}
                  alt={selected?.name}
                  className="object-contain"
                  style={{
                    width: `${Math.min(scale.x * 32, 96)}px`,
                    height: `${Math.min(scale.z * 32, 96)}px`,
                    filter: `drop-shadow(0 0 4px ${colorCss})`,
                  }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-24 h-24 rounded border border-border"
                style={{ backgroundColor: colorCss }}
              >
                <span className="text-[10px] font-mono text-white mix-blend-difference">
                  Type {type}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1 text-xs">
              <p>
                <span className="text-muted-foreground">Tipo:</span>{" "}
                <span className="font-mono">{type}</span>
                {selected && <span className="text-muted-foreground"> · {selected.name}</span>}
              </p>
              {selected?.description && (
                <p className="text-[10px] text-muted-foreground">{selected.description}</p>
              )}
              <p>
                <span className="text-muted-foreground">Cor:</span>{" "}
                <span className="inline-block w-3 h-3 rounded-sm border border-border align-middle mr-1" style={{ backgroundColor: colorCss }} />
                <span className="font-mono">rgba({color.r}, {color.g}, {color.b}, {color.a})</span>
              </p>
              <p>
                <span className="text-muted-foreground">Scale:</span>{" "}
                <span className="font-mono">
                  {scaleMode === "uniform"
                    ? scale.x.toFixed(2)
                    : `${scale.x.toFixed(1)} × ${scale.y.toFixed(1)} × ${scale.z.toFixed(1)}`}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Cor RGBA */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Cor (RGBA)</p>
          <div className="space-y-1.5">
            {(["r", "g", "b", "a"] as const).map(ch => (
              <div key={ch} className="flex items-center gap-2">
                <label className="text-[10px] font-mono text-muted-foreground w-3 uppercase">{ch}</label>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={color[ch]}
                  onChange={e => updateColor(ch, parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
                <MriInput
                  type="number"
                  min={0}
                  max={255}
                  value={color[ch]}
                  onChange={e => updateColor(ch, parseInt(e.target.value) || 0)}
                  className="w-16 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scale */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Scale</p>
            <button
              onClick={() => {
                if (scaleMode === "uniform") {
                  // Quando muda para xyz, preserva valor uniforme
                  update({ scale: { x: scale.x, y: scale.x, z: scale.x } })
                }
              }}
              className="text-[9px] text-muted-foreground hover:text-foreground"
            >
              {scaleMode === "uniform" ? "(uniforme)" : "(x, y, z)"}
            </button>
          </div>
          {scaleMode === "uniform" ? (
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0.1}
                max={5}
                step={0.05}
                value={scale.x}
                onChange={e => updateScale("x", parseFloat(e.target.value))}
                className="flex-1 accent-primary"
              />
              <MriInput
                type="number"
                min={0.1}
                max={10}
                step={0.05}
                value={scale.x}
                onChange={e => updateScale("x", parseFloat(e.target.value) || 0)}
                className="w-20 text-xs"
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {(["x", "y", "z"] as const).map(axis => (
                <div key={axis} className="flex flex-col">
                  <label className="text-[9px] font-mono text-muted-foreground uppercase mb-0.5">{axis}</label>
                  <MriInput
                    type="number"
                    min={0.1}
                    max={10}
                    step={0.05}
                    value={scale[axis]}
                    onChange={e => updateScale(axis, parseFloat(e.target.value) || 0)}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
