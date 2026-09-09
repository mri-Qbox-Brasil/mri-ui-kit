import { useEffect, useMemo, useState } from "react"
import { Search, Sparkles, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { MriInput } from "@/components/atoms/MriInput"
import { MriSlider } from "@/components/atoms/MriSlider"
import { MriCheckbox } from "@/components/atoms/MriCheckbox"
import { MriBlipSprite } from "@/components/atoms/MriBlipSprite"
import { MriColorSwatchGrid } from "@/components/molecules/MriColorSwatchGrid"
import { MriPopover, MriPopoverTrigger, MriPopoverContent } from "@/components/molecules/MriPopover"
import {
  type BlipColor,
  type BlipManifestEntry,
  type FivemRefsIndex,
  DEFAULT_BLIP_COLORS,
  DEFAULT_FIVEM_REFS_URL,
} from "./MriBlipPicker.constants"

const DEFAULT_CDN_BASE = "https://assets.mriqbox.com.br/"

function padId(id: number): string {
  return String(id).padStart(3, "0")
}

function spriteUrl(cdnBase: string, entry: BlipManifestEntry): string {
  // Prefere o path explícito (manifest oficial); cai no fallback se o
  // consumer passou manifest reduzido (ex: storybook).
  const path = entry.file ?? `blips/${padId(entry.id)}_${entry.name}.webp`
  return `${cdnBase}${path}`
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
  /** URL base do CDN onde os arquivos estão hospedados. O `file` do manifest é
   *  concatenado direto: `${cdnBase}${entry.file}`. Default: `https://assets.mriqbox.com.br/`. */
  cdnBase?: string
  /** URL do índice JSON (formato `FivemRefsIndex`). Se omitido, usa o oficial. */
  indexUrl?: string
  /** Lista de sprites pré-fornecida. Se passada, NÃO faz fetch do índice. */
  manifest?: BlipManifestEntry[]
  /** Inclui itens com `available: false` na lista. Default: false. */
  showUnavailable?: boolean
  /** Paleta de cores. Default: as 86 oficiais. */
  colors?: BlipColor[]
  /** Limites do slider de scale. Default: [0.5, 1.5] */
  scaleRange?: [number, number]
  /** Mostrar slider de scale. Default: true */
  showScale?: boolean
  /** Mostrar checkbox de Enable. Default: false (usado quando o blip pode ser desabilitado) */
  showEnable?: boolean
  /** Modo compacto: renderiza um trigger pequeno (preview do selecionado) que
   *  abre a UI completa num popover flutuante. Default: false. */
  compact?: boolean
  /** Classe wrapper externa */
  className?: string
}

// ────────────────────────────────────────────────────────────
// Componente principal
// ────────────────────────────────────────────────────────────

export function MriBlipPicker(props: MriBlipPickerProps) {
  if (props.compact) {
    return <MriBlipPickerCompact {...props} />
  }
  return (
    <div className={cn("rounded-md border border-border bg-card p-3", props.className)}>
      <BlipPickerBody {...props} />
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Modo compacto — trigger + popover
// ────────────────────────────────────────────────────────────

function MriBlipPickerCompact(props: MriBlipPickerProps) {
  const {
    sprite, color, scale = 1, enabled,
    cdnBase = DEFAULT_CDN_BASE,
    manifest: providedManifest,
    indexUrl = DEFAULT_FIVEM_REFS_URL,
    colors = DEFAULT_BLIP_COLORS,
    className,
  } = props

  const normalizedBase = cdnBase.endsWith("/") ? cdnBase : `${cdnBase}/`

  // Fetch local só pra resolver o nome do item selecionado no trigger.
  // Quando o consumer já passa manifest, não dispara fetch.
  const triggerEntry = useTriggerEntry(providedManifest, indexUrl, sprite)
  const selectedColor = colors.find(c => c.id === color) ?? colors[0]

  const [open, setOpen] = useState(false)

  return (
    <MriPopover open={open} onOpenChange={setOpen}>
      <MriPopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 text-left transition-colors hover:bg-accent w-full",
            className
          )}
        >
          {triggerEntry ? (
            <MriBlipSprite
              src={spriteUrl(normalizedBase, triggerEntry)}
              tint={selectedColor.hex}
              className="w-6 h-6 flex-shrink-0"
            />
          ) : (
            <Sparkles className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-muted-foreground">{padId(sprite)}</span>
              {triggerEntry && (
                <span className="truncate">{triggerEntry.name.replace(/_/g, " ")}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm border border-border"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="font-mono">{color}</span>
              <span>·</span>
              <span>{selectedColor.name}</span>
              {props.showScale !== false && (
                <>
                  <span>·</span>
                  <span className="font-mono">{scale.toFixed(2)}x</span>
                </>
              )}
              {props.showEnable && (
                <>
                  <span>·</span>
                  <span className={enabled ? "text-green-400" : "text-muted-foreground"}>
                    {enabled ? "on" : "off"}
                  </span>
                </>
              )}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        </button>
      </MriPopoverTrigger>
      <MriPopoverContent
        className="w-[640px] p-3 bg-card"
        align="start"
        sideOffset={6}
      >
        <BlipPickerBody {...props} />
      </MriPopoverContent>
    </MriPopover>
  )
}

// ────────────────────────────────────────────────────────────
// Body — UI completa reutilizada inline e dentro do popover
// ────────────────────────────────────────────────────────────

function BlipPickerBody({
  sprite,
  color,
  scale = 1,
  enabled,
  onChange,
  cdnBase = DEFAULT_CDN_BASE,
  indexUrl = DEFAULT_FIVEM_REFS_URL,
  manifest: providedManifest,
  showUnavailable = false,
  colors = DEFAULT_BLIP_COLORS,
  scaleRange = [0.5, 1.5],
  showScale = true,
  showEnable = false,
}: MriBlipPickerProps) {
  const normalizedBase = cdnBase.endsWith("/") ? cdnBase : `${cdnBase}/`

  const [fetchedManifest, setFetchedManifest] = useState<BlipManifestEntry[] | null>(null)
  const [manifestError, setManifestError] = useState<string | null>(null)

  useEffect(() => {
    if (providedManifest) return
    let cancelled = false
    fetch(indexUrl)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data: unknown) => {
        if (cancelled) return
        const idx = data as Partial<FivemRefsIndex>
        if (idx && Array.isArray(idx.blips)) {
          setFetchedManifest(idx.blips)
          setManifestError(null)
        } else {
          setManifestError("Manifest sem campo 'blips'")
        }
      })
      .catch(err => {
        if (!cancelled) setManifestError(String(err.message ?? err))
      })
    return () => { cancelled = true }
  }, [providedManifest, indexUrl])

  const manifest = useMemo<BlipManifestEntry[]>(() => {
    const src = providedManifest ?? fetchedManifest ?? []
    return showUnavailable ? src : src.filter(b => b.available !== false)
  }, [providedManifest, fetchedManifest, showUnavailable])

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
    <div className="flex gap-3">
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
                  <MriBlipSprite
                    src={spriteUrl(normalizedBase, b)}
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
                <MriBlipSprite
                  src={spriteUrl(normalizedBase, selectedEntry)}
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
          <MriColorSwatchGrid
            swatches={colors}
            value={color}
            onChange={id => update({ color: id as number })}
          />
        </div>

        {/* Scale slider */}
        {showScale && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Scale</p>
              <span className="text-[10px] font-mono">{scale.toFixed(2)}</span>
            </div>
            <MriSlider
              min={scaleRange[0]}
              max={scaleRange[1]}
              step={0.05}
              value={scale}
              onChange={v => update({ scale: v })}
              size="sm"
              glow={false}
              ticks={2}
              formatTick={v => `${v.toFixed(1)}x`}
              aria-label="Scale"
            />
          </div>
        )}

        {/* Enable toggle */}
        {showEnable && (
          <MriCheckbox
            checked={enabled === true}
            onCheckedChange={v => update({ enabled: v })}
            label="Blip habilitado no mapa"
          />
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Hook compartilhado: resolve a entry pelo ID do sprite. No modo compacto,
// o trigger precisa do `name` e `file` para mostrar o preview tingido.
// ────────────────────────────────────────────────────────────

function useTriggerEntry(
  providedManifest: BlipManifestEntry[] | undefined,
  indexUrl: string,
  sprite: number
): BlipManifestEntry | undefined {
  const [fetched, setFetched] = useState<BlipManifestEntry[] | null>(null)

  useEffect(() => {
    if (providedManifest) return
    let cancelled = false
    fetch(indexUrl)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data: unknown) => {
        if (cancelled) return
        const idx = data as Partial<FivemRefsIndex>
        if (idx && Array.isArray(idx.blips)) setFetched(idx.blips)
      })
      .catch(() => { /* silencioso — trigger continua mostrando só o ID */ })
    return () => { cancelled = true }
  }, [providedManifest, indexUrl])

  const list = providedManifest ?? fetched ?? []
  return list.find(b => b.id === sprite)
}
