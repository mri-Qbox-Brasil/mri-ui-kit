import type { Meta, StoryObj } from '@storybook/react';
import {
  MriCommand,
  MriCommandInput,
  MriCommandList,
  MriCommandEmpty,
  MriCommandGroup,
  MriCommandItem,
  MriCommandShortcut,
  MriCommandSeparator,
} from './MriCommand';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';

const meta: Meta<typeof MriCommand> = {
  title: 'Molecules/MriCommand',
  component: MriCommand,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof MriCommand> = {
  render: () => (
    <div className="w-[450px] border rounded-lg shadow-md bg-popover">
        <MriCommand>
        <MriCommandInput placeholder="Type a command or search..." />
        <MriCommandList>
            <MriCommandEmpty>No results found.</MriCommandEmpty>
            <MriCommandGroup heading="Suggestions">
            <MriCommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
            </MriCommandItem>
            <MriCommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
            </MriCommandItem>
            <MriCommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
            </MriCommandItem>
            </MriCommandGroup>
            <MriCommandSeparator />
            <MriCommandGroup heading="Settings">
            <MriCommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <MriCommandShortcut>⌘P</MriCommandShortcut>
            </MriCommandItem>
            <MriCommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <MriCommandShortcut>⌘B</MriCommandShortcut>
            </MriCommandItem>
            <MriCommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <MriCommandShortcut>⌘S</MriCommandShortcut>
            </MriCommandItem>
            </MriCommandGroup>
        </MriCommandList>
        </MriCommand>
    </div>
  ),
};
