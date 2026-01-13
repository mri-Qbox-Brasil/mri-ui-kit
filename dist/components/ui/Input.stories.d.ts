import { StoryObj } from '@storybook/react';
import { Input } from './Input';

declare const meta: {
    title: string;
    component: typeof Input;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        disabled: {
            control: string;
        };
        placeholder: {
            control: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Disabled: Story;
export declare const WithValue: Story;
