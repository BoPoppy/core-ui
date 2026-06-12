import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { type CommandItem, CommandPalette, useCommandPaletteShortcut } from "./command-palette";

const meta = {
  title: "Advanced/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A ⌘K-style searchable command menu. Opens in a centered overlay, filters commands as you type, and groups them by category — built on Radix Dialog so it gets a focus trap, Esc-to-close and a scrim for free.

### When to use
- A power-user shortcut to actions and navigation that would otherwise be buried in menus.
- Apps with many commands where typing is faster than pointing.

For a simple action menu attached to a button, use a Menu instead.

### Usage
\`\`\`tsx
import { CommandPalette, useCommandPaletteShortcut } from "@fv/ui";

const [open, setOpen] = useState(false);
useCommandPaletteShortcut(() => setOpen((o) => !o)); // binds ⌘K / Ctrl-K

const items = [
  { id: "new", label: "New file", group: "Actions", shortcut: "⌘N", onSelect: createFile },
  { id: "settings", label: "Open settings", group: "Navigate", onSelect: openSettings },
];

<CommandPalette open={open} onOpenChange={setOpen} items={items} />
\`\`\`

Each item can carry an \`icon\`, \`shortcut\`, \`group\`, and extra \`keywords\` to widen what the query matches.

### Accessibility
- Inherits Radix Dialog a11y: focus trap, Esc to close, scrim, and restored focus on close. The dialog is labelled "Command palette".
- The input is \`role="combobox"\` with \`aria-controls\` and \`aria-activedescendant\` tracking the highlighted result; the results list is \`role="listbox"\` with \`role="option"\` rows.
- Keyboard: ↑/↓ move the selection, Enter runs the active item, Esc closes. The input is auto-focused on open.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, border weight, icon chips and the active-row highlight all follow the active theme.
`.trim(),
      },
    },
  },
  argTypes: {
    open: {
      control: false,
      description: "Whether the palette is visible. Controlled.",
      table: { type: { summary: "boolean" } },
    },
    onOpenChange: {
      control: false,
      description:
        "Called when the palette requests to open or close (Esc, scrim, or running an item).",
      table: { type: { summary: "(open: boolean) => void" } },
    },
    items: {
      control: false,
      description:
        "Commands to show. Each has `id`, `label`, `onSelect`, and optional `icon`/`shortcut`/`group`/`keywords`.",
      table: { type: { summary: "CommandItem[]" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Type a command or search…"' },
      },
    },
    emptyMessage: {
      control: "text",
      description: "Message shown when no command matches the query.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"No results found."' } },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Press ⌘K (or the button) to open, type to filter, ↑/↓ to move, Enter to run, Esc to close.",
      },
    },
  },
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
