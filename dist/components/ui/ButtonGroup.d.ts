import { default as React } from 'react';

type Action = {
    icon?: React.ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
};
export default function ButtonGroup({ buttons }: {
    buttons: Action[];
}): import("react/jsx-runtime").JSX.Element;
export {};
