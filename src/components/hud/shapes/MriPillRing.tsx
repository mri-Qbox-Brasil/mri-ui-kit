import * as React from "react"
import type { MriShapeProps } from "./shape-types"
import { makeFilter } from "./shape-utils"
import { MriShapeIcon } from "./MriShapeIcon"

export type MriPillRingProps = MriShapeProps

/**
 * Anel de progresso em formato de pilula (retangulo vertical arredondado).
 * Apresentacional puro.
 */
export const MriPillRing = React.forwardRef<SVGSVGElement, MriPillRingProps>(
  (
    {
      displayOutline = true,
      height = 50,
      width = 20,
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
    const rx = width / 2
    // Perimetro do retangulo INTERNO (o que e de fato tracado): 2*(h-w) + pi*w
    // medido com largura interna (width - ringSize). Usar o perimetro externo
    // fazia o progresso nao fechar em 100% nem zerar direito.
    const perimeter = 2 * (height - width) + Math.PI * (width - ringSize)
    const strokeDashoffset = perimeter - (progressValue / 100) * perimeter
    const cx = width / 2
    const cy = height / 2

    const svgTransform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${cx} ${cy})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="visible">
        <g transform={svgTransform}>
          <rect x={0} y={0} width={width} height={height} rx={rx} ry={rx} fill={innerColor} />
          {displayOutline && (
            <rect
              x={ringSize / 2}
              y={ringSize / 2}
              width={width - ringSize}
              height={height - ringSize}
              rx={rx - ringSize / 2}
              ry={rx - ringSize / 2}
              fill="transparent"
              stroke={outlineColor}
              strokeWidth={ringSize}
              style={{ filter: makeFilter(outlineDropShadowAmount, outlineColor, outlineContrast) }}
            />
          )}
          <rect
            x={ringSize / 2}
            y={ringSize / 2}
            width={width - ringSize}
            height={height - ringSize}
            rx={rx - ringSize / 2}
            ry={rx - ringSize / 2}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={ringSize}
            strokeDasharray={`${perimeter} ${perimeter}`}
            strokeDashoffset={strokeDashoffset}
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
MriPillRing.displayName = "MriPillRing"
