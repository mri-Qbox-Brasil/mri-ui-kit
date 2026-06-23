import type { MriShapeKind, MriShapeProps } from "./shape-types"
import { MriBadgeShape } from "./MriBadgeShape"
import { MriCircleRing } from "./MriCircleRing"
import { MriCircleFill } from "./MriCircleFill"
import { MriDiamondRing } from "./MriDiamondRing"
import { MriHexagonRing } from "./MriHexagonRing"
import { MriHorizontalBar } from "./MriHorizontalBar"
import { MriIconPercentage } from "./MriIconPercentage"
import { MriInnerCircle } from "./MriInnerCircle"
import { MriPartialCircleRing } from "./MriPartialCircleRing"
import { MriPillRing } from "./MriPillRing"
import { MriSplitCircle } from "./MriSplitCircle"
import { MriSquareFill } from "./MriSquareFill"
import { MriSquareRing } from "./MriSquareRing"
import { MriStarRing } from "./MriStarRing"
import { MriTriangleRing } from "./MriTriangleRing"

export interface MriMetaShapeProps extends MriShapeProps {
  /** Qual shape renderizar. Default cai em `circle-ring`. */
  shape?: MriShapeKind
}

/**
 * Dispatcher: dado um `shape` (string `MriShapeKind`) + props comuns, renderiza
 * a shape correspondente. Conveniencia para quem escolhe a forma em runtime
 * (ex: HUD configuravel onde o jogador troca o formato do icone). Se preferir,
 * importe a shape concreta diretamente.
 */
export function MriMetaShape({ shape = "circle-ring", ...props }: MriMetaShapeProps) {
  switch (shape) {
    case "badge":
      return <MriBadgeShape {...props} />
    case "circle-fill":
      return <MriCircleFill {...props} />
    case "diamond-ring":
      return <MriDiamondRing {...props} />
    case "hexagon-ring":
      return <MriHexagonRing {...props} />
    case "horizontal-bar":
      return <MriHorizontalBar {...props} />
    case "icon-percentage":
      return <MriIconPercentage {...props} />
    case "inner-circle":
      return <MriInnerCircle {...props} />
    case "partial-circle-ring":
      return <MriPartialCircleRing {...props} />
    case "pill-ring":
      return <MriPillRing {...props} />
    case "split-circle":
      return <MriSplitCircle {...props} />
    case "square-fill":
      return <MriSquareFill {...props} />
    case "square-ring":
      return <MriSquareRing {...props} />
    case "star-ring":
      return <MriStarRing {...props} />
    case "triangle-ring":
      return <MriTriangleRing {...props} />
    case "circle-ring":
    default:
      return <MriCircleRing {...props} />
  }
}
MriMetaShape.displayName = "MriMetaShape"
