/**
 * applyUiConfig — aplica o "estilo visual do servidor" (config do painel
 * /uiconfig do ox_lib) nas CSS vars do design system.
 *
 * Contrato de autoridade da suíte MRI: o ACCENT e o BACKGROUND são donos do
 * host (mri_Qadmin, via convar `mri:color`/`mri:backgroundColor`) e aplicados
 * por outro caminho (applyAccentColor / ThemeContext). Portanto este helper
 * **não** toca em `--primary*`/`--ring` (accent) nem em `--background`/`--card`/…
 * (background) nem no modo de tema. Herda só o restante do painel: radius,
 * fonte, cores de status, opacidade glass e dimensões.
 *
 * Uso típico (host ou plugin guest): ao receber o config do Lua/bridge,
 * `applyUiConfig(cfg)`. Todos os campos são opcionais — ausentes caem no
 * default e não sobrescrevem nada.
 */

/** Campos do painel /uiconfig herdáveis pelos consumidores (sem accent/background/tema). */
export interface MriUiConfig {
  /** Border radius em px → `--radius`. */
  radius?: number
  /** Opacidade do tema glass (0..1) → `--ui-glass-opacity`. */
  glassOpacity?: number
  /** Nome da fonte → `--ui-font-family` (com fallback Saira). */
  fontFamily?: string
  /** Cor semântica de sucesso (hex) → `--ui-success`. */
  successColor?: string
  /** Cor semântica de aviso (hex) → `--ui-warning`. */
  warningColor?: string
  /** Cor semântica de erro (hex) → `--ui-error`. */
  errorColor?: string
  /** Estilo de progresso ('default' | 'bar' | 'circle') → `--ui-progress-style`. */
  progressStyle?: string
  /** Dimensões (px) dos widgets ox_lib → CSS vars `--ui-*` correspondentes. */
  notifyWidth?: number
  progressBarWidth?: number
  progressBarHeight?: number
  progressCircleSize?: number
  menuWidth?: number
  contextWidth?: number
}

const HEX_RE = /^#[0-9a-f]{6}$/i
function isValidHex(value: unknown): value is string {
  return typeof value === 'string' && HEX_RE.test(value)
}

/**
 * Escreve as CSS vars herdadas em `document.documentElement`.
 * No-op seguro quando `cfg` é nulo/indefinido ou fora de um DOM.
 */
export function applyUiConfig(cfg: MriUiConfig | null | undefined): void {
  if (!cfg || typeof document === 'undefined') return
  const root = document.documentElement

  if (typeof cfg.radius === 'number') {
    root.style.setProperty('--radius', `${cfg.radius}px`)
  }

  if (cfg.fontFamily) {
    root.style.setProperty(
      '--ui-font-family',
      `"${cfg.fontFamily}", "Saira", ui-sans-serif, sans-serif`,
    )
  }

  if (typeof cfg.glassOpacity === 'number') {
    root.style.setProperty('--ui-glass-opacity', String(cfg.glassOpacity))
  }

  if (isValidHex(cfg.successColor)) root.style.setProperty('--ui-success', cfg.successColor)
  if (isValidHex(cfg.warningColor)) root.style.setProperty('--ui-warning', cfg.warningColor)
  if (isValidHex(cfg.errorColor)) root.style.setProperty('--ui-error', cfg.errorColor)

  if (cfg.progressStyle) root.style.setProperty('--ui-progress-style', cfg.progressStyle)

  const px = (name: string, v: number | undefined) => {
    if (typeof v === 'number' && v > 0) root.style.setProperty(name, `${v}px`)
  }
  px('--ui-notify-width', cfg.notifyWidth)
  px('--ui-progress-width', cfg.progressBarWidth)
  px('--ui-progress-height', cfg.progressBarHeight)
  px('--ui-progress-circle', cfg.progressCircleSize)
  px('--ui-menu-width', cfg.menuWidth)
  px('--ui-context-width', cfg.contextWidth)
}
