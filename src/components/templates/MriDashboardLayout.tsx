import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type MriDashboardSidebarPosition = 'left' | 'right'
export type MriDashboardTopbarPlacement = 'aside' | 'below'

export interface MriDashboardLayoutProps {
    sidebar?: ReactNode
    topbar?: ReactNode
    header?: ReactNode
    footer?: ReactNode
    children?: ReactNode
    sidebarPosition?: MriDashboardSidebarPosition
    topbarPlacement?: MriDashboardTopbarPlacement
    className?: string
    contentClassName?: string
    mainClassName?: string
}

export function MriDashboardLayout({
    sidebar,
    topbar,
    header,
    footer,
    children,
    sidebarPosition = 'left',
    topbarPlacement = 'aside',
    className,
    contentClassName,
    mainClassName,
}: MriDashboardLayoutProps) {
    const sidebarSlot = sidebar ? (
        <aside className="shrink-0 h-full">{sidebar}</aside>
    ) : null

    const contentColumn = (
        <div className={cn('flex-1 flex flex-col min-w-0 h-full', contentClassName)}>
            {topbarPlacement === 'aside' && topbar}
            {header}
            <main className={cn('flex-1 overflow-y-auto bg-background text-foreground', mainClassName)}>
                {children}
            </main>
            {footer && (
                <footer className="shrink-0 border-t border-border bg-card">
                    {footer}
                </footer>
            )}
        </div>
    )

    const body = (
        <div className="flex-1 flex min-h-0">
            {sidebarPosition === 'left' && sidebarSlot}
            {contentColumn}
            {sidebarPosition === 'right' && sidebarSlot}
        </div>
    )

    return (
        <div className={cn('h-screen w-full flex flex-col bg-background text-foreground overflow-hidden', className)}>
            {topbarPlacement === 'below' && topbar}
            {body}
        </div>
    )
}
