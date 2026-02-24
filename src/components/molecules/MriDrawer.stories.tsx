import type { Meta, StoryObj } from '@storybook/react'
import {
  MriDrawer,
  MriDrawerClose,
  MriDrawerContent,
  MriDrawerDescription,
  MriDrawerFooter,
  MriDrawerHeader,
  MriDrawerTitle,
  MriDrawerTrigger,
} from './MriDrawer'
import { MriButton } from '@/components/atoms/MriButton'

const meta = {
  title: 'Molecules/MriDrawer',
  component: MriDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MriDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MriDrawer>
      <MriDrawerTrigger asChild>
        <MriButton variant="outline">Open Drawer</MriButton>
      </MriDrawerTrigger>
      <MriDrawerContent>
        <MriDrawerHeader>
          <MriDrawerTitle>Edit profile</MriDrawerTitle>
          <MriDrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </MriDrawerDescription>
        </MriDrawerHeader>
        <div className="p-4 py-8 text-center text-muted-foreground">
            Drawer content area
        </div>
        <MriDrawerFooter>
          <MriButton type="submit">Save changes</MriButton>
          <MriDrawerClose asChild>
            <MriButton variant="outline">Cancel</MriButton>
          </MriDrawerClose>
        </MriDrawerFooter>
      </MriDrawerContent>
    </MriDrawer>
  ),
}
