import { MriActionCard } from "./MriActionCard";
import { MriTeleportIcon, MriBanIcon, MriKickIcon, MriReviveIcon, MriSendBackIcon } from "@/components/atoms/MriIcons";

export default {
  title: "Molecules/MriActionCard",
  component: MriActionCard,
  argTypes: {
    onClick: { action: "clicked" },
    onToggleFavorite: { action: "toggled favorite" },
  },
};

export const Button = {
  args: {
    label: "Teleport to Player",
    icon: MriTeleportIcon,
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
    label: "Processing...",
    isProcessing: true,
  },
};

export const Disabled = {
  args: {
    label: "No Permission",
    disabled: true,
  },
};

export const WithCustomIcons = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 w-80">
      <MriActionCard label="Teleport" icon={MriTeleportIcon} />
      <MriActionCard label="Revive" icon={MriReviveIcon} />
      <MriActionCard label="Kick" icon={MriKickIcon} disabled />
      <MriActionCard label="Ban" icon={MriBanIcon} disabled />
    </div>
  ),
};

export const Expandable = {
  args: {
    label: "Give Item to Player",
    icon: MriSendBackIcon,
    items: [
      {
        id: "player_target",
        label: "Target Player",
        option: "dropdown",
        options: [
          { value: "1", label: "John Doe" },
          { value: "2", label: "Jane Smith" },
        ],
        selectedLabel: "Select Player...",
        searchPlaceholder: "Search players...",
        noneFoundText: "No players online",
      },
      {
        id: "item_name",
        label: "Item Name",
        option: "text",
        placeholder: "e.g. water_bottle",
      },
      {
        id: "amount",
        label: "Amount",
        option: "text",
        placeholder: "1",
      },
      {
        id: "submit",
        label: "Give Item",
        option: "button",
      },
    ],
  },
};

export const ExpandableDisabled = {
  args: {
    label: "Give Item to Player",
    icon: MriSendBackIcon,
    disabled: true,
    items: [
      {
        id: "item_name",
        label: "Item Name",
        option: "text",
        placeholder: "e.g. water_bottle",
      },
      {
        id: "submit",
        label: "Give Item",
        option: "button",
      },
    ],
  },
};

export const ExpandablePartialDisabled = {
  args: {
    label: "Give Item to Player",
    icon: MriSendBackIcon,
    items: [
      {
        id: "item_name",
        label: "Item Name",
        option: "text",
        placeholder: "e.g. water_bottle",
        disabled: true,
      },
      {
        id: "submit",
        label: "Give Item",
        option: "button",
        disabled: true,
      },
    ],
  },
};
