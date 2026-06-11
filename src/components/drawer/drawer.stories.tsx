import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "./drawer";

const meta = {
  title: "Navigation/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <div className="flex flex-col gap-3 p-5">
          <DrawerTitle className="text-base [font-weight:var(--font-weight-strong)]">
            Navigation
          </DrawerTitle>
          <nav className="flex flex-col gap-1 text-sm text-muted">
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">Home</span>
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">
              Projects
            </span>
            <span className="cursor-pointer rounded-sm px-2 py-2 hover:bg-accent-soft">
              Settings
            </span>
          </nav>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" className="mt-auto">
              Close
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
