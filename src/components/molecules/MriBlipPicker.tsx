import { useEffect, useMemo, useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { MriInput } from "@/components/atoms/MriInput"

// ────────────────────────────────────────────────────────────
// Paleta oficial de 86 blip colors (IDs 0-85)
// Fontes: docs.fivem.net/docs/game-references/blips (nomes) +
//         forum.cfx.re/t/development-blip-colour-id-to-rgb (RGB)
// ────────────────────────────────────────────────────────────

export interface BlipColor {
  id: number
  name: string
  hex: string
}

export const DEFAULT_BLIP_COLORS: BlipColor[] = [
  { id: 0,  name: "White",            hex: "#FEFEFE" },
  { id: 1,  name: "Red",              hex: "#E03232" },
  { id: 2,  name: "Green",            hex: "#71CB71" },
  { id: 3,  name: "Blue",             hex: "#5DB6E5" },
  { id: 4,  name: "White",            hex: "#FEFEFE" },
  { id: 5,  name: "Yellow",           hex: "#EEC64E" },
  { id: 6,  name: "Light Red",        hex: "#C25050" },
  { id: 7,  name: "Violet",           hex: "#9C6EAF" },
  { id: 8,  name: "Pink",             hex: "#FE7AC3" },
  { id: 9,  name: "Light Orange",     hex: "#F59D79" },
  { id: 10, name: "Light Brown",      hex: "#B18F83" },
  { id: 11, name: "Light Green",      hex: "#8DCEA7" },
  { id: 12, name: "Light Blue",       hex: "#70A8AE" },
  { id: 13, name: "Light Purple",     hex: "#D3D1E7" },
  { id: 14, name: "Dark Purple",      hex: "#8F7E98" },
  { id: 15, name: "Cyan",             hex: "#6AC4BF" },
  { id: 16, name: "Light Yellow",     hex: "#D5C398" },
  { id: 17, name: "Orange",           hex: "#EA8E50" },
  { id: 18, name: "Light Blue",       hex: "#97CAE9" },
  { id: 19, name: "Dark Pink",        hex: "#B26287" },
  { id: 20, name: "Dark Yellow",      hex: "#8F8D79" },
  { id: 21, name: "Dark Orange",      hex: "#A6755E" },
  { id: 22, name: "Light Gray",       hex: "#AFA8A8" },
  { id: 23, name: "Light Pink",       hex: "#E78D9A" },
  { id: 24, name: "Lemon Green",      hex: "#BBD65B" },
  { id: 25, name: "Forest Green",     hex: "#0C7B56" },
  { id: 26, name: "Electric Blue",    hex: "#7AC3FE" },
  { id: 27, name: "Bright Purple",    hex: "#AB3CE6" },
  { id: 28, name: "Dark Yellow",      hex: "#CDA80C" },
  { id: 29, name: "Dark Blue",        hex: "#4561AB" },
  { id: 30, name: "Dark Cyan",        hex: "#29A5B8" },
  { id: 31, name: "Light Brown",      hex: "#B89B7B" },
  { id: 32, name: "Light Blue",       hex: "#C8E0FE" },
  { id: 33, name: "Light Yellow",     hex: "#F0F096" },
  { id: 34, name: "Light Pink",       hex: "#ED8CA1" },
  { id: 35, name: "Light Red",        hex: "#F98A8A" },
  { id: 36, name: "Beige",            hex: "#FBEEA5" },
  { id: 37, name: "White",            hex: "#FEFEFE" },
  { id: 38, name: "Blue",             hex: "#2C6DB8" },
  { id: 39, name: "Light Gray",       hex: "#9A9A9A" },
  { id: 40, name: "Dark Gray",        hex: "#4C4C4C" },
  { id: 41, name: "Pink Red",         hex: "#F29D9D" },
  { id: 42, name: "Blue",             hex: "#6CB7D6" },
  { id: 43, name: "Light Green",      hex: "#AFEDAE" },
  { id: 44, name: "Light Orange",     hex: "#FFA75F" },
  { id: 45, name: "White",            hex: "#F1F1F1" },
  { id: 46, name: "Gold",             hex: "#ECF029" },
  { id: 47, name: "Orange",           hex: "#FF9A18" },
  { id: 48, name: "Brilliant Rose",   hex: "#F644A5" },
  { id: 49, name: "Red",              hex: "#E03A3A" },
  { id: 50, name: "Medium Purple",    hex: "#8A6DE3" },
  { id: 51, name: "Salmon",           hex: "#FF8B5C" },
  { id: 52, name: "Dark Green",       hex: "#416C41" },
  { id: 53, name: "Blizzard Blue",    hex: "#B3DDF3" },
  { id: 54, name: "Oracle Blue",      hex: "#3A6479" },
  { id: 55, name: "Silver",           hex: "#A0A0A0" },
  { id: 56, name: "Brown",            hex: "#847232" },
  { id: 57, name: "Blue",             hex: "#65B9E7" },
  { id: 58, name: "East Bay",         hex: "#4B4175" },
  { id: 59, name: "Red",              hex: "#E13B3B" },
  { id: 60, name: "Yellow Orange",    hex: "#F0CB58" },
  { id: 61, name: "Mulberry Pink",    hex: "#CD3F98" },
  { id: 62, name: "Alto Gray",        hex: "#CFCFCF" },
  { id: 63, name: "Jelly Bean Blue",  hex: "#276A9F" },
  { id: 64, name: "Dark Orange",      hex: "#D87B1B" },
  { id: 65, name: "Mamba",            hex: "#8E8393" },
  { id: 66, name: "Yellow Orange",    hex: "#F0CB57" },
  { id: 67, name: "Blue",             hex: "#65B9E7" },
  { id: 68, name: "Blue",             hex: "#65B9E7" },
  { id: 69, name: "Green",            hex: "#79CD79" },
  { id: 70, name: "Yellow Orange",    hex: "#EFCA57" },
  { id: 71, name: "Yellow Orange",    hex: "#EFCA57" },
  { id: 72, name: "Transparent Black",hex: "#3D3D3D" },
  { id: 73, name: "Yellow Orange",    hex: "#EFCA57" },
  { id: 74, name: "Blue",             hex: "#65B9E7" },
  { id: 75, name: "Red",              hex: "#E03232" },
  { id: 76, name: "Deep Red",         hex: "#782323" },
  { id: 77, name: "Blue",             hex: "#65B9E7" },
  { id: 78, name: "Oracle Blue",      hex: "#3A6479" },
  { id: 79, name: "Transparent Red",  hex: "#E03232" },
  { id: 80, name: "Transparent Blue", hex: "#65B9E7" },
  { id: 81, name: "Orange",           hex: "#F2A40C" },
  { id: 82, name: "Light Green",      hex: "#A4CCAA" },
  { id: 83, name: "Purple",           hex: "#A854F2" },
  { id: 84, name: "Blue",             hex: "#65B9E7" },
  { id: 85, name: "Transparent Black",hex: "#3D3D3D" },
]

// ────────────────────────────────────────────────────────────
// Manifest dos sprites (id + nome). Por convenção, a URL final é:
//   {assetsBaseUrl}{idPadded3}_{name}.webp
// Ex: 000_radar_higher.webp → "https://assets.mriqbox.com.br/blips/000_radar_higher.webp"
// ────────────────────────────────────────────────────────────

export interface BlipManifestEntry {
  id: number
  name: string  // sem extensão e sem o prefixo numérico
}

const DEFAULT_ASSETS_BASE_URL = "https://assets.mriqbox.com.br/blips/"

function padId(id: number): string {
  return String(id).padStart(3, "0")
}

function spriteUrl(baseUrl: string, entry: BlipManifestEntry): string {
  return `${baseUrl}${padId(entry.id)}_${entry.name}.webp`
}

// ────────────────────────────────────────────────────────────
// Props
// ────────────────────────────────────────────────────────────

export interface MriBlipPickerProps {
  sprite: number
  color: number
  scale?: number
  enabled?: boolean
  onChange: (val: { sprite: number; color: number; scale: number; enabled?: boolean }) => void
  /** URL base dos assets. Default: `https://assets.mriqbox.com.br/blips/` */
  assetsBaseUrl?: string
  /** Lista de sprites disponíveis. Se omitido, busca `{assetsBaseUrl}manifest.json`. */
  manifest?: BlipManifestEntry[]
  /** Paleta de cores. Default: as 86 oficiais. */
  colors?: BlipColor[]
  /** Limites do slider de scale. Default: [0.5, 1.5] */
  scaleRange?: [number, number]
  /** Mostrar slider de scale. Default: true */
  showScale?: boolean
  /** Mostrar checkbox de Enable. Default: false (usado quando o blip pode ser desabilitado) */
  showEnable?: boolean
  /** Classe wrapper externa */
  className?: string
}

// ────────────────────────────────────────────────────────────
// Componente
// ────────────────────────────────────────────────────────────

export function MriBlipPicker({
  sprite,
  color,
  scale = 1,
  enabled,
  onChange,
  assetsBaseUrl = DEFAULT_ASSETS_BASE_URL,
  manifest: providedManifest,
  colors = DEFAULT_BLIP_COLORS,
  scaleRange = [0.5, 1.5],
  showScale = true,
  showEnable = false,
  className,
}: MriBlipPickerProps) {
  const baseUrl = assetsBaseUrl.endsWith("/") ? assetsBaseUrl : `${assetsBaseUrl}/`

  // Fetch manifest se não fornecido
  const [fetchedManifest, setFetchedManifest] = useState<BlipManifestEntry[] | null>(null)
  const [manifestError, setManifestError] = useState<string | null>(null)

  useEffect(() => {
    if (providedManifest) {
      setFetchedManifest(null)
      setManifestError(null)
      return
    }
    let cancelled = false
    fetch(`${baseUrl}manifest.json`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data: unknown) => {
        if (cancelled) return
        if (Array.isArray(data)) {
          setFetchedManifest(data as BlipManifestEntry[])
          setManifestError(null)
        } else {
          setManifestError("Manifest inválido")
        }
      })
      .catch(err => {
        if (!cancelled) setManifestError(String(err.message ?? err))
      })
    return () => { cancelled = true }
  }, [providedManifest, baseUrl])

  const manifest = providedManifest ?? fetchedManifest ?? []

  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return manifest
    const q = search.toLowerCase()
    return manifest.filter(b =>
      String(b.id).includes(q) ||
      b.name.toLowerCase().includes(q) ||
      b.name.replace(/_/g, " ").toLowerCase().includes(q)
    )
  }, [manifest, search])

  const selectedEntry = manifest.find(e => e.id === sprite)
  const selectedColor = colors.find(c => c.id === color) ?? colors[0]

  const update = (patch: Partial<{ sprite: number; color: number; scale: number; enabled: boolean }>) => {
    onChange({
      sprite: patch.sprite ?? sprite,
      color: patch.color ?? color,
      scale: patch.scale ?? scale,
      enabled: patch.enabled ?? enabled,
    })
  }

  return (
    <div className={cn("flex gap-3 rounded-md border border-border bg-card p-3", className)}>
      {/* Coluna esquerda: lista de sprites */}
      <div className="flex flex-col gap-2 w-72 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
          <MriInput
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar sprite por ID ou nome..."
            className="pl-7 text-xs"
          />
        </div>

        {!providedManifest && fetchedManifest === null && !manifestError && (
          <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
            Carregando manifest...
          </div>
        )}

        {manifestError && (
          <div className="rounded border border-destructive/40 bg-destructive/10 px-2 py-1.5 text-[10px] text-destructive">
            Não foi possível carregar o manifest: {manifestError}.<br/>
            Você ainda pode editar o ID manualmente abaixo.
          </div>
        )}

        {manifest.length > 0 && (
          <div className="flex-1 max-h-72 overflow-y-auto rounded border border-border bg-background/30 divide-y divide-border/50">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-20 text-xs text-muted-foreground">
                Nenhum resultado
              </div>
            ) : (
              filtered.slice(0, 200).map(b => (
                <button
                  key={b.id}
                  onClick={() => update({ sprite: b.id })}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 text-left transition-colors",
                    b.id === sprite
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent"
                  )}
                >
                  <SpriteImage
                    src={spriteUrl(baseUrl, b)}
                    tint={b.id === sprite ? selectedColor.hex : undefined}
                    className="w-5 h-5 flex-shrink-0"
                  />
                  <span className="text-[10px] font-mono text-muted-foreground w-8 flex-shrink-0">
                    {padId(b.id)}
                  </span>
                  <span className="text-xs truncate">{b.name.replace(/_/g, " ")}</span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Input manual de ID (fallback) */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground flex-shrink-0">Sprite ID</label>
          <MriInput
            type="number"
            min={0}
            max={830}
            value={sprite}
            onChange={e => update({ sprite: parseInt(e.target.value) || 0 })}
            className="text-xs"
          />
        </div>
      </div>

      {/* Coluna direita: preview + cor + scale */}
      <div className="flex-1 min-w-0 flex flex-col gap-3">
        {/* Preview */}
        <div className="rounded border border-border bg-background/30 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Preview</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-24 h-24 rounded bg-background border border-border">
              {selectedEntry ? (
                <SpriteImage
                  src={spriteUrl(baseUrl, selectedEntry)}
                  tint={selectedColor.hex}
                  style={{
                    width: `${Math.min(scale * 64, 96)}px`,
                    height: `${Math.min(scale * 64, 96)}px`,
                  }}
                />
              ) : (
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1 text-xs">
              <p>
                <span className="text-muted-foreground">Sprite:</span>{" "}
                <span className="font-mono">{padId(sprite)}</span>
                {selectedEntry && <span className="text-muted-foreground"> · {selectedEntry.name.replace(/_/g, " ")}</span>}
              </p>
              <p>
                <span className="text-muted-foreground">Cor:</span>{" "}
                <span className="inline-block w-3 h-3 rounded-sm border border-border align-middle mr-1" style={{ backgroundColor: selectedColor.hex }} />
                <span className="font-mono">{color}</span>
                <span className="text-muted-foreground"> · {selectedColor.name}</span>
              </p>
              {showScale && (
                <p>
                  <span className="text-muted-foreground">Scale:</span>{" "}
                  <span className="font-mono">{scale.toFixed(2)}</span>
                </p>
              )}
              {showEnable && (
                <p>
                  <span className="text-muted-foreground">Estado:</span>{" "}
                  <span className={enabled ? "text-green-400" : "text-muted-foreground"}>
                    {enabled ? "Habilitado" : "Desabilitado"}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Paleta de cores */}
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Cor (Color ID) — {colors.length} cores
          </p>
          <div className="grid grid-cols-12 gap-1">
            {colors.map(c => {
              const active = c.id === color
              return (
                <button
                  key={c.id}
                  onClick={() => update({ color: c.id })}
                  title={`${c.id} — ${c.name}`}
                  className={cn(
                    "h-6 rounded border transition-all hover:scale-110 relative",
                    active ? "border-primary ring-2 ring-primary/40 scale-110" : "border-border/60 opacity-80 hover:opacity-100"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-white mix-blend-difference">
                      {c.id}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Scale slider */}
        {showScale && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Scale</p>
              <span className="text-[10px] font-mono">{scale.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={scaleRange[0]}
              max={scaleRange[1]}
              step={0.05}
              value={scale}
              onChange={e => update({ scale: parseFloat(e.target.value) })}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
              <span>{scaleRange[0].toFixed(1)}x</span>
              <span>{scaleRange[1].toFixed(1)}x</span>
            </div>
          </div>
        )}

        {/* Enable toggle */}
        {showEnable && (
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={enabled === true}
              onChange={e => update({ enabled: e.target.checked })}
              className="accent-primary"
            />
            Blip habilitado no mapa
          </label>
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// SpriteImage — usa CSS mask para tingir o PNG/WEBP na cor escolhida
// (fallback para img tag se mask não suportado)
// ────────────────────────────────────────────────────────────

function SpriteImage({
  src,
  tint,
  className,
  style,
}: {
  src: string
  tint?: string
  className?: string
  style?: React.CSSProperties
}) {
  const [errored, setErrored] = useState(false)

  // Pre-fetch para detectar 404 silenciosamente
  useEffect(() => {
    setErrored(false)
    const img = new Image()
    img.onerror = () => setErrored(true)
    img.src = src
  }, [src])

  if (errored) {
    return (
      <div
        className={cn("flex items-center justify-center text-[8px] text-muted-foreground/60 font-mono bg-muted/30 rounded", className)}
        style={style}
        title={`Não foi possível carregar: ${src}`}
      >
        ?
      </div>
    )
  }

  if (tint) {
    return (
      <div
        className={className}
        style={{
          ...style,
          backgroundColor: tint,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      className={cn("object-contain", className)}
      style={style}
      onError={() => setErrored(true)}
    />
  )
}
