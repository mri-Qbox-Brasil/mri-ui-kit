import * as React from "react"
import { Modal } from '@/components/ui/Modal'
import { X } from 'lucide-react'

export function Dialog({ title, children, onClose, className }: { title?: string; children: React.ReactNode; onClose?: () => void; className?: string }) {
  return (
    <Modal onClose={onClose} className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
        </button>
      </div>
      <div>{children}</div>
    </Modal>
  )
}
