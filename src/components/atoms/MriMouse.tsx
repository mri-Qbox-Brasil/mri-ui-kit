import * as React from "react"

import { cn } from "@/lib/utils"

export type MriMouseButton =
  | "left"
  | "right"
  | "middle"
  | "scroll"
  | "scroll-up"
  | "scroll-down"

export interface MriMouseProps extends React.SVGProps<SVGSVGElement> {
  button?: MriMouseButton
}

const LABEL: Record<MriMouseButton, string> = {
  left: "Botão esquerdo do mouse",
  right: "Botão direito do mouse",
  middle: "Botão do meio do mouse",
  scroll: "Roda do mouse",
  "scroll-up": "Rolar para cima",
  "scroll-down": "Rolar para baixo",
}

function MriMouse({ button, className, ...props }: MriMouseProps) {
  const id = React.useId()
  const left = button === "left"
  const right = button === "right"
  const wheelActive =
    button === "middle" ||
    button === "scroll" ||
    button === "scroll-up" ||
    button === "scroll-down"

  return (
    <svg
      viewBox="0 0 20 28"
      role="img"
      aria-label={button ? LABEL[button] : "Mouse"}
      className={cn("inline-block align-middle h-[1.6em] aspect-[5/7] shrink-0", className)}
      {...props}
    >
      <defs>
        <clipPath id={id}>
          <rect x="2.5" y="1" width="15" height="26" rx="7" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id})`}>
        {left && <rect x="0" y="0" width="10" height="11" className="fill-primary" />}
        {right && <rect x="10" y="0" width="10" height="11" className="fill-primary" />}
      </g>

      <rect
        x="2.5"
        y="1"
        width="15"
        height="26"
        rx="7"
        className="fill-none stroke-foreground/50"
        strokeWidth="1.3"
      />
      <line x1="10" y1="1.5" x2="10" y2="11" className="stroke-foreground/40" strokeWidth="1" />
      <line x1="3.2" y1="11" x2="16.8" y2="11" className="stroke-foreground/25" strokeWidth="1" />

      <rect
        x="9"
        y="4"
        width="2"
        height="4.5"
        rx="1"
        className={wheelActive ? "fill-primary" : "fill-foreground/60"}
      />

      {button === "scroll-up" && (
        <path
          d="M8 2.6 L10 1 L12 2.6"
          className="fill-none stroke-primary"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {button === "scroll-down" && (
        <path
          d="M8 9.9 L10 11.5 L12 9.9"
          className="fill-none stroke-primary"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export { MriMouse }
