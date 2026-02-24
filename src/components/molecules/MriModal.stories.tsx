import type { Meta, StoryObj } from '@storybook/react';
import { MriModal } from './MriModal';
import { MriButton } from '@/components/atoms/MriButton';
import { useState } from 'react';

const meta: Meta<typeof MriModal> = {
  title: 'Molecules/MriModal',
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

export const PortalTest: StoryObj<typeof MriModal> = {
  render: () => (
    <div className="relative h-[200px] w-[300px] overflow-hidden border border-dashed border-red-500 flex items-center justify-center">
      <p className="text-xs text-red-500 text-center px-4">This container has <code>overflow: hidden</code> and small dimensions. The modal should still appear centered on screen.</p>
      <MriModal onClose={() => {}}>
        <div className="p-4 bg-card border border-border rounded-lg shadow-xl">
           <h3 className="font-bold">Portal works!</h3>
           <p className="text-sm text-foreground">I'm rendered outside the red box.</p>
        </div>
      </MriModal>
    </div>
  )
};
