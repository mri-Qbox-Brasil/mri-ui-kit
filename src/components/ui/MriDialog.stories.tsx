import type { Meta, StoryObj } from '@storybook/react';
import { MriDialog } from './MriDialog';
import { MriButton } from './MriButton';
import { useState } from 'react';

const meta: Meta<typeof MriDialog> = {
  title: 'UI/MriDialog',
  component: MriDialog,
  tags: ['autodocs'],
};

export default meta;

const DialogDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MriButton onClick={() => setOpen(true)}>Open Dialog</MriButton>
      {open && (
         <MriDialog title="Example Dialog" onClose={() => setOpen(false)}>
           <div className="py-4">
             <p>This is a dialog content area.</p>
           </div>
           <div className="flex justify-end gap-2 mt-4">
             <MriButton variant="outline" onClick={() => setOpen(false)}>Cancel</MriButton>
             <MriButton onClick={() => setOpen(false)}>Confirm</MriButton>
           </div>
         </MriDialog>
      )}
    </>
  );
};

export const Default: StoryObj<typeof MriDialog> = {
  render: () => <DialogDemo />
};
