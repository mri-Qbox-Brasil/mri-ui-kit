import { useEffect, useMemo, useState } from "react"
import { Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { MriInput } from "@/components/atoms/MriInput"
import {
  type BlipColor,
  type BlipManifestEntry,
  DEFAULT_BLIP_COLORS,
} from "./MriBlipPicker.constants"

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

  // Fetch manifest se não fornecido — sem reset síncrono dentro do effect.
  // Quando providedManifest existe, o effect apenas curto-circuita; o derived
  // `manifest` abaixo já dá precedência ao provided.
  const [fetchedManifest, setFetchedManifest] = useState<BlipManifestEntry[] | null>(null)
  const [manifestError, setManifestError] = useState<string | null>(null)

  useEffect(() => {
    if (providedManifest) return
    let cancelled = false
    // setState fica DENTRO de callbacks async (then/catch) — a regra
    // react-hooks/set-state-in-effect só veta chamadas síncronas no corpo
    // do effect, que causariam render cascateado.
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

  const manifest = useMemo<BlipManifestEntry[]>(
    () => providedManifest ?? fetchedManifest ?? [],
    [providedManifest, fetchedManifest]
  )

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

  const isLoadingManifest = !providedManifest && fetchedManifest === null && !manifestError

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

        {isLoadingManifest && (
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
// SpriteImage — usa CSS mask para tingir o PNG/WEBP na cor escolhida.
// Fallback para <img> se não houver tint.
// ────────────────────────────────────────────────────────────

interface SpriteImageProps {
  src: string
  tint?: string
  className?: string
  style?: React.CSSProperties
}

function SpriteImage({ src, tint, className, style }: SpriteImageProps) {
  const [errored, setErrored] = useState(false)
  const [lastSrc, setLastSrc] = useState(src)

  // Padrão "Adjusting state on prop change" do React docs — preferido sobre
  // setState em useEffect porque evita render cascateado.
  if (src !== lastSrc) {
    setLastSrc(src)
    setErrored(false)
  }

  useEffect(() => {
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
