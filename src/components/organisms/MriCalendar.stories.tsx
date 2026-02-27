import type { Meta, StoryObj } from "@storybook/react";
import { MriCalendar } from "./MriCalendar";
import { ptBR } from "date-fns/locale";

const meta = {
  title: "Organisms/MriCalendar",
  component: MriCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "radio" },
      options: ["single", "multiple", "range"],
    },
    showOutsideDays: { control: "boolean" },
  },
} satisfies Meta<typeof MriCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
    locale: ptBR,
    className: "rounded-md border",
  },
};

export const MultipleDates: Story = {
  args: {
    mode: "multiple",
    locale: ptBR,
    className: "rounded-md border",
  },
};

export const DateRange: Story = {
  args: {
    mode: "range",
    locale: ptBR,
    className: "rounded-md border",
  },
};

export const WithRangeLimit: Story = {
  args: {
    mode: "single",
    locale: ptBR,
    className: "rounded-md border",
    fromDate: new Date(2024, 0, 1),
    toDate: new Date(2024, 11, 31),
    defaultMonth: new Date(2024, 0, 1),
  },
};
