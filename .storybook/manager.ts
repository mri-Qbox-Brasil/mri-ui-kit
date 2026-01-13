import { addons } from '@storybook/manager-api';
import psTheme from './psTheme';

addons.setConfig({
  theme: psTheme,
});
