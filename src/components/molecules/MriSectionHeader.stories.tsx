import type { Meta, StoryObj } from '@storybook/react';
import { MriSectionHeader } from './MriSectionHeader';
import { Settings, Info, Users } from 'lucide-react';
import { MriTeleportIcon } from '@/components/atoms/MriIcons';

const meta: Meta<typeof MriSectionHeader> = {
  title: 'Molecules/MriSectionHeader',
  component: MriSectionHeader,
  tags: ['autodocs'],
  argTypes: {
      icon: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof MriSectionHeader>;

export const Default: Story = {
  args: {
    title: 'General Settings',
    icon: Settings,
  },
};

export const CustomColor: Story = {
    args: {
        title: 'Important Info',
        icon: Info,
        className: 'text-blue-500'
    }
}

// variant='title' preserva a hierarquia de um titulo de pagina/secao grande,
// em vez de rebaixar pra rotulo miudo em caixa alta.
export const TitleVariant: Story = {
  args: {
    title: 'Jogadores online',
    icon: Users,
    variant: 'title',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-[520px] space-y-8">
      <div>
        <MriSectionHeader icon={Users} title="Jogadores online" variant="title" />
        <p className="text-sm text-muted-foreground">Hierarquia de titulo.</p>
      </div>
      <div>
        <MriSectionHeader icon={Settings} title="Preferências" />
        <p className="text-sm text-muted-foreground">Hierarquia de rótulo (default).</p>
      </div>
    </div>
  ),
};

// description + children: vira bloco com linha de acoes a direita.
export const WithDescriptionAndActions: Story = {
  render: () => (
    <div className="w-[520px]">
      <MriSectionHeader
        icon={Users}
        title="Jogadores online"
        variant="title"
        description="Atualiza automaticamente a cada 5 segundos."
      >
        <span className="text-xs font-mono text-muted-foreground">32/64</span>
      </MriSectionHeader>
    </div>
  ),
};

// `icon` aceita MriIconProp: componente lucide, um SVG do proprio kit, ou um
// elemento pronto pra icon fonts (Material Symbols e cia.).
export const IconSources: Story = {
  render: () => (
    <div className="w-[420px] space-y-6">
      <MriSectionHeader icon={Users} title="Lucide" variant="title" />
      <MriSectionHeader icon={MriTeleportIcon} title="SVG do kit (MriIcons)" variant="title" />
      <MriSectionHeader
        icon={<span className="material-symbols-outlined text-[20px] leading-none">gavel</span>}
        title="Icon font (elemento pronto)"
        variant="title"
      />
    </div>
  ),
};
