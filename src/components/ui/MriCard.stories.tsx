import type { Meta, StoryObj } from '@storybook/react'
import {
  MriCard,
  MriCardContent,
  MriCardDescription,
  MriCardFooter,
  MriCardHeader,
  MriCardTitle,
} from './MriCard'
import { MriButton } from './MriButton'
import { MriInput } from './MriInput'
import { MriBadge } from './MriBadge'

const meta = {
  title: 'UI/MriCard',
  component: MriCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MriCard>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: (args) => (
    <MriCard className="w-[350px]" {...args}>
      <MriCardHeader>
        <MriCardTitle>Card Title</MriCardTitle>
        <MriCardDescription>Card Description</MriCardDescription>
      </MriCardHeader>
      <MriCardContent>
        <p>Card Content</p>
      </MriCardContent>
      <MriCardFooter>
        <p>Card Footer</p>
      </MriCardFooter>
    </MriCard>
  ),
}

export const Interactive: Story = {
  render: (args) => (
    <MriCard className="w-[350px]" {...args}>
      <MriCardHeader>
        <MriCardTitle>Create project</MriCardTitle>
        <MriCardDescription>Deploy your new project in one-click.</MriCardDescription>
      </MriCardHeader>
      <MriCardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <MriInput id="name" placeholder="Name of your project" />
          </div>
        </div>
      </MriCardContent>
      <MriCardFooter className="flex justify-between">
        <MriButton variant="outline">Cancel</MriButton>
        <MriButton>Deploy</MriButton>
      </MriCardFooter>
    </MriCard>
  ),
}

export const WithBadge: Story = {
    render: (args) => (
      <MriCard className="w-[350px]" {...args}>
        <MriCardHeader>
          <div className="flex justify-between items-center">
            <MriCardTitle>Notification</MriCardTitle>
            <MriBadge variant="secondary">New</MriBadge>
          </div>
          <MriCardDescription>You have 3 unread messages.</MriCardDescription>
        </MriCardHeader>
        <MriCardContent>
          <p>Check your inbox for more details.</p>
        </MriCardContent>
        <MriCardFooter>
            <MriButton className="w-full">Mark all as read</MriButton>
        </MriCardFooter>
      </MriCard>
    ),
  }
