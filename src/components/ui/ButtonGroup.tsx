import React from 'react'
import { Button } from './Button'

type Action = { icon?: React.ReactNode; label: string; onClick?: () => void; disabled?: boolean }

export default function ButtonGroup({ buttons }: { buttons: Action[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((b, i) => (
        <Button key={i} onClick={b.disabled ? undefined : b.onClick} className="flex items-center gap-2" variant="secondary" disabled={b.disabled}>
          {b.icon}
          <span>{b.label}</span>
        </Button>
      ))}
    </div>
  )
}
