import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

const MriTooltipProvider = TooltipPrimitive.Provider

const MriTooltip = TooltipPrimitive.Root

const MriTooltipTrigger = TooltipPrimitive.Trigger

const MriTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { portal?: boolean }
>(({ className, sideOffset = 6, portal = true, ...props }, ref) => {
  const content = (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[110] overflow-hidden rounded-md border border-border_primary bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md outline-none data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className
      )}
      {...props}
    />
  )

  if (!portal) return content

  return <TooltipPrimitive.Portal>{content}</TooltipPrimitive.Portal>
})
MriTooltipContent.displayName = TooltipPrimitive.Content.displayName

export interface MriSimpleTooltipProps {
  /** Conteudo do balao. Se vazio/undefined, o filho e renderizado sem tooltip. */
  content?: React.ReactNode
  children: React.ReactNode
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"]
  align?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["align"]
  sideOffset?: number
  /** Atraso ate abrir, em ms. Default: 200. */
  delayDuration?: number
  /** Mantido aberto (util pra depurar posicionamento). */
  open?: boolean
  className?: string
}

/**
 * Atalho pro caso comum: um gatilho, um texto. Ja embrulha o `Provider`, entao
 * funciona solto — sem precisar de um provider na raiz da app.
 *
 * Pra tooltips ricos (varios elementos, controle de estado) use as partes
 * `MriTooltip*` diretamente, com um unico `MriTooltipProvider` no topo.
 *
 * ```tsx
 * <MriSimpleTooltip content="Configurações" side="right">
 *   <button><Settings /></button>
 * </MriSimpleTooltip>
 * ```
 */
export function MriSimpleTooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 200,
  open,
  className,
}: MriSimpleTooltipProps) {
  if (content == null || content === "") return <>{children}</>

  return (
    <MriTooltipProvider delayDuration={delayDuration}>
      <MriTooltip open={open}>
        <MriTooltipTrigger asChild>{children}</MriTooltipTrigger>
        <MriTooltipContent side={side} align={align} sideOffset={sideOffset} className={className}>
          {content}
        </MriTooltipContent>
      </MriTooltip>
    </MriTooltipProvider>
  )
}

export { MriTooltip, MriTooltipTrigger, MriTooltipContent, MriTooltipProvider }
