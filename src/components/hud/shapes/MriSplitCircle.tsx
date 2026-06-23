import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

function generateOffsetprogress(
  progressbarCircumference: number,
  currentProgress: number,
  currentDashes: number,
  currentGap: number
): string {
  const progressCircumference =
    progressbarCircumference - ((100 - currentProgress) / 100) * progressbarCircumference
  let currentCircumference = 0
  let dashArray = `0 ${Math.floor(currentGap / 2)}`
  const newCircumference = progressbarCircumference - currentDashes * currentGap
  const circumferencePiece = newCircumference / currentDashes

  if (progressCircumference < currentGap) {
    return `0 ${progressbarCircumference}`
  }

  while (currentCircumference <= progressCircumference) {
    if (currentCircumference + circumferencePiece >= progressCircumference) {
      const partialPiece = progressCircumference - currentCircumference
      if (partialPiece < 0.1) break
      dashArray += ` ${partialPiece} ${progressbarCircumference}`
      return dashArray
    }
    dashArray += ` ${circumferencePiece} ${currentGap}`
    currentCircumference += circumferencePiece + currentGap
  }

  const lastSpace = dashArray.lastIndexOf(" ")
  dashArray = dashArray.substring(0, lastSpace)
  dashArray += ` ${progressbarCircumference}`
  return dashArray
}

export type MriSplitCircleProps = MriShapeProps

/**
 * Anel circular segmentado (notched) — progresso renderizado em N tracos
 * (`dashes`) separados por `gap`. Apresentacional puro.
 */
export const MriSplitCircle = React.forwardRef<SVGSVGElement, MriSplitCircleProps>(
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
      innerColor = "#212121",
      outlineColor = "currentColor",
      outlineContrast = 100,
      outlineDropShadowAmount = 0,
      progressColor = "currentColor",
      progressContrast = 100,
      progressDropShadowAmount = 0,
      progressValue = 100,
      ringSize = 4,
      borderGap = 0.8,
      dashes = 8,
      gap = 4,
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
    },
    ref
  ) => {
    const radius = Math.max(height, width) / 2
    const normalizedRadius = radius - ringSize / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const progressbarRadius = normalizedRadius * borderGap
    const progressbarCircumference = circumference * borderGap

    const strokeDasharray = generateOffsetprogress(
      progressbarCircumference,
      progressValue,
      dashes,
      gap
    )
    const outlineStrokeDashArray = generateOffsetprogress(
      progressbarCircumference,
      100,
      dashes,
      gap
    )

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${radius} ${radius})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

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
            r={normalizedRadius + 3}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
          />
          <circle
            fill="transparent"
            stroke={outlineColor}
            strokeDasharray={outlineStrokeDashArray}
            strokeWidth={ringSize}
            r={progressbarRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
            style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
          />
          <circle
            stroke={progressColor}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeWidth={ringSize}
            r={progressbarRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
            style={{ filter: makeFilter(progressDropShadowAmount, progressColor, progressContrast) }}
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
MriSplitCircle.displayName = "MriSplitCircle"
