import type { Meta, StoryObj } from '@storybook/react';
import { MriPlayerScreenStream } from './MriPlayerScreenStream';

const meta: Meta<typeof MriPlayerScreenStream> = {
    title: 'Organisms/MriPlayerScreenStream',
    component: MriPlayerScreenStream,
    tags: ['autodocs'],
    argTypes: {
        onSendNui: { action: 'onSendNui' },
        onNuiEvent: { action: 'onNuiEvent' },
    },
};

export default meta;
type Story = StoryObj<typeof MriPlayerScreenStream>;

export const MockFeed: Story = {
    args: {
        playerId: 102,
        playerName: 'John Doe',
        isMock: true,
        autoPlay: true,
        muted: true,
        className: 'w-full max-w-[800px] aspect-video',
    },
};

export const WithKeyboard: Story = {
    args: {
        playerId: 102,
        playerName: 'John Doe',
        isMock: true,
        showKeyboard: true,
        autoPlay: true,
        muted: true,
        className: 'w-full max-w-[800px] aspect-video',
    },
};

export const Loading: Story = {
    args: {
        playerId: 102,
        playerName: 'John Doe',
        isMock: false, // Will stay loading since no signaling is provided
        className: 'w-full max-w-[800px] aspect-video',
    },
};
