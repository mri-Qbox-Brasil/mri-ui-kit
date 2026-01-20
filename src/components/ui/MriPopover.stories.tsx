import type { Meta, StoryObj } from '@storybook/react';
import { MriPopover, MriPopoverContent, MriPopoverTrigger } from './MriPopover';
import { MriButton } from './MriButton';

const meta: Meta<typeof MriPopover> = {
  title: 'UI/MriPopover',
  component: MriPopover,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="flex justify-center p-20">
        <MriPopover>
        <MriPopoverTrigger asChild>
            <MriButton variant="outline">Open Popover</MriButton>
        </MriPopoverTrigger>
        <MriPopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                    </p>
                </div>
            </div>
        </MriPopoverContent>
        </MriPopover>
    </div>
  ),
};
