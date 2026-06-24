import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

const HEX_PATH = "M21 2L3 12v10l18 10 18-10V12L21 2z"

export type MriHexagonRingProps = MriShapeProps

/**
 * Anel de progresso em formato de hexagono (segue o contorno do path) com
 * icone central opcional. Apresentacional puro.
 */
export const MriHexagonRing = React.forwardRef<SVGSVGElement, MriHexagonRingProps>(
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
      iconTranslateY = 0.7,
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
    // Centro real do HEX_PATH (x∈[3,39], y∈[2,32]).
    const cx = 21,
      cy = 17
    // Normaliza o stroke (viewBox 40x34 escalado ate width/height) pra borda
    // renderizar ~ringSize px, consistente com as demais shapes.
    const strokeW = ringSize / Math.min(width / 40, height / 34)

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${cx} ${cy})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    // viewBox cobre o path (x∈[3,39], y∈[2,32]) + margem pro ring; fundo,
    // contorno e progresso compartilham o mesmo espaco de coordenadas.
    return (
      <svg ref={ref} width={width} height={height} viewBox="1 0 40 34" overflow="visible">
        <g transform={gTransform}>
          <path d={HEX_PATH} fill={innerColor} stroke="transparent" />
          {displayOutline && pathLength > 0 && (
            <path
              d={HEX_PATH}
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
            d={HEX_PATH}
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
MriHexagonRing.displayName = "MriHexagonRing"
