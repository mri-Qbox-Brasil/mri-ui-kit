import type { Meta, StoryObj } from '@storybook/react';
import { MriPlayerVitals } from './MriPlayerVitals';

const meta: Meta<typeof MriPlayerVitals> = {
    title: 'Molecules/MriPlayerVitals',
    component: MriPlayerVitals,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['mini', 'compact', 'full'],
        },
        onAction: { action: 'onAction' },
        onIconClick: { action: 'onIconClick' },
    },
};

export default meta;
type Story = StoryObj<typeof MriPlayerVitals>;

const mockVitals = {
    health: 185, // 85% in 100-200 range
    armor: 45,
    metadata: {
        hunger: 72,
        thirst: 64,
        stress: 15,
    },
};

export const Compact: Story = {
    args: {
        vitals: mockVitals,
        size: 'compact',
    },
};

export const Mini: Story = {
    args: {
        vitals: mockVitals,
        size: 'mini',
    },
};

export const Full: Story = {
    args: {
        vitals: mockVitals,
        size: 'full',
    },
};

export const CriticalState: Story = {
    args: {
        vitals: {
            health: 115, // 15%
            armor: 0,
            metadata: {
                hunger: 5,
                thirst: 2,
                stress: 85,
            },
        },
        size: 'full',
    },
};

export const WithIconClick: Story = {
    args: {
        vitals: mockVitals,
        size: 'compact',
    },
};
