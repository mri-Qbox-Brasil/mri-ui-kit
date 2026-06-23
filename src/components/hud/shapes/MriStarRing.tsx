import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

const STAR_PATH =
  "M19 1l-5.545 11.236L1 13.819l9 8.776L7.91 37 19 30.764 30.09 37 28 22.595l9-8.776-12.455-1.583z"

export type MriStarRingProps = MriShapeProps

/**
 * Anel de progresso em formato de estrela (segue o contorno do path) com
 * icone central opcional. Apresentacional puro.
 */
export const MriStarRing = React.forwardRef<SVGSVGElement, MriStarRingProps>(
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
    const cx = 19,
      cy = 19
    // Normaliza o stroke (viewBox 38x40 escalado ate width/height) pra borda
    // renderizar ~ringSize px, consistente com as demais shapes.
    const strokeW = ringSize / Math.min(width / 38, height / 40)
    const uid = React.useId()
    const clipId = `star-clip-${uid}`

    const gTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${cx} ${cy})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <svg ref={ref} width={width} height={height} viewBox="0 0 38 40" overflow="visible">
        <defs>
          <clipPath id={clipId}>
            <path d={STAR_PATH} />
          </clipPath>
        </defs>
        <g transform={gTransform}>
          <rect width="38" height="40" fill={innerColor} clipPath={`url(#${clipId})`} />
          {displayOutline && pathLength > 0 && (
            <path
              d={STAR_PATH}
              fill="transparent"
              stroke={outlineColor}
              strokeWidth={strokeW}
              strokeLinejoin="round"
              strokeDasharray={`${pathLength} ${pathLength}`}
              strokeDashoffset={0}
              style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
            />
          )}
          <path
            ref={pathRef}
            d={STAR_PATH}
            stroke={progressColor}
            strokeWidth={strokeW}
            strokeLinejoin="round"
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
MriStarRing.displayName = "MriStarRing"
