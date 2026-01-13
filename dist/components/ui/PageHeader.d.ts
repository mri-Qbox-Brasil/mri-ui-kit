import { LucideIcon } from 'lucide-react';
import * as React from 'react';
interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: LucideIcon;
    count?: number;
    countLabel?: string;
    children?: React.ReactNode;
}
export declare function PageHeader({ title, icon: Icon, count, countLabel, children, className, ...props }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
