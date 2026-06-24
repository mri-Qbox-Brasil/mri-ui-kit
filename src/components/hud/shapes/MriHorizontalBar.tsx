import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

export type MriHorizontalBarProps = MriShapeProps

/**
 * Barra de progresso horizontal com borda e icone central opcional.
 * Apresentacional puro.
 */
export const MriHorizontalBar = React.forwardRef<HTMLDivElement, MriHorizontalBarProps>(
  (
    {
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.45,
      iconTranslateX = 0,
      iconTranslateY = 0,
      outlineColor = "currentColor",
      outlineContrast = 100,
      outlineDropShadowAmount = 0,
      progressColor = "currentColor",
      progressContrast = 100,
      progressDropShadowAmount = 0,
      progressValue = 100,
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
    },
    ref
  ) => {
    const strokeDashoffset = width - (progressValue / 100) * width

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${height / 2} ${width / 4})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <div ref={ref} className="border-4 border-black relative">
        <svg height={height - 8} width={width}>
          <g transform={gTransform}>
            <line
              stroke={outlineColor}
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              strokeWidth={height - 8}
              style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
            />
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke={progressColor}
              fill="transparent"
              strokeDasharray={width}
              strokeDashoffset={strokeDashoffset}
              strokeWidth={height - 8}
              style={{
                transition: "stroke-dashoffset 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
                filter: makeFilter(progressDropShadowAmount, progressColor, progressContrast),
              }}
            />
          </g>
          {icon && (
            <g
              dominantBaseline="middle"
              style={{ filter: makeFilter(iconDropShadowAmount, iconColor, iconContrast) }}
            >
              <MriShapeIcon
                icon={icon}
                cx={width / 2}
                cy={(height - 8) / 2}
                scaling={iconScaling}
                color={iconColor}
                translateX={iconTranslateX}
                translateY={iconTranslateY}
              />
            </g>
          )}
        </svg>
      </div>
    )
  }
)
MriHorizontalBar.displayName = "MriHorizontalBar"
