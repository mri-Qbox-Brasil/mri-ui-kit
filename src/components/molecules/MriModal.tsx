import * as React from 'react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from '@/lib/utils'

// Must match the closed-state duration below: onClose runs once the fade-out is over.
const EXIT_MS = 160

const MriModalCloseContext = React.createContext<(() => void) | null>(null)

/**
 * Closes the surrounding MriModal with its fade-out, then calls its onClose.
 * Buttons inside a modal should use this instead of unmounting it directly,
 * which cuts the modal without any exit animation.
 */
export function useMriModalClose(): () => void {
  const close = useContext(MriModalCloseContext)
  return close ?? (() => {})
}

/** Render prop with the animated close of the surrounding MriModal, for its own buttons. */
export function MriModalClose({ children }: { children: (close: () => void) => React.ReactNode }) {
  const close = useMriModalClose()
  return <>{children(close)}</>
}

export function MriModal({
  children,
  onClose,
  className,
  hideBlur = true,
  hideOverlay = false,
  isModal = true
}: {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  /** The backdrop blur is off by default: in the FiveM CEF it repaints the whole page every frame. */
  hideBlur?: boolean;
  hideOverlay?: boolean;
  isModal?: boolean;
}) {
  const [open, setOpen] = useState(true)
  const onCloseRef = useRef(onClose)
  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (open) return
    const id = setTimeout(() => onCloseRef.current?.(), EXIT_MS)
    return () => clearTimeout(id)
  }, [open])

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

  const requestClose = useCallback(() => setOpen(false), [])

  return (
    <MriModalCloseContext.Provider value={requestClose}>
    <DialogPrimitive.Root open={open} onOpenChange={(next) => {
      if (!next) requestClose()
    }} modal={isModal}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:duration-200 data-[state=open]:ease-out data-[state=closed]:duration-150 data-[state=closed]:ease-in",
            !hideOverlay && "bg-black/40",
            !hideBlur && "backdrop-blur-sm"
          )}
        />
        <DialogPrimitive.Content
          onPointerDownOutside={(e) => {
            // Prevent closing when clicking on a radix portal (like a popover/search results)
            if (e.target instanceof Element && e.target.closest('[data-radix-popper-content-wrapper]')) {
              e.preventDefault();
            }
          }}
          onFocusOutside={(e) => {
            // Prevent focus trap from blocking interactions with portal contents
            if (e.target instanceof Element && e.target.closest('[data-radix-popper-content-wrapper]')) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
             // General interaction outside (including scroll/wheel potentially)
             if (e.target instanceof Element && e.target.closest('[data-radix-popper-content-wrapper]')) {
              e.preventDefault();
            }
          }}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card mri-surface p-6 shadow-2xl rounded-xl outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-[0.97] data-[state=closed]:zoom-out-[0.97]",
            "data-[state=open]:duration-200 data-[state=open]:ease-out data-[state=closed]:duration-150 data-[state=closed]:ease-in",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">Modal</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">Modal content</DialogPrimitive.Description>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
    </MriModalCloseContext.Provider>
  )
}
