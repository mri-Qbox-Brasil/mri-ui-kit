import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

const DIAMOND_PATH =
  "M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468z"

export type MriDiamondRingProps = MriShapeProps

/**
 * Anel de progresso em formato de diamante (segue o contorno do path) com
 * icone central opcional. Apresentacional puro.
 */
export const MriDiamondRing = React.forwardRef<HTMLDivElement, MriDiamondRingProps>(
  (
    {
      displayOutline = true,
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
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
    },
    ref
  ) => {
    const pathRef = React.useRef<SVGPathElement>(null)
    const [pathLength, setPathLength] = React.useState(0)

    React.useEffect(() => {
      if (pathRef.current) {
        try {
          setPathLength(pathRef.current.getTotalLength())
        } catch {}
      }
    }, [])

    const strokeDashoffset = pathLength - (progressValue / 100) * pathLength

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} 8 8)` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    const cx = 8
    const cy = 8

    // O path vive num viewBox 16x16 escalado ate width/height (~3.1x p/ 50px).
    // strokeWidth e em unidades do viewBox, entao normalizamos pra que a borda
    // renderize ~ringSize px (igual as shapes de viewBox grande), em vez de
    // ~ringSize*3 (que e o que acontecia na HUD original).
    const strokeW = ringSize / (Math.min(width, height) / 16)

    return (
      <div ref={ref} style={{ margin: "0 -7px" }}>
        <svg
          version="1.1"
          width={width}
          height={height}
          viewBox="0 0 16 16"
          transform="scale(-1,1)"
          overflow="visible"
        >
          <g transform={gTransform}>
            {displayOutline && pathLength > 0 && (
              <path
                d={DIAMOND_PATH}
                fill="transparent"
                stroke={outlineColor}
                strokeWidth={strokeW}
                strokeDasharray={`${pathLength} ${pathLength}`}
                strokeDashoffset={0}
                style={{
                  filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast),
                }}
              />
            )}
            <svg viewBox="-1.5 4.5 19 7">
              <path
                d={DIAMOND_PATH}
                strokeWidth={ringSize - 0.3}
                fill={innerColor}
                stroke="transparent"
              />
            </svg>
            <path
              ref={pathRef}
              d={DIAMOND_PATH}
              stroke={progressColor}
              strokeWidth={strokeW}
              fill="transparent"
              strokeDasharray={pathLength > 0 ? `${pathLength} ${pathLength}` : undefined}
              strokeDashoffset={pathLength > 0 ? strokeDashoffset : undefined}
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
                cx={cx}
                cy={cy}
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
MriDiamondRing.displayName = "MriDiamondRing"
