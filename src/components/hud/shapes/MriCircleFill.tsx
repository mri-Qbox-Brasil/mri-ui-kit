import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

export type MriCircleFillProps = MriShapeProps

/**
 * Circulo preenchido de baixo para cima conforme o progresso, com borda e
 * icone central opcional. Apresentacional puro.
 */
export const MriCircleFill = React.forwardRef<SVGSVGElement, MriCircleFillProps>(
  (
    {
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.4,
      iconTranslateX = 0,
      iconTranslateY = 1,
      progressColor = "currentColor",
      progressContrast = 100,
      progressDropShadowAmount = 0,
      progressValue = 100,
      borderSize = 4,
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
      name = "icon",
    },
    ref
  ) => {
    const minimumAxis = Math.max(height, width)
    const radius = minimumAxis / 2
    const stroke = radius
    const normalizedRadius = radius - stroke / 2

    const strokeDashoffset = minimumAxis - (progressValue / 100) * minimumAxis

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${radius} ${height / 4})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    const clipId = `${name || "icon"}-cut-out-circle`

    return (
      <svg
        ref={ref}
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        overflow="visible"
      >
        <defs>
          <clipPath id={clipId}>
            <circle strokeWidth={stroke} r={radius} cx={radius} cy={radius} />
          </clipPath>
        </defs>
        <g transform={gTransform}>
          <circle
            stroke="black"
            fill="transparent"
            strokeWidth={borderSize}
            r={normalizedRadius * 2 + borderSize / 2}
            cx={radius}
            cy={radius}
            shapeRendering="geometricPrecision"
          />
          <line
            x1="50%"
            y1="100%"
            x2="50%"
            y2="0%"
            stroke={progressColor}
            strokeDasharray={minimumAxis}
            strokeDashoffset={strokeDashoffset}
            strokeWidth={minimumAxis}
            clipPath={`url(#${clipId})`}
            shapeRendering="geometricPrecision"
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
              filter: makeFilter(progressDropShadowAmount, progressColor, progressContrast),
            }}
          />
        </g>
        {icon && (
          <g style={{ filter: makeFilter(iconDropShadowAmount, iconColor, iconContrast) }}>
            <MriShapeIcon
              icon={icon}
              cx={radius}
              cy={radius}
              scaling={iconScaling}
              color={iconColor}
              translateX={iconTranslateX}
              translateY={iconTranslateY}
            />
          </g>
        )}
      </svg>
    )
  }
)
MriCircleFill.displayName = "MriCircleFill"
