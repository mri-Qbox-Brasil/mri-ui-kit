import type { Preview, Decorator } from "@storybook/react";
import { themes } from '@storybook/theming';
import { DocsContainer } from '@storybook/blocks';
import React from 'react';
import '../src/index.css';

// Decorators só rodam em stories — páginas MDX puras (Cores, Tipografia,
// Tematização, ...) carregariam sem `.dark` aplicado e o conteúdo ficaria
// claro. Forçamos dark no carregamento do preview (dark-first); o decorator
// abaixo continua reagindo ao toggle do toolbar dentro de stories.
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
  document.documentElement.style.setProperty('background-color', '#09090b', 'important');
  if (document.body) {
    document.body.style.setProperty('background-color', '#09090b', 'important');
  }
}

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'dark';
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Sincroniza o background do iframe canvas com o tema. O body do ui-kit
    // é `bg-transparent`, então o canvas precisa pintar o pai. Usa setProperty
    // com `important` pra sobrepor o `body { background: transparent !important }`
    // do preview-head.html.
    document.documentElement.style.setProperty(
      'background-color',
      theme === 'dark' ? '#09090b' : '#ffffff',
      'important'
    );
    document.body.style.setProperty(
      'background-color',
      theme === 'dark' ? '#09090b' : '#ffffff',
      'important'
    );
  }
  return React.createElement(Story);
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#09090b',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    layout: 'centered',
    // DocsContainer customizado que sincroniza o tema do canvas Docs com o
    // toggle do toolbar (`globals.theme`). Sem isso, o tema do Docs ficaria
    // estatico e nao reagiria ao Light/Dark.
    docs: {
      container: ({ children, context }: React.ComponentProps<typeof DocsContainer>) => {
        const theme = context?.store?.userGlobals?.globals?.theme
          ?? context?.globals?.theme
          ?? 'dark';
        return React.createElement(
          DocsContainer,
          { context, theme: theme === 'dark' ? themes.dark : themes.light },
          children
        );
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Tema dos componentes',
      defaultValue: 'dark',
      toolbar: {
        title: 'Tema',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
