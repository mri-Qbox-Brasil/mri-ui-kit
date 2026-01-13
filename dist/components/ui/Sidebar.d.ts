import { ElementType, ReactNode } from 'react';

export interface SidebarItem {
    label: string;
    route?: string;
    icon: ElementType;
    onClick?: () => void;
    divider?: boolean;
}
export interface SidebarProps {
    items: SidebarItem[];
    activeRoute?: string;
    onNavigate?: (route: string) => void;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
    footer?: ReactNode;
    children?: ReactNode;
    className?: string;
}
export declare function Sidebar({ items, activeRoute, onNavigate, collapsed, onToggleCollapse, footer, children, className }: SidebarProps): import("react/jsx-runtime").JSX.Element;
