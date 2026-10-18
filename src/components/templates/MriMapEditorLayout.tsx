import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface MriMapEditorLayoutProps {
  /** Left column: the list of places, with its search. */
  list: ReactNode
  /** Middle column: usually an MriGameMap. */
  map: ReactNode
  /** Right column: the editor of the selected place. */
  detail: ReactNode
  className?: string
}

/**
 * The three columns every MRI panel with a map uses: list, map, editor.
 * The widths are fixed on purpose, so elevators, blips and garages look the same.
 */
export function MriMapEditorLayout({ list, map, detail, className }: MriMapEditorLayoutProps) {
  return (
    <div className={cn('grid min-h-0 flex-1 grid-cols-[300px_minmax(0,1fr)_460px]', className)}>
      <nav className="min-h-0 overflow-hidden border-r border-border">{list}</nav>
      <main className="relative min-h-0 min-w-0">{map}</main>
      <aside className="min-h-0 overflow-hidden border-l border-border">{detail}</aside>
    </div>
  )
}
