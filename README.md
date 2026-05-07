# 🎨 MRI UI Kit

> **Biblioteca oficial de componentes UI** para o ecossistema MRI - moderna, responsiva, com suporte nativo a modo escuro.

[![CI](https://github.com/mri-Qbox-Brasil/mri-ui-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/mri-Qbox-Brasil/mri-ui-kit/actions)
[![NPM Version](https://img.shields.io/npm/v/@mriqbox/ui-kit)](https://www.npmjs.com/package/@mriqbox/ui-kit)
[![Storybook](https://img.shields.io/badge/Storybook-Live-blue)](https://ui.mriqbox.com.br)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com/)

---

## 📖 Índice

- [Visão Geral](#-visão-geral)
- [Recursos](#-recursos)
- [Tech Stack](#-tech-stack)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Componentes Disponíveis](#-componentes-disponíveis)
- [Uso da CLI](#-uso-da-cli)
- [Configuração](#-configuração)
- [Desenvolvimento](#-desenvolvimento)
- [Storybook](#-storybook)
- [Build](#-build)
- [Publicação](#-publicação)

---

## 🌟 Visão Geral

**MRI UI Kit** (`@mriqbox/ui-kit`) é a biblioteca oficial de componentes para o ecossistema **MRI Qbox Brasil**. Projetada para ser moderna, responsiva e com suporte nativo a modo escuro, usa **React**, **Tailwind CSS**, **Radix UI** e segue a arquitetura **shadcn/ui**.

### Principais Benefícios

| Benefício | Descrição |
|---------|-------------|
| 🎨 **Design Moderno** | UI limpa e profissional com Tailwind CSS |
| 🌒 **Modo Escuro** | Suporte nativo a tema escuro via next-themes |
| 🧩 **Arquitetura shadcn** | Componentes copy-paste com controle total |
| 📦 **Pacote NPM** | Instale via npm/pnpm ou use a CLI |
| 📖 **Storybook** | Documentação ao vivo em [ui.mriqbox.com.br](https://ui.mriqbox.com.br) |
| 🎯 **Radix UI** | Primitivos acessíveis e sem estilo para componentes complexos |

---

## ✨ Recursos

### Arquitetura de Componentes

Seguindo a metodologia **shadcn/ui**:

| Camada | Descrição | Exemplos |
|-------|-------------|---------|
| **Átomos** | Blocos básicos de construção | Button, Input, Badge, Spinner, Icons |
| **Moléculas** | Combinações de átomos | Card, Modal, Dialog, Select, DatePicker |
| **Organismos** | Seções complexas de UI | Sidebar, Topbar, Calendar, Table, Keyboard Visualizer |

### Recursos Técnicos

- **TypeScript** - Segurança total de tipos
- **Tailwind CSS** - Estilização utility-first com tema personalizado
- **Radix UI** - Primitivos de componentes acessíveis
- **Class Variance Authority** - Props de variantes type-safe
- **Tailwind Merge** - Merge inteligente de className
- **Lucide React** - Belo conjunto de ícones
- **Storybook** - Documentação e testes de componentes
- **Vite** - Ferramenta de build extremamente rápida

---

## 🛠️ Tech Stack

| Tecnologia | Versão | Propósito |
|------------|---------|---------|
| **React** | 18.2.0+ | Biblioteca UI |
| **TypeScript** | 5.2.2+ | Segurança de tipos |
| **Tailwind CSS** | 3.4.1+ | Estilização |
| **Radix UI** | 1.0+ | Primitivos acessíveis |
| **Vite** | 5.1.6+ | Ferramenta de build |
| **Storybook** | 8.6+ | Documentação |
| **Lucide React** | 0.344+ | Ícones |
| **next-themes** | 0.4.6+ | Gerenciamento de temas |

---

## 📂 Estrutura de Arquivos

```
mri-ui-kit/
├── src/
│   ├── index.ts                    # Arquivo principal de exportação
│   ├── index.css                   # Estilos globais + Tailwind
│   ├── lib/
│   │   └── utils.ts               # Funções utilitárias (cn, etc.)
│   ├── components/
│   │   ├── atoms/                 # Componentes básicos
│   │   │   ├── MriButton.tsx
│   │   │   ├── MriInput.tsx
│   │   │   ├── MriBadge.tsx
│   │   │   ├── MriSpinner.tsx
│   │   │   ├── MriIcons.tsx
│   │   │   ├── MriScrollArea.tsx
│   │   │   └── MriStatusBadge.tsx
│   │   ├── molecules/              # Componentes compostos
│   │   │   ├── MriCard.tsx
│   │   │   ├── MriModal.tsx
│   │   │   ├── MriDialog.tsx
│   │   │   ├── MriSelect.tsx
│   │   │   ├── MriDatePicker.tsx
│   │   │   ├── MriTimePicker.tsx
│   │   │   ├── MriColorPicker.tsx
│   │   │   ├── MriCommand.tsx
│   │   │   ├── MriThemeToggle.tsx
│   │   │   └── ... (20+ moléculas)
│   │   └── organisms/             # Seções complexas de UI
│   │       ├── MriCalendar.tsx
│   │       ├── MriSidebar.tsx
│   │       ├── MriTopbar.tsx
│   │       ├── MriPageHeader.tsx
│   │       ├── MriTable.tsx
│   │       ├── MriKeyboardVisualizer.tsx
│   │       └── MriPlayerScreenStream.tsx
│   └── stories/                   # Stories do Storybook
│       ├── Introduction.mdx
│       ├── Colors.mdx
│       └── Typography.mdx
├── .storybook/                    # Config Storybook
│   ├── main.ts
│   ├── preview.ts
│   ├── manager.ts
│   └── theme.ts
├── bin/
│   └── cli.js                    # CLI para adicionar componentes
├── dist/                          # Saída do build
├── tailwind.config.js             # Configuração Tailwind
├── components.json                # Config shadcn/ui
├── vite.config.ts                 # Configuração Vite
├── tsconfig.json                  # Config TypeScript
├── package.json                   # Config pacote NPM
└── README.md
```

---

## 🚀 Instalação

### Opção 1: Pacote NPM (Tradicional)

Ideal se você quer componentes prontos para uso com atualizações automáticas.

```bash
# Usando pnpm (recomendado)
pnpm add @mriqbox/ui-kit

# Usando npm
npm install @mriqbox/ui-kit

# Usando yarn
yarn add @mriqbox/ui-kit
```

### Opção 2: Shadcn CLI / Copiar & Colar (Controle Total)

Ideal se você quer o código fonte do componente no seu projeto para personalização livre ("Own your UI").

Este projeto contém um arquivo `components.json`, permitindo o uso da CLI shadcn.

```bash
# Adicionar componente via CLI
npx @mriqbox/ui-kit add mri-button

# Isso baixa MriButton.tsx para:
# src/components/ui/MriButton.tsx (ou diretório configurado)
```

**Nota:** A CLI apenas baixa o arquivo do componente. Verifique se ele tem dependências em outros componentes `Mri*` e adicione-as também se necessário.

---

## 📦 Uso

### Uso do Pacote NPM

```tsx
import { MriButton, MriBadge, MriCard } from '@mriqbox/ui-kit';

export default function MyComponent() {
  return (
    <MriCard>
      <h1>Hello World</h1>
      <MriBadge variant="success">Ativo</MriBadge>
      <MriButton onClick={() => alert('Clicado!')}>
        Clique aqui
      </MriButton>
    </MriCard>
  );
}
```

### Com CLI (Copiar & Colar)

Após adicionar componentes via CLI:

```tsx
// Importar do seu diretório local de componentes
import { MriButton } from '@/components/ui/MriButton';

export default function MyComponent() {
  return <MriButton variant="primary">Clique aqui</MriButton>;
}
```

---

## 🧩 Componentes Disponíveis

### Átomos (Blocos Básicos)

| Componente | Descrição | Variantes |
|-----------|-------------|----------|
| `MriButton` | Componente de botão flexível | default, destructive, outline, secondary, ghost, link |
| `MriInput` | Campo de entrada de texto | - |
| `MriBadge` | Indicador pequeno de status | default, secondary, destructive, outline |
| `MriSpinner` | Spinner de carregamento | - |
| `MriIcons` | Componente de ícone (Lucide) | - |
| `MriScrollArea` | Área de scrollbar personalizada | - |
| `MriStatusBadge` | Status com indicador de ponto | online, offline, away, busy |
| `MriSkeleton` | Placeholder de carregamento | - |

### Moléculas (Componentes Compostos)

| Componente | Descrição | Recursos |
|-----------|-------------|----------|
| `MriCard` | Container de cartão | Header, Content, Footer |
| `MriModal` | Dialog modal | Overlay, portal, animações |
| `MriDialog` | Dialog de confirmação | Title, description, actions |
| `MriSelect` | Dropdown select | Single/multi select, search |
| `MriDatePicker` | Seleção de data | Calendar, range, presets |
| `MriTimePicker` | Seleção de hora | Hours, minutes, AM/PM |
| `MriColorPicker` | Seleção de cor | Presets, custom, hex/rgb |
| `MriCommand` | Command palette | Search, groups, shortcuts |
| `MriPopover` | Popover content | Trigger, content, positioning |
| `MriThemeToggle` | Toggle dark/light | Switch, icon indicators |
| `MriDrawer` | Painel deslizante | Left/right, responsive |
| `MriActionCard` | Cartão orientado a ação | Title, description, button |
| `MriActionModal` | Confirmação de ação | Destructive/non-destructive |
| `MriGridActionButton` | Botão de ação em grade | Icon, label, badge |
| `MriSearchInput` | Busca com limpar | Debounce, icon, clear button |
| `MriSectionHeader` | Cabeçalho de seção | Title, description, actions |
| `MriCompactSearch` | Barra de busca compacta | Filters, sort, search |
| `MriEconomyCard` | Cartão de exibição de economia | Icon, amount, trend |
| `MriPlayerVitals` | Saúde/stats do jogador | Health, armor, hunger, thirst |
| `MriVitalAdjustModal` | Ajustar vitais do jogador | Sliders, presets |
| `MriButtonGroup` | Grupo de botões | Orientation, selection |
| `MriCopyButton` | Copiar para clipboard | Success feedback |
| `MriCalendar` | Widget de calendário | Multiple views, events |

### Organismos (Seções Complexas de UI)

| Componente | Descrição | Caso de Uso |
|-----------|-------------|----------|
| `MriSidebar` | Sidebar recolhível | Navigation, groups, collapsible items |
| `MriTopbar` | Barra de navegação superior | Breadcrumbs, actions, user menu |
| `MriPageHeader` | Seção de título da página | Title, description, action buttons |
| `MriTable` | Tabela de dados avançada | Sorting, filtering, pagination |
| `MriCalendar` | Visualização completa de calendário | Events, multiple views |
| `MriKeyboardVisualizer` | Exibição de entrada de teclado | NUI keyboard, key bindings |
| `MriPlayerScreenStream` | Exibição de stream de vídeo | Compartilhamento de tela do jogador |

---

## 🖥️ Uso da CLI

### Adicionando Componentes

```bash
# Adicionar um único componente
npx @mriqbox/ui-kit add mri-button

# Adicionar múltiplos componentes
npx @mriqbox/ui-kit add mri-button mri-input mri-card

# Adicionar com diretório personalizado (usa config components.json)
npx @mriqbox/ui-kit add mri-button --dest src/components/ui
```

### Componentes Disponíveis na CLI

| Nome CLI | Arquivo de Componente |
|----------|---------------|
| `mri-button` | `MriButton.tsx` |
| `mri-input` | `MriInput.tsx` |
| `mri-badge` | `MriBadge.tsx` |
| `mri-spinner` | `MriSpinner.tsx` |
| `mri-card` | `MriCard.tsx` |
| `mri-modal` | `MriModal.tsx` |
| `mri-dialog` | `MriDialog.tsx` |
| `mri-select` | `MriSelect.tsx` |
| `mri-date-picker` | `MriDatePicker.tsx` |
| `mri-theme-toggle` | `MriThemeToggle.tsx` |
| `mri-sidebar` | `MriSidebar.tsx` |
| `mri-topbar` | `MriTopbar.tsx` |
| `mri-table` | `MriTable.tsx` |
| ... | (30+ componentes disponíveis) |

---

## ⚙️ Configuração

### Para Uso NPM

#### 1. Importar CSS Global

Adicione ao seu arquivo de entrada (ex: `main.tsx` ou `App.tsx`):

```tsx
import '@mriqbox/ui-kit/dist/style.css';
```

#### 2. Configurar Tailwind CSS

No seu `tailwind.config.js`, adicione o caminho da biblioteca ao `content`:

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@mriqbox/ui-kit/dist/**/*.{js,mjs}" // <--- Adicione esta linha
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
```

### components.json (para CLI)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 💻 Desenvolvimento

### Pré-requisitos

- **Node.js** 18+
- **pnpm** (recomendado) ou npm

### Configuração

```bash
# Clonar o repositório
git clone https://github.com/mri-Qbox-Brasil/mri-ui-kit.git
cd mri-ui-kit

# Instalar dependências
pnpm install
```

### Scripts

| Script | Descrição |
|--------|-------------|
| `pnpm dev` | Iniciar servidor de desenvolvimento Vite |
| `pnpm build` | Construir biblioteca (TypeScript + Vite) |
| `pnpm storybook` | Iniciar servidor de desenvolvimento Storybook (porta 6006) |
| `pnpm build-storybook` | Construir Storybook estático |
| `pnpm lint` | Executar ESLint |
| `pnpm preview` | Visualizar build de produção |

---

## 📖 Storybook

Acesse todos os componentes disponíveis e suas propriedades:

**Storybook ao Vivo:** [https://ui.mriqbox.com.br](https://ui.mriqbox.com.br)

### Executando Localmente

```bash
pnpm storybook
```

Storybook abrirá em `http://localhost:6006`

### Estrutura da Story

Cada componente tem um arquivo `.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MriButton } from './MriButton';

const meta: Meta<typeof MriButton> = {
  title: 'Atoms/MriButton',
  component: MriButton,
};

export default meta;
type Story = StoryObj<typeof MriButton>;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
```

---

## 🏗️ Build

### Construir Biblioteca

```bash
pnpm build
```

Saída em `dist/`:

| Arquivo | Descrição |
|------|-------------|
| `index.es.js` | Build ES module |
| `index.umd.js` | Build UMD |
| `index.d.ts` | Declarações TypeScript |
| `style.css` | Estilos Tailwind compilados |

### Exports do Pacote

```json
{
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/style.css"
  }
}
```

---

## 🚀 Publicação

### Automatizada (Recomendado)

O projeto usa **Semantic Release** com GitHub Actions:

| Prefixo de Commit | Bump de Versão | Exemplo |
|---------------|--------------|---------|
| `fix:` | Patch (3.5.1 → 3.5.2) | `fix: correct button focus state` |
| `feat:` | Minor (3.5.1 → 3.6.0) | `feat: add MriDrawer component` |
| `feat!:` | Major (3.5.1 → 4.0.0) | `feat!: change component API` |

### Publicação Manual

```bash
# Login no npm
npm login

# Build
pnpm build

# Publicar (automatizado via CI/CD)
# OU manual:
npm publish --access public
```

### Atualização de Versão

O script `version` auto-atualiza o arquivo CLI:

```json
{
  "scripts": {
    "version": "node scripts/update-cli-version.js && git add bin/cli.js"
  }
}
```

---

## 🎨 Temas

### Configuração de Tema Tailwind

```js
// tailwind.config.js
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... mais cores
        border_primary: '#373A40',
        hover_secondary: '#5c5f66',
        tertiary: '#2C2E33',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### Modo Escuro

A biblioteca usa `next-themes` para gerenciamento de temas:

```tsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie sua branch de funcionalidade (`git checkout -b feature/componente-incrivel`)
3. Commit suas mudanças (`git commit -m 'feat: add amazing component'`)
4. Push para a branch (`git push origin feature/componente-incrivel`)
5. Abra um Pull Request

### Adicionando um Novo Componente

1. Crie o componente em `src/components/atoms/` (ou molecules/organisms)
2. Adicione arquivo `.stories.tsx` para Storybook
3. Exporte em `src/index.ts`
4. Atualize `bin/cli.js` com o mapeamento do componente
5. Teste no Storybook

---

## 📞 Suporte & Comunidade

- **Discord:** [MRI QBOX Brasil](https://discord.gg/mriqbox)
- **Storybook:** [ui.mriqbox.com.br](https://ui.mriqbox.com.br)
- **Issues:** [GitHub Issues](https://github.com/mri-Qbox-Brasil/mri-ui-kit/issues)
- **NPM:** [@mriqbox/ui-kit](https://www.npmjs.com/package/@mriqbox/ui-kit)

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

## ❤️ Créditos

Construído com:
- **React** + **TypeScript**
- **Tailwind CSS** + **Radix UI**
- Arquitetura **shadcn/ui**
- Ícones **Lucide React**

---

<div align="center">

**Desenvolvido com ❤️ por [MRI Brasil](https://github.com/mri-Qbox-Brasil)**

</div>
