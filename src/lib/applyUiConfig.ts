/**
 * applyUiConfig — aplica o "estilo visual do servidor" (config do painel
 * /uiconfig do ox_lib) nas CSS vars do design system.
 *
 * Contrato de autoridade da suíte MRI: o ACCENT e o BACKGROUND são donos do
 * host (mri_Qadmin, via convar `mri:color`/`mri:backgroundColor`) e aplicados
 * por outro caminho (applyAccentColor / ThemeContext). Portanto este helper
 * **não** toca em `--primary*`/`--ring` (accent) nem em `--background`/`--card`/…
 * (background) nem no modo de tema. Herda só o restante do painel: radius,
 * fonte, cores de status, opacidade e dimensões.
 *
 * Uso típico (host ou plugin guest): ao receber o config do Lua/bridge,
 * `applyUiConfig(cfg)`. Todos os campos são opcionais — ausentes caem no
 * default e não sobrescrevem nada.
 */

/** Campos do painel /uiconfig herdáveis pelos consumidores (sem accent/background/tema). */
export interface MriUiConfig {
  /** Border radius em px → `--radius`. */
  radius?: number
  /** Opacidade real dos painéis e cards em qualquer tema (0..1) → `--ui-opacity`. */
  opacity?: number
  /** @deprecated ignorado; use `opacity`. */
  glassOpacity?: number
  /** Nome da fonte → `--ui-font-family` (com fallback Saira). */
  fontFamily?: string
  /** Cor semântica de sucesso (hex) → `--ui-success` e `--ui-success-rgb`. */
  successColor?: string
  /** Cor semântica de aviso (hex) → `--ui-warning` e `--ui-warning-rgb`. */
  warningColor?: string
  /** Cor semântica de erro (hex) → `--ui-error` e `--ui-error-rgb`. */
  errorColor?: string
  /** Estilo de progresso ('default' | 'bar' | 'circle') → `--ui-progress-style`. */
  progressStyle?: string
  /** Shape dos toggles on/off: 'square' | 'round' | 'follow' (segue o --radius).
   *  → CSS vars `--ui-switch-track-radius` / `--ui-switch-knob-radius`. */
  switchStyle?: 'square' | 'round' | 'follow'
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

  if (typeof cfg.opacity === 'number') {
    root.style.setProperty('--ui-opacity', String(cfg.opacity))
  }

  // Hex em --ui-* e os canais em --ui-*-rgb (pra transparência, ver themes.css).
  const status = (name: string, hex: string | undefined) => {
    if (!isValidHex(hex)) return
    root.style.setProperty(name, hex)
    root.style.setProperty(
      `${name}-rgb`,
      `${parseInt(hex.slice(1, 3), 16)} ${parseInt(hex.slice(3, 5), 16)} ${parseInt(hex.slice(5, 7), 16)}`,
    )
  }
  status('--ui-success', cfg.successColor)
  status('--ui-warning', cfg.warningColor)
  status('--ui-error', cfg.errorColor)

  if (cfg.progressStyle) root.style.setProperty('--ui-progress-style', cfg.progressStyle)

  // Shape dos toggles on/off (MriSwitch + toggles inline). Default 'follow'
  // segue o --radius; 'square' zera; 'round' vira pill. Vars consumidas com
  // rounded-[var(--ui-switch-*-radius)].
  if (cfg.switchStyle === 'square') {
    root.style.setProperty('--ui-switch-track-radius', '0px')
    root.style.setProperty('--ui-switch-knob-radius', '0px')
  } else if (cfg.switchStyle === 'round') {
    root.style.setProperty('--ui-switch-track-radius', '9999px')
    root.style.setProperty('--ui-switch-knob-radius', '9999px')
  } else if (cfg.switchStyle === 'follow') {
    root.style.setProperty('--ui-switch-track-radius', 'calc(var(--radius) - 2px)')
    root.style.setProperty('--ui-switch-knob-radius', 'calc(var(--radius) - 4px)')
  }

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
