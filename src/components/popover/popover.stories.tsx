import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import { TextField } from "../input/input";
import { Popover, PopoverBody, PopoverContent, PopoverTitle, PopoverTrigger } from "./popover";

const meta = {
  title: "Data display/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <PopoverTitle>Display name</PopoverTitle>
          <p className="text-[13px] leading-relaxed text-muted">Shown across your workspace.</p>
          <TextField defaultValue="Tri Vo" aria-label="Display name" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
};
