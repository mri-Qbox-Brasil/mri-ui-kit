import type { MriSvgIcon } from "./shape-types"

export interface MriShapeIconProps {
  /** Glyph a renderizar, ja reduzido a viewBox + paths (ver `MriSvgIcon`). */
  icon: MriSvgIcon
  /** Centro X da shape hospedeira (o icone e centralizado nele). */
  cx: number
  /** Centro Y da shape hospedeira. */
  cy: number
  /** Tamanho do icone como fracao do diametro (ex: 0.45 = 45%). */
  scaling: number
  /** Cor de preenchimento dos paths. */
  color: string
  translateX?: number
  translateY?: number
  /** `filter` CSS opcional (glow/contraste), tipicamente via `makeFilter`. */
  filter?: string
}

/**
 * Renderiza um glyph SVG centralizado dentro de uma shape, escalado e
 * posicionado pelo centro (`cx`/`cy`) da shape hospedeira. Substitui o antigo
 * `FaInSvg` da HUD, mas SEM acoplamento a FontAwesome: recebe um `MriSvgIcon`
 * generico (`{ viewBox, paths }`), entao funciona com qualquer fonte de
 * icones (FA, lucide, SVG custom) desde que o consumidor converta no ponto
 * de uso.
 */
export function MriShapeIcon({
  icon,
  cx,
  cy,
  scaling,
  color,
  translateX = 0,
  translateY = 0,
  filter,
}: MriShapeIconProps) {
  const [vbW, vbH] = icon.viewBox
  const size = cx * 2 * scaling
  const x = cx - size / 2 + translateX
  const y = cy - size / 2 + translateY
  const paths = Array.isArray(icon.paths) ? icon.paths : [icon.paths]

  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={filter ? { filter } : undefined}
      overflow="visible"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill={color} />
      ))}
    </svg>
  )
}
MriShapeIcon.displayName = "MriShapeIcon"
