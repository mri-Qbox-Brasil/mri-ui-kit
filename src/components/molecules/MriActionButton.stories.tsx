import { MriActionButton } from "./MriActionButton";

export default {
  title: "Molecules/MriActionButton",
  component: MriActionButton,
  argTypes: {
    onClick: { action: "clicked" },
    onToggleFavorite: { action: "toggled favorite" },
  },
};

export const Default = {
  args: {
    label: "Example Action",
  },
};

export const Favorite = {
  args: {
    label: "Favorite Action",
    isFavorite: true,
  },
};

export const Processing = {
  args: {
    label: "Processing Action",
    isProcessing: true,
  },
};
