interface Option {
    label: string;
    value: string | number;
}
interface SelectSearchProps {
    options: Option[];
    value: string | number;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    className?: string;
    disabled?: boolean;
}
export declare function SelectSearch({ options, value, onChange, placeholder, searchPlaceholder, emptyMessage, className, disabled }: SelectSearchProps): import("react/jsx-runtime").JSX.Element;
export {};
