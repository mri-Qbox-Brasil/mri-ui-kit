import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Users } from 'lucide-react'
import { MriExpandableSearch } from './MriExpandableSearch'
import { MriPageHeader } from '@/components/organisms/MriPageHeader'

const meta: Meta<typeof MriExpandableSearch> = {
    title: 'Molecules/MriExpandableSearch',
    component: MriExpandableSearch,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

const Controlled = () => {
    const [q, setQ] = useState('')
    return (
        <div className="w-[400px] flex items-center justify-end gap-2 p-4 border border-border rounded-lg bg-card">
            <span className="text-sm text-muted-foreground mr-auto">
                Clica no icone pra expandir
            </span>
            <MriExpandableSearch value={q} onChange={setQ} placeholder="Buscar..." />
        </div>
    )
}

export const Default: StoryObj<typeof MriExpandableSearch> = {
    render: () => <Controlled />,
}

const InHeader = () => {
    const [q, setQ] = useState('')
    return (
        <div className="w-[700px]">
            <MriPageHeader title="Jogadores" icon={Users} count={42} countLabel="online">
                <MriExpandableSearch value={q} onChange={setQ} placeholder="Buscar jogador..." />
            </MriPageHeader>
        </div>
    )
}

export const InsideHeader: StoryObj<typeof MriExpandableSearch> = {
    render: () => <InHeader />,
}

const PreFilled = () => {
    // Quando o parent ja vem com valor (ex: filtro via URL), expande automatic
    const [q, setQ] = useState('john')
    return (
        <div className="w-[400px] flex items-center justify-end p-4 border border-border rounded-lg bg-card">
            <MriExpandableSearch value={q} onChange={setQ} placeholder="Buscar..." />
        </div>
    )
}

export const PreFilled_: StoryObj<typeof MriExpandableSearch> = {
    render: () => <PreFilled />,
}

const CustomWidth = () => {
    const [q, setQ] = useState('')
    return (
        <div className="w-[700px] flex items-center justify-end p-4 border border-border rounded-lg bg-card">
            <MriExpandableSearch value={q} onChange={setQ} placeholder="Largura w-96..." expandedWidth="w-96" />
        </div>
    )
}

export const CustomExpandedWidth: StoryObj<typeof MriExpandableSearch> = {
    render: () => <CustomWidth />,
}
