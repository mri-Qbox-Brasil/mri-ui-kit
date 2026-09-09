import type { ReactNode } from 'react'
import { renderMriIcon, type MriIconProp } from '../../lib/icon'
import { cn } from '../../lib/utils'

export interface MriSectionHeaderProps {
  icon: MriIconProp
  title: string
  /**
   * Hierarquia visual:
   * - `label` (default): rotulo miudo em caixa alta e muted — o look do ox_lib,
   *   pra separar blocos dentro de um card/painel.
   * - `title`: titulo de verdade, no tamanho e peso do conteudo. Use quando a
   *   secao encabeca a pagina, nao um bloco interno.
   */
  variant?: 'label' | 'title'
  /** Linha de apoio abaixo do titulo. */
  description?: ReactNode
  /** Acoes alinhadas a direita (botao, switch, contador). */
  children?: ReactNode
  className?: string
}

const VARIANTS = {
  label: {
    heading: 'text-muted-foreground text-xs font-bold uppercase tracking-widest',
    icon: 'w-3.5 h-3.5',
  },
  title: {
    heading: 'text-foreground text-lg font-bold tracking-tight',
    icon: 'w-5 h-5 text-primary',
  },
} as const

/**
 * Cabecalho de secao. Por padrao renderiza so o `<h3>` — sem wrapper — pra nao
 * mexer no fluxo de quem ja usa; ganha um bloco com linha de acoes assim que
 * `description` ou `children` aparecem.
 *
 * ```tsx
 * <MriSectionHeader icon={Users} title="Jogadores online" variant="title" description="Atualiza a cada 5s">
 *   <MriButton size="sm">Atualizar</MriButton>
 * </MriSectionHeader>
 * ```
 */
export function MriSectionHeader({
  icon,
  title,
  variant = 'label',
  description,
  children,
  className,
}: MriSectionHeaderProps) {
  const v = VARIANTS[variant]
  const hasDescription = description != null && description !== ''
  const iconEl = renderMriIcon(icon, cn(v.icon, 'shrink-0'))

  // Caminho simples: mesmo elemento raiz (e mesma margem) da versao anterior.
  if (!hasDescription && !children) {
    return (
      <h3 className={cn(v.heading, 'mb-3 flex items-center gap-2', className)}>
        {iconEl} {title}
      </h3>
    )
  }

  const heading = (
    <h3 className={cn(v.heading, 'flex items-center gap-2')}>
      {iconEl} {title}
    </h3>
  )

  return (
    <div className={cn('mb-3 flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        {heading}
        {hasDescription && (
          <p className={cn('text-muted-foreground mt-1', variant === 'title' ? 'text-sm' : 'text-xs normal-case tracking-normal font-normal')}>
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  )
}
