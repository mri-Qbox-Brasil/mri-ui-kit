import { Meta, StoryObj } from '@storybook/react';
import { default as ButtonGroup } from './ButtonGroup';

declare const meta: Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof ButtonGroup>;
export declare const Default: Story;
export declare const DisabledItem: Story;
