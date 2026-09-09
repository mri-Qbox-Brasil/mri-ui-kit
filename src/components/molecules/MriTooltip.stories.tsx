import type { Meta, StoryObj } from '@storybook/react'
import { Settings, Trash2, Info } from 'lucide-react'
import { MriButton } from '@/components/atoms/MriButton'
import {
    MriSimpleTooltip,
    MriTooltip,
    MriTooltipProvider,
    MriTooltipTrigger,
    MriTooltipContent,
} from './MriTooltip'

const meta: Meta<typeof MriSimpleTooltip> = {
    title: 'Molecules/MriTooltip',
    component: MriSimpleTooltip,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
}

export default meta

export const Default: StoryObj<typeof MriSimpleTooltip> = {
    render: () => (
        <MriSimpleTooltip content="Configurações do servidor">
            <MriButton variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
            </MriButton>
        </MriSimpleTooltip>
    ),
}

export const Sides: StoryObj<typeof MriSimpleTooltip> = {
    render: () => (
        <div className="grid grid-cols-2 gap-6 p-12">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <MriSimpleTooltip key={side} content={`Lado ${side}`} side={side}>
                    <MriButton variant="outline" size="sm">{side}</MriButton>
                </MriSimpleTooltip>
            ))}
        </div>
    ),
}

// `content` vazio devolve o filho sem tooltip — o padrao usado no MriSidebar,
// onde o balao so existe no modo colapsado.
export const ConditionalContent: StoryObj<typeof MriSimpleTooltip> = {
    render: () => (
        <div className="flex gap-3">
            <MriSimpleTooltip content="Tem tooltip">
                <MriButton variant="outline" size="sm">com</MriButton>
            </MriSimpleTooltip>
            <MriSimpleTooltip content={undefined}>
                <MriButton variant="outline" size="sm">sem</MriButton>
            </MriSimpleTooltip>
        </div>
    ),
}

// Partes cruas, pra conteudo rico. Um Provider unico cobre varios tooltips.
export const Composed: StoryObj<typeof MriSimpleTooltip> = {
    render: () => (
        <MriTooltipProvider delayDuration={150}>
            <div className="flex gap-3">
                <MriTooltip>
                    <MriTooltipTrigger asChild>
                        <MriButton variant="outline" size="icon"><Info className="h-4 w-4" /></MriButton>
                    </MriTooltipTrigger>
                    <MriTooltipContent side="bottom" className="max-w-[220px] p-3">
                        <p className="font-bold mb-1">Resource travado</p>
                        <p className="text-muted-foreground font-normal">
                            Ele está marcado como essencial no <code className="font-mono">server.cfg</code>.
                        </p>
                    </MriTooltipContent>
                </MriTooltip>

                <MriTooltip>
                    <MriTooltipTrigger asChild>
                        <MriButton variant="outline" size="icon" className="text-red-400">
                            <Trash2 className="h-4 w-4" />
                        </MriButton>
                    </MriTooltipTrigger>
                    <MriTooltipContent side="bottom">Remover</MriTooltipContent>
                </MriTooltip>
            </div>
        </MriTooltipProvider>
    ),
}
