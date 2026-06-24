import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

const TRI_PATH =
  "M21.87,19.29,13.13,4.14a1.29,1.29,0,0,0-2.26,0L2.13,19.29a1.27,1.27,0,0,0,1.13,1.86H20.74A1.27,1.27,0,0,0,21.87,19.29Z"

export type MriTriangleRingProps = MriShapeProps

/**
 * Anel de progresso em formato de triangulo (segue o contorno do path) com
 * icone central opcional. Apresentacional puro.
 */
export const MriTriangleRing = React.forwardRef<SVGSVGElement, MriTriangleRingProps>(
  (
    {
      displayOutline = true,
      height = 50,
      width = 50,
      icon = null,
      iconColor = "currentColor",
      iconContrast = 100,
      iconDropShadowAmount = 0,
      iconScaling = 0.35,
      iconTranslateX = 0,
      iconTranslateY = 3,
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
    const cx = 12,
      cy = 12
    // Normaliza o stroke (viewBox 24x24 escalado ate width/height) pra borda
    // renderizar ~ringSize px, consistente com as demais shapes.
    const strokeW = ringSize / Math.min(width / 24, height / 24)

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${cx} ${cy})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <svg ref={ref} width={width} height={height} viewBox="0 0 24 24" overflow="visible">
        <g transform={gTransform}>
          <path d={TRI_PATH} fill={innerColor} stroke="transparent" />
          {displayOutline && pathLength > 0 && (
            <path
              d={TRI_PATH}
              fill="transparent"
              stroke={outlineColor}
              strokeWidth={strokeW}
              strokeDasharray={`${pathLength} ${pathLength}`}
              strokeDashoffset={0}
              style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
            />
          )}
          <path
            ref={pathRef}
            d={TRI_PATH}
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
    )
  }
)
MriTriangleRing.displayName = "MriTriangleRing"
