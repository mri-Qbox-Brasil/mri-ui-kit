import { create } from '@storybook/theming';

export default create({
  base: 'dark',
  brandTitle: 'Mri UI',
  brandUrl: 'https://github.com/mri-Qbox-Brasil/mri-ui',
  brandImage: 'https://assets.mriqbox.com.br/branding/logo96.png',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#00E396',
  colorSecondary: '#00E396',

  // UI
  appBg: '#09090b', // very dark bg
  appContentBg: '#09090b',
  appPreviewBg: '#09090b',
  appBorderColor: '#373A40',
  appBorderRadius: 8,

  // Text
  textColor: '#ffffff',
  textInverseColor: '#000000',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#00E396',
  barBg: '#0e0e11',

  // Form colors
  inputBg: '#18181b',
  inputBorder: '#373A40',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
});
