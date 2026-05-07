# Manual do mri-ui-kit

## O que faz
O **mri-ui-kit** (`@mriqbox/ui-kit`) é a biblioteca oficial de componentes UI para o ecossistema MRI Qbox Brasil, com design moderno, responsivo e suporte nativo a modo escuro. Segue a arquitetura shadcn/ui e usa React, Tailwind CSS e Radix UI.

## Como funciona
A biblioteca disponibiliza componentes em três camadas (átomos, moléculas, organismos) que podem ser instalados via pacote NPM ou copiados para o projeto via CLI (estilo shadcn). Todos os componentes são documentados no Storybook ao vivo.

## Instalação
### Opção 1: Pacote NPM
```bash
pnpm add @mriqbox/ui-kit
# ou
npm install @mriqbox/ui-kit
```

### Opção 2: CLI (Copiar & Colar)
```bash
npx @mriqbox/ui-kit add mri-button
# Adiciona o componente MriButton.tsx ao seu projeto
```

## Configuração
### Para Uso NPM
1. Importe o CSS global no arquivo de entrada (ex: `main.tsx`):
   ```tsx
   import '@mriqbox/ui-kit/dist/style.css';
   ```

2. Adicione o caminho da biblioteca ao `content` do `tailwind.config.js`:
   ```js
   module.exports = {
     content: [
       "./src/**/*.{ts,tsx}",
       "./node_modules/@mriqbox/ui-kit/dist/**/*.{js,mjs}"
     ],
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

## Componentes Disponíveis
### Átomos (Blocos Básicos)
| Componente | Descrição | Variantes |
|-----------|-------------|----------|
| `MriButton` | Botão flexível | default, destructive, outline, secondary, ghost, link |
| `MriInput` | Campo de entrada de texto | - |
| `MriBadge` | Indicador de status | default, secondary, destructive, outline |
| `MriSpinner` | Spinner de carregamento | - |
| `MriIcons` | Ícones Lucide React | - |
| `MriStatusBadge` | Status com indicador de ponto | online, offline, away, busy |

### Moléculas (Componentes Compostos)
| Componente | Descrição |
|-----------|-------------|
| `MriCard` | Container de cartão com Header, Content e Footer |
| `MriModal` | Dialog modal com overlay e animações |
| `MriSelect` | Dropdown select com busca e single/multi select |
| `MriDatePicker` | Seleção de data com calendário e presets |
| `MriThemeToggle` | Toggle de modo claro/escuro |
| `MriTable` | Tabela de dados com ordenação e paginação |

### Organismos (Seções Complexas)
| Componente | Descrição |
|-----------|-------------|
| `MriSidebar` | Sidebar recolhível com navegação |
| `MriTopbar` | Barra de navegação superior |
| `MriPageHeader` | Cabeçalho de página com ações |
| `MriCalendar` | Visualização completa de calendário |

## Uso da CLI
```bash
# Adicionar múltiplos componentes
npx @mriqbox/ui-kit add mri-button mri-input mri-card

# Adicionar com diretório personalizado
npx @mriqbox/ui-kit add mri-button --dest src/components/ui
```

## Storybook
Acesse todos os componentes e suas propriedades ao vivo:
**Storybook:** [https://ui.mriqbox.com.br](https://ui.mriqbox.com.br)

Para executar localmente:
```bash
pnpm storybook
# Abre em http://localhost:6006
```

## Scripts Disponíveis
| Script | Descrição |
|--------|-------------|
| `pnpm dev` | Inicia servidor de desenvolvimento Vite |
| `pnpm build` | Constrói a biblioteca (TypeScript + Vite) |
| `pnpm storybook` | Inicia servidor Storybook |
| `pnpm lint` | Executa ESLint |

## Casos de uso
- Construir interfaces web para o ecossistema MRI Qbox
- Usar componentes pré-estilizados com suporte a modo escuro
- Personalizar componentes via CLI copiando o código fonte para o projeto
- Documentar componentes via Storybook

## Solução de problemas
- **Estilos não aplicados**: Verifique se o CSS global foi importado e se o `tailwind.config.js` inclui o caminho da biblioteca.
- **Componente não encontrado via CLI**: Confira se o nome do componente está correto e se o `components.json` está configurado.
- **Modo escuro não funciona**: Valide se o `ThemeProvider` do `next-themes` está envolvendo sua aplicação.
