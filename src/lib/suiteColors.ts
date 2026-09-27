/** Cor de destaque padrão da suíte (convar `mri:color` sem valor). */
export const DEFAULT_ACCENT = '#00E699'

/** Fundo padrão da suíte; derivado, reproduz a paleta dark oficial (240 10% 4%). */
export const DEFAULT_BACKGROUND = '#09090B'

const HEX_RE = /^#[0-9a-f]{6}$/i

const BACKGROUND_VARS = [
  '--background',
  '--card',
  '--popover',
  '--secondary',
  '--muted',
  '--border',
  '--input',
  '--foreground',
  '--card-foreground',
  '--popover-foreground',
] as const

let suiteAccent = DEFAULT_ACCENT
let accentOverride: string | null = null
let suiteBackground = ''
let backgroundOverride: string | null = null

/** true para hex `#RRGGBB`. */
export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX_RE.test(value)
}

/** Hex `#RRGGBB` para HSL inteiro (h 0..360, s e l 0..100). */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

/** HSL (h 0..360, s e l 0..100) para hex `#RRGGBB` maiúsculo. */
export function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100
  const light = l / 100
  const a = sat * Math.min(light, 1 - light)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    const v = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(v * 255).toString(16).padStart(2, '0')
  }
  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase()
}

function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 / 255 < 0.5
}

/** Escreve `--primary`, `--primary-foreground`, `--ring` e `--primary-rgb`; hex inválido usa o DEFAULT_ACCENT. */
export function applyAccentColor(hex: string): void {
  if (typeof document === 'undefined') return
  const color = isHexColor(hex) ? hex : DEFAULT_ACCENT
  const { h, s, l } = hexToHsl(color)
  const token = `${h} ${s}% ${l}%`
  const root = document.documentElement

  root.style.setProperty('--primary', token)
  root.style.setProperty('--ring', token)
  root.style.setProperty('--primary-foreground', isDark(color) ? '210 40% 98%' : '240 10% 4%')
  root.style.setProperty(
    '--primary-rgb',
    `${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}`,
  )
}

/** Deriva os tokens de superfície a partir de um hex; vazio ou inválido usa o DEFAULT_BACKGROUND. */
export function applyBackgroundColor(hex: string): void {
  if (typeof document === 'undefined') return
  const color = isHexColor(hex) ? hex : DEFAULT_BACKGROUND
  const { h, s, l } = hexToHsl(color)
  const root = document.documentElement
  const raised = `${h} ${s}% ${Math.min(l + 2, 100)}%`
  const surface = `${h} ${Math.max(s - 5, 0)}% ${Math.min(l + 11, 100)}%`
  const fg = isDark(color) ? '0 0% 98%' : '240 10% 4%'

  root.style.setProperty('--background', `${h} ${s}% ${l}%`)
  root.style.setProperty('--card', raised)
  root.style.setProperty('--popover', raised)
  for (const v of ['--secondary', '--muted', '--border', '--input']) root.style.setProperty(v, surface)
  for (const v of ['--foreground', '--card-foreground', '--popover-foreground']) root.style.setProperty(v, fg)
}

/** Remove os tokens de superfície inline, devolvendo o controle ao CSS (ex.: modo light). */
export function clearBackgroundColor(): void {
  if (typeof document === 'undefined') return
  for (const v of BACKGROUND_VARS) document.documentElement.style.removeProperty(v)
}

/** Accent global da suíte (convar `mri:color`); hex inválido é ignorado. */
export function setSuiteAccent(hex: string): void {
  if (!isHexColor(hex)) return
  suiteAccent = hex
  applyAccentColor(getEffectiveAccent())
}

/** Override do accent (painel /uiconfig); null ou vazio volta para o global. */
export function setAccentOverride(hex: string | null | undefined): void {
  accentOverride = isHexColor(hex) ? hex : null
  applyAccentColor(getEffectiveAccent())
}

/** Accent em uso agora. */
export function getEffectiveAccent(): string {
  return accentOverride ?? suiteAccent
}

/** Fundo global da suíte (convar `mri:backgroundColor`); vazio significa o DEFAULT_BACKGROUND. */
export function setSuiteBackground(hex: string | null | undefined): void {
  if (hex && !isHexColor(hex)) return
  suiteBackground = hex ?? ''
  applyBackgroundColor(getEffectiveBackground())
}

/** Override do fundo (painel /uiconfig); null ou vazio volta para o global. */
export function setBackgroundOverride(hex: string | null | undefined): void {
  backgroundOverride = isHexColor(hex) ? hex : null
  applyBackgroundColor(getEffectiveBackground())
}

/** Fundo em uso agora, sempre um hex. */
export function getEffectiveBackground(): string {
  return backgroundOverride ?? (isHexColor(suiteBackground) ? suiteBackground : DEFAULT_BACKGROUND)
}
