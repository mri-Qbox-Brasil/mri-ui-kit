import * as React from "react"
import type { MriShapeProps } from "./shape-types"

export interface MriPartialCircleRingProps extends MriShapeProps {
  innerColorOpacity?: number
  outlineColorOpacity?: number
  /** Fracao da circunferencia usada como arco (ex: 75 = 3/4 de volta). */
  maxLengthDisplay?: number
  maxProgressValue?: number
  showInnerBG?: boolean
  /** Numero exibido no centro, animado (tween) quando muda. */
  displayNumber?: number
  text?: string
}

/**
 * Anel de progresso parcial (arco) com numero central animado e rotulo —
 * usado em gauges de veiculo. Apresentacional puro.
 */
export const MriPartialCircleRing = React.forwardRef<SVGSVGElement, MriPartialCircleRingProps>(
  (
    {
      displayOutline = true,
      height = 50,
      icon = null,
      iconColor = "currentColor",
      iconScaling = 0.45,
      iconTranslateX = 0,
      iconTranslateY = 0,
      innerColor = "#212121",
      innerColorOpacity = 1,
      outlineColor = "currentColor",
      outlineColorOpacity = 0.4,
      progressColor = "currentColor",
      progressValue = 100,
      ringSize = 4,
      rotateDegree = 0,
      translateX = 0,
      translateY = 0,
      maxLengthDisplay = 100,
      maxProgressValue = 100,
      showInnerBG = false,
      displayNumber = 0,
      text = "",
    },
    ref
  ) => {
    const radius = height / 2
    const normalizedRadius = radius - ringSize / 2
    const circumference = normalizedRadius * 2 * Math.PI

    const clampedValue = Math.min(progressValue, maxProgressValue)
    const transposeValue = (clampedValue / maxProgressValue) * 100

    // Tween the progress circle via CSS transition
    const dashoffset =
      circumference - ((transposeValue / (100 / maxLengthDisplay)) / 100) * circumference
    const outlineDashoffset = circumference - (maxLengthDisplay / 100) * circumference

    // Tween the display number
    const [tweenedNumber, setTweenedNumber] = React.useState(displayNumber)
    const tweenRef = React.useRef<{ from: number; to: number; start: number; raf: number }>({
      from: displayNumber,
      to: displayNumber,
      start: 0,
      raf: 0,
    })

    React.useEffect(() => {
      const t = tweenRef.current
      cancelAnimationFrame(t.raf)
      t.from = tweenedNumber
      t.to = displayNumber
      t.start = performance.now()
      const duration = 600
      function tick(now: number) {
        const elapsed = now - t.start
        const p = Math.min(elapsed / duration, 1)
        setTweenedNumber(t.from + (t.to - t.from) * p)
        if (p < 1) t.raf = requestAnimationFrame(tick)
      }
      t.raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(t.raf)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayNumber])

    const transform = [
      rotateDegree > 0 ? `rotate(${rotateDegree} ${radius} ${radius})` : "",
      `translate(${translateX} ${translateY})`,
    ]
      .filter(Boolean)
      .join(" ")

    // Icon path rendering inside SVG (glyph generico — sem FontAwesome)
    let iconPathData: string | string[] | null = null
    let iconViewBox = [0, 0, 512, 512]
    if (icon) {
      iconViewBox = [0, 0, icon.viewBox[0], icon.viewBox[1]]
      iconPathData = icon.paths
    }

    const iconSize = radius * 2 * iconScaling
    const iconX = radius - iconSize / 2 + iconTranslateX
    const iconY = radius - iconSize / 2 + iconTranslateY
    const [vbX, vbY, vbW, vbH] = iconViewBox

    return (
      <svg
        ref={ref}
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        overflow="visible"
      >
        <g transform={transform}>
          {displayOutline && (
            <circle
              opacity={outlineColorOpacity}
              fill="transparent"
              stroke={outlineColor}
              strokeDashoffset={outlineDashoffset}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeWidth={ringSize}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90, ${radius}, ${radius})`}
            />
          )}
          {showInnerBG && (
            <circle
              fill={innerColor}
              fillOpacity={innerColorOpacity}
              stroke="transparent"
              strokeWidth={ringSize - 0.6}
              r={normalizedRadius - ringSize / 2 + 0.1}
              cx={radius}
              cy={radius}
            />
          )}
          <circle
            stroke={progressColor}
            fill="transparent"
            strokeDashoffset={dashoffset}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeWidth={ringSize}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
            style={{ transition: "stroke-dashoffset 0.6s linear" }}
          />
        </g>

        {text && (
          <>
            <text
              className="vehicle-number"
              fill="white"
              x="50%"
              y="45%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {Math.floor(tweenedNumber)}
            </text>
            <text
              className="vehicle-text"
              fill="white"
              x="50%"
              y="70%"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {text}
            </text>
          </>
        )}

        {iconPathData && (
          <svg
            x={iconX}
            y={iconY}
            width={iconSize}
            height={iconSize}
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
          >
            {Array.isArray(iconPathData) ? (
              iconPathData.map((d, i) => <path key={i} d={d} fill={iconColor} />)
            ) : (
              <path d={iconPathData as string} fill={iconColor} />
            )}
          </svg>
        )}
      </svg>
    )
  }
)
MriPartialCircleRing.displayName = "MriPartialCircleRing"
