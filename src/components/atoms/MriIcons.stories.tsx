import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from './MriIcons';

const meta: Meta = {
  title: 'Atoms/MriIcons',
  tags: ['autodocs'],
};

export default meta;

export const AllIcons: StoryObj = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-4 text-primary">
       {Object.entries(Icons).map(([name, IconComponent]) => {
         if (name === 'default') return null;
         return (
           <div key={name} className="flex flex-col items-center justify-center p-4 border rounded hover:bg-muted/50">
             {/* @ts-expect-error - IconComponent type is dynamic */}
             <IconComponent className="w-8 h-8 mb-2" />
             <span className="text-xs text-muted-foreground">{name}</span>
           </div>
         );
       })}
    </div>
  ),
};
