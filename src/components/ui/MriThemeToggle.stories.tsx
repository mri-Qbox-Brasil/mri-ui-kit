import type { Meta, StoryObj } from '@storybook/react';
import { MriThemeToggle } from './MriThemeToggle';
import { ThemeProvider } from 'next-themes';

const meta: Meta<typeof MriThemeToggle> = {
  title: 'UI/MriThemeToggle',
  component: MriThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="flex items-center justify-center p-8 bg-background text-foreground border rounded-lg">
           {/* Wrapper to visualize theme change effect inside the story if possible,
               although next-themes usually applies to html/body */}
           <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomLabels: Story = {
  args: {
    themeLabel: "Appearance",
    themeIconLabel: "Toggle theme",
    lightLabel: "Light Mode",
    darkLabel: "Dark Mode",
    systemLabel: "System Default",
  },
};
