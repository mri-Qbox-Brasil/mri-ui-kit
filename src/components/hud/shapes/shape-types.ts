/**
 * Tipos compartilhados das HUD shapes (gauges/rings/bars SVG da suite MRI).
 *
 * As shapes sao 100% apresentacionais: recebem dados (valor de progresso,
 * cores, dimensoes) e renderizam SVG puro. Nao tem store, nao tem FiveM,
 * nao tem localStorage — por isso vivem no kit e sao reusaveis em qualquer
 * HUD/painel.
 */

/**
 * Descricao de um glyph SVG independente de biblioteca de icones.
 *
 * O kit NAO depende de FontAwesome: as shapes recebem o icone ja reduzido a
 * `viewBox` + `paths`. Consumidores convertem o que usam no ponto de uso
 * (ex: na HUD, um adapter `faToMri(IconDefinition)` le `icon.icon[0/1/4]`;
 * lucide expoe `iconNode`). Veja `MriShapeIcon`.
 */
export interface MriSvgIcon {
  /** `[largura, altura]` do viewBox original do glyph. */
  viewBox: readonly [number, number]
  /** String(s) do atributo `d` do(s) `<path>` do glyph. */
  paths: string | string[]
}

/** Identificadores de cada shape, usados pelo dispatcher `MriMetaShape`. */
export type MriShapeKind =
  | "badge"
  | "circle-ring"
  | "circle-fill"
  | "diamond-ring"
  | "hexagon-ring"
  | "horizontal-bar"
  | "icon-percentage"
  | "inner-circle"
  | "partial-circle-ring"
  | "pill-ring"
  | "split-circle"
  | "square-fill"
  | "square-ring"
  | "star-ring"
  | "triangle-ring"

/**
 * Props comuns a todas as shapes. Campos especificos de uma geometria
 * (ex: `dashes`/`gap` do split-circle, `barHeight` do horizontal-bar) ficam
 * achatados aqui como opcionais — sem hierarquia de classes, ao estilo do kit.
 *
 * Convencao de cor: defaults usam `currentColor` para que a shape herde a cor
 * do contexto e seja tematizavel; na pratica o consumidor passa cores reais
 * (dados do HUD). `innerColor` (fundo) tem um neutro escuro como fallback.
 */
export interface MriShapeProps {
  displayOutline?: boolean
  height?: number
  width?: number
  icon?: MriSvgIcon | null
  iconColor?: string
  iconContrast?: number
  iconDropShadowAmount?: number
  iconRotateDegree?: number
  iconScaling?: number
  iconTranslateX?: number
  iconTranslateY?: number
  innerColor?: string
  /** Rotulo opcional, usado por algumas shapes para gerar ids de clip-path. */
  name?: string
  outlineColor?: string
  outlineContrast?: number
  outlineDropShadowAmount?: number
  progressColor?: string
  progressContrast?: number
  progressDropShadowAmount?: number
  /** Valor de progresso 0–100. */
  progressValue?: number
  ringSize?: number
  borderGap?: number
  borderSize?: number
  rotateDegree?: number
  translateX?: number
  translateY?: number
  dashes?: number
  gap?: number
  xAxisRound?: number
  yAxisRound?: number
  barHeight?: number
}
