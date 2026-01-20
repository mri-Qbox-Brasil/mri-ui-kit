import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export function MriModal({ children, onClose, className }: { children: React.ReactNode; onClose?: () => void; className?: string }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // mark body when modal is open so global handlers can ignore Esc
  useEffect(() => {
    try {
      document.body.dataset.psModalOpen = 'true'
    } catch {}
    return () => {
      try {
        delete document.body.dataset.psModalOpen
      } catch {}
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div
        className={cn(
            "relative w-full max-w-sm transform rounded-xl bg-card border border-border p-6 shadow-2xl transition-all", // Changed to max-w-sm (24rem / 384px) for tighter look
            "animate-in fade-in zoom-in-95 duration-200",
            className
        )}
      >
        {children}
      </div>
    </div>
  )
}
