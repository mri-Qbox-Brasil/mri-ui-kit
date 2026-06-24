import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

export type MriCircleRingProps = MriShapeProps

/**
 * Anel circular de progresso com icone central opcional. Shape base da HUD
 * MRI (status de player, gauges). Apresentacional puro: passe `progressValue`
 * (0–100) e cores; o anel anima a transicao via CSS.
 *
 * ```tsx
 * <MriCircleRing progressValue={72} progressColor="#00E699" icon={heartIcon} />
 * ```
 */
export const MriCircleRing = React.forwardRef<SVGSVGElement, MriCircleRingProps>(
  (
    {
      displayOutline = true,
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.4,
      iconTranslateX = 0,
      iconTranslateY = 0,
      innerColor = "#212121",
      outlineColor = "currentColor",
      outlineContrast = 100,
      outlineDropShadowAmount = 0,
      progressColor = "currentColor",
      progressContrast = 100,
      progressDropShadowAmount = 0,
      progressValue = 100,
      ringSize = 4,
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
    },
    ref
  ) => {
    const radius = Math.max(height, width) / 2
    const normalizedRadius = radius - ringSize / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (progressValue / 100) * circumference

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${radius} ${radius})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    const innerRadius = normalizedRadius - ringSize / 2 + 0.1

    return (
      <svg
        ref={ref}
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        overflow="visible"
      >
        <g transform={gTransform}>
          <circle
            fill={innerColor}
            stroke="transparent"
            strokeDashoffset={0}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={ringSize - 0.6}
            r={innerRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
          />
          {displayOutline && (
            <circle
              fill="transparent"
              stroke={outlineColor}
              strokeDashoffset={0}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeWidth={ringSize}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90, ${radius}, ${radius})`}
              style={{
                filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast),
              }}
            />
          )}
          <circle
            stroke={progressColor}
            fill="transparent"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={ringSize}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
            style={{
              transition: "stroke-dashoffset 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)",
              filter: makeFilter(progressDropShadowAmount, progressColor, progressContrast),
            }}
          />
        </g>
        {icon && (
          <g
            style={{
              filter: makeFilter(iconDropShadowAmount, iconColor, iconContrast),
            }}
          >
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
MriCircleRing.displayName = "MriCircleRing"
