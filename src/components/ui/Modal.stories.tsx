import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
    render: () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Modal</Button>
          {open && (
             <Modal onClose={() => setOpen(false)}>
               <div className="p-4">
                 <h2 className="text-lg font-bold mb-4">Modal Content</h2>
                 <p>This is a raw modal without the default Dialog styling.</p>
                 <Button className="mt-4" onClick={() => setOpen(false)}>Close</Button>
               </div>
             </Modal>
          )}
        </>
      );
    }
  };
