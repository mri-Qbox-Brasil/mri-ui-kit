import type { Meta, StoryObj } from "@storybook/react"
import { Users, Wallet, Car, ShieldAlert, Activity, Landmark, Coins, UserCircle } from "lucide-react"
import { MriStatCard } from "./MriStatCard"

const meta: Meta<typeof MriStatCard> = {
  title: "Molecules/MriStatCard",
  component: MriStatCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "warning",
        "info",
        "success",
        "purple",
        "indigo",
        "orange",
        "destructive",
      ],
    },
    title: { control: "text" },
    value: { control: "text" },
    trend: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof MriStatCard>

export const Default: Story = {
  args: {
    title: "Jogadores Online",
    value: 42,
    icon: <Users className="w-6 h-6" />,
    variant: "default",
  },
}

export const WithTrend: Story = {
  args: {
    title: "Vendas Hoje",
    value: "R$ 12.480",
    icon: <Wallet className="w-6 h-6" />,
    variant: "success",
    trend: "+12% vs ontem",
  },
}

export const Warning: Story = {
  args: {
    title: "Bans Ativos",
    value: 5,
    icon: <ShieldAlert className="w-6 h-6" />,
    variant: "warning",
  },
}

// Dashboard real do mri_Qadmin — 8 cards lado-a-lado num grid.
export const DashboardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MriStatCard title="Online" value={42} icon={<Users className="w-6 h-6" />} variant="success" />
      <MriStatCard title="Cash" value="$15,000" icon={<Wallet className="w-6 h-6" />} variant="success" />
      <MriStatCard title="Banco" value="$200,000" icon={<Landmark className="w-6 h-6" />} variant="info" />
      <MriStatCard title="Crypto" value="$1,000" icon={<Coins className="w-6 h-6" />} variant="warning" />
      <MriStatCard title="Únicos" value={42} icon={<Activity className="w-6 h-6" />} variant="purple" />
      <MriStatCard title="Veículos" value={140} icon={<Car className="w-6 h-6" />} variant="indigo" />
      <MriStatCard title="Bans" value={5} icon={<ShieldAlert className="w-6 h-6" />} variant="warning" />
      <MriStatCard title="Chars" value={70} icon={<UserCircle className="w-6 h-6" />} variant="orange" />
    </div>
  ),
}

// Mostra todas as 8 variantes empilhadas pra inspecao visual.
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MriStatCard title="Default (accent)" value="123" icon={<Activity className="w-6 h-6" />} variant="default" />
      <MriStatCard title="Warning" value="123" icon={<Activity className="w-6 h-6" />} variant="warning" />
      <MriStatCard title="Info" value="123" icon={<Activity className="w-6 h-6" />} variant="info" />
      <MriStatCard title="Success" value="123" icon={<Activity className="w-6 h-6" />} variant="success" />
      <MriStatCard title="Purple" value="123" icon={<Activity className="w-6 h-6" />} variant="purple" />
      <MriStatCard title="Indigo" value="123" icon={<Activity className="w-6 h-6" />} variant="indigo" />
      <MriStatCard title="Orange" value="123" icon={<Activity className="w-6 h-6" />} variant="orange" />
      <MriStatCard title="Destructive" value="123" icon={<Activity className="w-6 h-6" />} variant="destructive" />
    </div>
  ),
}
