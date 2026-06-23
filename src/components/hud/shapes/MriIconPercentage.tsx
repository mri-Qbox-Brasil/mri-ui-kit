import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"

export type MriIconPercentageProps = MriShapeProps

/**
 * Icone empilhado sobre o valor de progresso em porcentagem.
 * Apresentacional puro.
 */
export const MriIconPercentage = React.forwardRef<HTMLDivElement, MriIconPercentageProps>(
  (
    {
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.45,
      progressColor = "currentColor",
      progressValue = 100,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: progressColor,
          fontSize: height,
          width,
          height,
        }}
      >
        {icon && (
          <svg
            width={width * iconScaling * 2}
            height={width * iconScaling * 2}
            viewBox={`0 0 ${icon.viewBox[0]} ${icon.viewBox[1]}`}
            style={{
              display: "block",
              fill: iconColor,
              filter: makeFilter(iconDropShadowAmount, iconColor, iconContrast),
            }}
          >
            {Array.isArray(icon.paths) ? (
              icon.paths.map((d, i) => <path key={i} d={d} fill={iconColor} />)
            ) : (
              <path d={icon.paths} fill={iconColor} />
            )}
          </svg>
        )}
        <span style={{ fontSize: height * 0.3, fontWeight: 700, color: progressColor }}>
          {Math.round(progressValue)}%
        </span>
      </div>
    )
  }
)
MriIconPercentage.displayName = "MriIconPercentage"
