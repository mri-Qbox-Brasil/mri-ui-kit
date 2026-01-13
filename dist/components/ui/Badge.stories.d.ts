import { StoryObj } from '@storybook/react';
import { Badge } from './Badge';

declare const meta: {
    title: string;
    component: typeof Badge;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        variant: {
            control: string;
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Secondary: Story;
export declare const Destructive: Story;
export declare const Outline: Story;
