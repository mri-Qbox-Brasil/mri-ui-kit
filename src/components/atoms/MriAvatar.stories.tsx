import type { Meta, StoryObj } from '@storybook/react';
import { MriAvatar, MriAvatarImage, MriAvatarFallback } from './MriAvatar';

const meta: Meta<typeof MriAvatar> = {
  title: 'Atoms/MriAvatar',
  component: MriAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
export const WithImage: StoryObj = {
  render: () => (
    <MriAvatar>
      <MriAvatarImage
        src="https://avatars.githubusercontent.com/u/164149697?v=4"
        alt="mri-Qbox"
      />
      <MriAvatarFallback>MR</MriAvatarFallback>
    </MriAvatar>
  ),
};

export const FallbackOnly: StoryObj = {
  render: () => (
    <MriAvatar>
      <MriAvatarImage src="" alt="broken" />
      <MriAvatarFallback>JD</MriAvatarFallback>
    </MriAvatar>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-4">
      <MriAvatar className="h-8 w-8">
        <MriAvatarImage src="https://avatars.githubusercontent.com/u/164149697?v=4" />
        <MriAvatarFallback>SM</MriAvatarFallback>
      </MriAvatar>
      <MriAvatar>
        <MriAvatarImage src="https://avatars.githubusercontent.com/u/164149697?v=4" />
        <MriAvatarFallback>MD</MriAvatarFallback>
      </MriAvatar>
      <MriAvatar className="h-16 w-16">
        <MriAvatarImage src="https://avatars.githubusercontent.com/u/164149697?v=4" />
        <MriAvatarFallback>LG</MriAvatarFallback>
      </MriAvatar>
      <MriAvatar className="h-24 w-24">
        <MriAvatarImage src="https://avatars.githubusercontent.com/u/164149697?v=4" />
        <MriAvatarFallback>XL</MriAvatarFallback>
      </MriAvatar>
    </div>
  ),
};

export const Group: StoryObj = {
  render: () => (
    <div className="flex -space-x-3">
      {[1, 2, 3, 4].map((i) => (
        <MriAvatar key={i} className="border-2 border-background">
          <MriAvatarImage src={`https://i.pravatar.cc/80?img=${i}`} />
          <MriAvatarFallback>U{i}</MriAvatarFallback>
        </MriAvatar>
      ))}
    </div>
  ),
};
