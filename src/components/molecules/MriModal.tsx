import * as React from 'react'
import { useEffect } from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from '@/lib/utils'

export function MriModal({ children, onClose, className }: { children: React.ReactNode; onClose?: () => void; className?: string }) {
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
    <DialogPrimitive.Root open onOpenChange={(open) => {
      if (!open) onClose?.()
    }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl outline-none",
            className
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
