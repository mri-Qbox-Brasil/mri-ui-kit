import type { Meta, StoryObj } from '@storybook/react';
import { MriModal } from './MriModal';
import { MriButton } from './MriButton';
import { useState } from 'react';

const meta: Meta<typeof MriModal> = {
  title: 'UI/MriModal',
  component: MriModal,
  tags: ['autodocs'],
};

export default meta;

const ModalDemo = () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MriButton onClick={() => setOpen(true)}>Open Modal</MriButton>
        {open && (
           <MriModal onClose={() => setOpen(false)}>
             <div className="p-4">
               <h2 className="text-lg font-bold mb-4">Modal Content</h2>
               <p>This is a raw modal without the default Dialog styling.</p>
               <MriButton className="mt-4" onClick={() => setOpen(false)}>Close</MriButton>
             </div>
           </MriModal>
        )}
      </>
    );
};

export const Default: StoryObj<typeof MriModal> = {
    render: () => <ModalDemo />
};
