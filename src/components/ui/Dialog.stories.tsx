import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Dialog> = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        {open && (
           <Dialog title="Example Dialog" onClose={() => setOpen(false)}>
             <div className="py-4">
               <p>This is a dialog content area.</p>
             </div>
             <div className="flex justify-end gap-2 mt-4">
               <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
               <Button onClick={() => setOpen(false)}>Confirm</Button>
             </div>
           </Dialog>
        )}
      </>
    );
  }
};
