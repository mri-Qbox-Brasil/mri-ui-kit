import type { Meta, StoryObj } from '@storybook/react';
import { MriModal } from './MriModal';
import { MriButton } from '@/components/atoms/MriButton';
import { MriSelect } from './MriSelect';
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

const PortalTestDemo = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative h-[200px] w-[300px] overflow-hidden border border-dashed border-red-500 flex flex-col items-center justify-center p-4">
            <p className="text-xs text-red-500 text-center mb-4">This container has <code>overflow: hidden</code> and small dimensions. The modal should still appear centered on screen.</p>
            <MriButton onClick={() => setOpen(true)}>Open Modal</MriButton>
            {open && (
                <MriModal onClose={() => setOpen(false)}>
                    <div className="p-4 bg-card border border-border rounded-lg shadow-xl">
                        <h3 className="font-bold">Portal works!</h3>
                        <p className="text-sm text-foreground">I'm rendered outside the red box.</p>
                        <MriButton className="mt-4" onClick={() => setOpen(false)}>Close</MriButton>
                    </div>
                </MriModal>
            )}
        </div>
    );
};

export const PortalTest: StoryObj<typeof MriModal> = {
    render: () => <PortalTestDemo />
};

const SearchInModalDemo = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const options = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
        { label: "Option 4", value: "4" },
        { label: "Option 5", value: "5" },
        { label: "Option 6", value: "6" },
        { label: "Option 7", value: "7" },
        { label: "Option 8", value: "8" },
        { label: "Option 9", value: "9" },
        { label: "Option 10", value: "10" },
    ];

    return (
        <>
            <MriButton onClick={() => setOpen(true)}>Open Modal with Search</MriButton>
            {open && (
                <MriModal onClose={() => setOpen(false)}>
                    <div className="p-6 space-y-4">
                        <h2 className="text-lg font-bold">Search Test</h2>
                        <p className="text-sm text-muted-foreground">Try to use the search component below. It should stay open when you interact with it and search results should be visible.</p>
                        <MriSelect
                            options={options}
                            value={value}
                            onChange={setValue}
                            placeholder="Select an option..."
                            portal={false}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <MriButton variant="outline" onClick={() => setOpen(false)}>Cancel</MriButton>
                            <MriButton onClick={() => setOpen(false)}>Save</MriButton>
                        </div>
                    </div>
                </MriModal>
            )}
        </>
    );
};

export const SearchInModal: StoryObj<typeof MriModal> = {
    render: () => <SearchInModalDemo />
};

const NoBlurDemo = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <MriButton onClick={() => setOpen(true)}>Open Modal (No Blur)</MriButton>
            {open && (
                <MriModal onClose={() => setOpen(false)} hideBlur={true}>
                    <div className="p-6">
                        <h2 className="text-lg font-bold mb-4">No Blur Modal</h2>
                        <p>The background should be darkened but NOT blurry.</p>
                        <MriButton className="mt-4" onClick={() => setOpen(false)}>Close</MriButton>
                    </div>
                </MriModal>
            )}
        </>
    );
};

export const NoBlur: StoryObj<typeof MriModal> = {
    render: () => <NoBlurDemo />
};

const FloatingDemo = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="h-[400px] w-full border border-dashed border-border rounded-xl flex items-center justify-center bg-muted/20 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <p className="text-muted-foreground animate-pulse text-sm">Background Content (Try clicking here while modal is open)</p>
            </div>
            <MriButton onClick={() => setOpen(true)}>Open Floating Modal</MriButton>
            {open && (
                <MriModal 
                    onClose={() => setOpen(false)} 
                    hideBlur 
                    hideOverlay 
                    isModal={false}
                >
                    <div className="p-6 space-y-4">
                        <h2 className="text-lg font-bold">Floating Modal</h2>
                        <p className="text-sm text-muted-foreground">This modal has no backdrop and doesn't block the screen.</p>
                        <MriButton onClick={() => setOpen(false)} className="w-full">Close</MriButton>
                    </div>
                </MriModal>
            )}
        </div>
    );
};

export const Floating: StoryObj<typeof MriModal> = {
    render: () => <FloatingDemo />
};
