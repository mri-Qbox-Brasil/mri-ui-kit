import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MriTextarea } from './MriTextarea'

const meta: Meta<typeof MriTextarea> = {
    title: 'Atoms/MriTextarea',
    component: MriTextarea,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Controlled = ({ resize, hint, error, placeholder }: {
    resize?: 'auto' | 'vertical' | 'none'
    hint?: string
    error?: string
    placeholder?: string
}) => {
    const [value, setValue] = useState('')
    return (
        <div className="w-96">
            <MriTextarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                resize={resize}
                hint={hint}
                error={error}
                placeholder={placeholder}
            />
        </div>
    )
}

export const Default: StoryObj<typeof MriTextarea> = {
    render: () => <Controlled placeholder="Descreva a ação..." />,
}

export const WithHint: StoryObj<typeof MriTextarea> = {
    render: () => <Controlled placeholder="Mensagem de boas-vindas" hint="Aparece ao logar. Markdown ok." />,
}

export const WithError: StoryObj<typeof MriTextarea> = {
    render: () => <Controlled placeholder="Texto" error="Mínimo 10 caracteres" />,
}

export const AutoResize: StoryObj<typeof MriTextarea> = {
    render: () => <Controlled resize="auto" placeholder="Cresce conforme você digita..." hint="Sem scrollbar interno." />,
}

export const NonResizable: StoryObj<typeof MriTextarea> = {
    render: () => <Controlled resize="none" placeholder="Tamanho travado." />,
}
