import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MriVitalAdjustModal, type MriVitalAdjustModalProps } from './MriVitalAdjustModal';
import { MriButton } from '@/components/atoms/MriButton';

const meta: Meta<typeof MriVitalAdjustModal> = {
    title: 'Molecules/MriVitalAdjustModal',
    component: MriVitalAdjustModal,
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'onSubmit' },
        onClose: { action: 'onClose' },
    },
};

export default meta;
type Story = StoryObj<typeof MriVitalAdjustModal>;

const StatefulModal = (args: MriVitalAdjustModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(args.currentValue);

    return (
        <div className="p-8 flex items-center justify-center">
            <MriButton onClick={() => setIsOpen(true)}>Open {args.vital} Adjuster</MriButton>
            <MriVitalAdjustModal
                {...args}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    args.onClose?.();
                }}
                currentValue={currentValue}
                onSubmit={(val) => {
                    setCurrentValue(val);
                    setIsOpen(false);
                    args.onSubmit?.(val);
                }}
            />
        </div>
    );
};

export const Health: Story = {
    render: (args) => <StatefulModal {...args} />,
    args: {
        vital: 'health',
        currentValue: 85,
        playerName: 'John Doe [102]',
    },
};

export const Armor: Story = {
    render: (args) => <StatefulModal {...args} />,
    args: {
        vital: 'armor',
        currentValue: 40,
        playerName: 'John Doe [102]',
    },
};

export const Hunger: Story = {
    render: (args) => <StatefulModal {...args} />,
    args: {
        vital: 'hunger',
        currentValue: 72,
        playerName: 'John Doe [102]',
    },
};

export const Thirst: Story = {
    render: (args) => <StatefulModal {...args} />,
    args: {
        vital: 'thirst',
        currentValue: 60,
        playerName: 'John Doe [102]',
    },
};

export const Stress: Story = {
    render: (args) => <StatefulModal {...args} />,
    args: {
        vital: 'stress',
        currentValue: 15,
        playerName: 'John Doe [102]',
    },
};
