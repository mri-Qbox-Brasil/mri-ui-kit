import type { Preview, Decorator } from "@storybook/react";
import React from 'react';
import '../src/index.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'dark';
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
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
