import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { type CommandItem, CommandPalette, useCommandPaletteShortcut } from "./command-palette";

const meta = {
  title: "Advanced/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { open: false, onOpenChange: () => {}, items: [] },
} satisfies Meta<typeof CommandPalette>;
export default meta;
type Story = StoryObj<typeof meta>;

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    useCommandPaletteShortcut(() => setOpen((o) => !o));
    const items: CommandItem[] = [
      {
        id: "new",
        label: "New file",
        group: "Actions",
        shortcut: "⌘N",
        icon: icon("M12 5v14M5 12h14"),
        onSelect: () => {},
      },
      {
        id: "search",
        label: "Search files",
        group: "Actions",
        shortcut: "⌘P",
        icon: icon("M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z"),
        onSelect: () => {},
      },
      {
        id: "settings",
        label: "Open settings",
        group: "Navigate",
        shortcut: "⌘,",
        icon: icon("M12 15a3 3 0 100-6 3 3 0 000 6z"),
        onSelect: () => {},
      },
      {
        id: "theme",
        label: "Toggle theme",
        group: "Navigate",
        icon: icon("M12 3v2m0 14v2M5 12H3m18 0h-2"),
        onSelect: () => {},
      },
    ];
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open palette (⌘K)
        </Button>
        <CommandPalette open={open} onOpenChange={setOpen} items={items} />
      </>
    );
  },
};
