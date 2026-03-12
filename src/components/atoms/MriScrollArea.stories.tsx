import type { Meta, StoryObj } from '@storybook/react';
import { MriScrollArea } from './MriScrollArea';

const meta: Meta<typeof MriScrollArea> = {
    title: 'Atoms/MriScrollArea',
    component: MriScrollArea,
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof MriScrollArea>;

export const Vertical: Story = {
    render: (args) => (
        <MriScrollArea {...args} className="h-[200px] w-[350px] rounded-md border border-border p-4">
            <div className="space-y-4">
                <h4 className="text-sm font-medium leading-none">Tags</h4>
                {Array.from({ length: 50 }).map((_, i, a) => (
                    <div key={i} className="text-sm">
                        v1.2.0-beta.{a.length - i}
                    </div>
                ))}
            </div>
        </MriScrollArea>
    ),
};

export const Horizontal: Story = {
    render: (args) => (
        <MriScrollArea {...args} className="w-full whitespace-nowrap rounded-md border border-border p-4">
            <div className="flex w-max space-x-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex h-20 w-32 items-center justify-center rounded-md bg-muted text-xs"
                    >
                        Item {i + 1}
                    </div>
                ))}
            </div>
        </MriScrollArea>
    ),
};
