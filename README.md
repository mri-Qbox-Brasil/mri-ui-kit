# Mri UI

Biblioteca oficial de componentes de UI para o ecossistema Mri.

Desenhada para ser moderna, responsiva e com suporte nativo a temas escuros (Dark Mode), utilizando **React**, **Tailwind CSS** e **Radix UI**.

## Instalação

```bash
pnpm add @mri-org/ui
# ou
npm install @mri-org/ui
```

*(Certifique-se de ajustar o nome do pacote conforme publicado no NPM)*

## Configuração

### 1. CSS Global

Adicione o CSS da biblioteca no arquivo de entrada da sua aplicação (ex: `main.tsx` ou `App.tsx`):

```tsx
import '@mri-org/ui/dist/style.css';
```

### 2. Tailwind CSS

Para que o Tailwind da sua aplicação reconheça as classes da biblioteca, adicione o caminho do pacote ao seu `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@mri-org/ui/dist/**/*.{js,mjs}"
  ],
  // ...
}
```

## Uso

Importe os componentes diretamente do pacote:

```tsx
import { Button, Modal } from '@mri-org/ui';

function App() {
  return (
    <div>
      <Button variant="primary">Clique Aqui</Button>

      <Modal open={true}>
        {/* Conteúdo do Modal */}
      </Modal>
    </div>
  );
}
```

## Documentação

Para ver todos os componentes disponíveis e suas propriedades, consulte nosso Storybook:

[Link para o Storybook](https://ui.mriqbox.com.br)

## Desenvolvimento

Para rodar o projeto localmente:

1. Clone o repositório.
2. Instale dependências: `pnpm install`
3. Inicie o Storybook: `pnpm storybook`
