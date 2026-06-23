import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"

export type MriBadgeShapeProps = MriShapeProps

/**
 * Shape "badge" da HUD: icone no topo + barra horizontal arredondada de
 * progresso. Apresentacional puro.
 *
 * Nome `MriBadgeShape` (e nao `MriBadge`) para nao colidir com o atom
 * `MriBadge` (chip de rotulo) do kit — sao componentes diferentes.
 */
export const MriBadgeShape = React.forwardRef<HTMLDivElement, MriBadgeShapeProps>(
  (
    {
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.45,
      innerColor = "#212121",
      outlineColor = "currentColor",
      outlineContrast = 100,
      outlineDropShadowAmount = 0,
      progressColor = "currentColor",
      progressContrast = 100,
      progressDropShadowAmount = 0,
      progressValue = 100,
      translateX = 0,
      translateY = 0,
      xAxisRound = 5,
      yAxisRound = 20,
    },
    ref
  ) => {
    // Dimensoes proporcionais a `height`/`width` para o badge caber no mesmo
    // envelope das outras shapes (antes a barra usava `height` inteiro + icone
    // + padding fixo, ficando ~2.6x maior que um circle-ring de mesmo config).
    const pad = height * 0.07
    const iconSize = height * iconScaling
    const gap = height * 0.09
    const barH = height * 0.22
    const barW = width - 2 * pad
    const progressWidth = (progressValue / 100) * barW
    const barRx = Math.min(xAxisRound, barH / 2)
    const barRy = Math.min(yAxisRound, barH / 2)

    const svgTransform =
      translateX || translateY ? `translate(${translateX} ${translateY})` : undefined

    return (
      <div
        ref={ref}
        style={{
          width,
          padding: pad,
          borderRadius: height * 0.16,
          backgroundColor: innerColor,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          transform: svgTransform,
        }}
      >
        {icon && (
          <div
            style={{
              marginBottom: gap,
              filter: makeFilter(iconDropShadowAmount, iconColor, iconContrast),
            }}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox={`0 0 ${icon.viewBox[0]} ${icon.viewBox[1]}`}
              style={{ display: "block", fill: iconColor }}
            >
              {Array.isArray(icon.paths) ? (
                icon.paths.map((d, i) => <path key={i} d={d} fill={iconColor} />)
              ) : (
                <path d={icon.paths} fill={iconColor} />
              )}
            </svg>
          </div>
        )}
        <svg width={barW} height={barH} overflow="visible" style={{ display: "block" }}>
          <rect
            width={barW}
            height={barH}
            fill={outlineColor}
            rx={barRx}
            ry={barRy}
            style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
          />
          <rect
            width={progressWidth}
            height={barH}
            fill={progressColor}
            rx={barRx}
            ry={barRy}
            style={{
              transition: "width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
              filter: makeFilter(progressDropShadowAmount, progressColor, progressContrast),
            }}
          />
        </svg>
      </div>
    )
  }
)
MriBadgeShape.displayName = "MriBadgeShape"
