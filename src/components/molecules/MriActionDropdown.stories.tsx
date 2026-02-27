
import { MriActionDropdown } from "./MriActionDropdown";

export default {
  title: "Molecules/MriActionDropdown",
  component: MriActionDropdown,
  argTypes: {
    onToggleFavorite: { action: "toggled favorite" },
  },
};

export const Default = {
  args: {
    label: "Give Item to Player",
    id: "give_item",
    isFavorite: false,
    dropdownItems: [
        {
            id: "player_target",
            label: "Target Player",
            option: "dropdown",
            options: [
                { value: "1", label: "John Doe" },
                { value: "2", label: "Jane Smith" },
            ],
            selectedLabel: "Select Player...",
            selectedValue: undefined,
            searchPlaceholder: "Search players...",
            noneFoundText: "No players online"
        },
        {
            id: "item_name",
            label: "Item Name",
            option: "text",
            placeholder: "e.g. water_bottle"
        },
        {
            id: "amount",
            label: "Amount",
            option: "text",
            placeholder: "1"
        },
        {
            id: "submit",
            label: "Give Item",
            option: "button"
        }
    ]
  },
};
