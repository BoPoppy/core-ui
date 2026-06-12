import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BottomNav } from "./bottom-nav";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A mobile-style bottom navigation bar — a row of icon + label tabs for switching between the top-level destinations of an app.

### When to use
- Three to five primary destinations on a phone-width layout, pinned to the bottom of the screen.
- When destinations are peers (e.g. Home / Search / Profile) rather than a hierarchy.

For navigation that sits at the top of a desktop layout, prefer [Tabs](/docs/navigation-tabs--docs) or an AppBar. For a single floating action, use a FAB.

### Usage
\`\`\`tsx
import { BottomNav } from "@fv/ui";

const [tab, setTab] = useState("home");

<BottomNav
  value={tab}
  onValueChange={setTab}
  items={[
    { value: "home", label: "Home", icon: <HomeIcon /> },
    { value: "search", label: "Search", icon: <SearchIcon /> },
    { value: "profile", label: "Profile", icon: <ProfileIcon /> },
  ]}
/>
\`\`\`

### Accessibility
- Renders a \`<nav>\` wrapping native \`<button type="button">\` tabs, so each item is keyboard-focusable and activates on Enter/Space.
- The active item gets \`aria-current="page"\`. Provide meaningful text in each item's \`label\`; icons are marked \`aria-hidden\`.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark themes — surface, active accent, border weight and radius all come from CSS tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    items: {
      control: false,
      description:
        "Tabs to render. Each item is `{ value, label, icon }`; `value` identifies the tab, `label` is the visible text, `icon` is rendered above it.",
      table: { type: { summary: "BottomNavItem[]" } },
    },
    value: {
      control: false,
      description: "The `value` of the currently active tab (controlled).",
      table: { type: { summary: "string" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the selected tab's `value` when a tab is clicked.",
      table: { type: { summary: "(value: string) => void" } },
    },
  },
  args: { items: [], value: "", onValueChange: () => {} },
} satisfies Meta<typeof BottomNav>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("home");
    return (
      <BottomNav
        className="w-[360px]"
        value={value}
        onValueChange={setValue}
        items={[
          { value: "home", label: "Home", icon: icon("M3 11l9-8 9 8M5 10v10h14V10") },
          {
            value: "search",
            label: "Search",
            icon: icon("M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z"),
          },
          {
            value: "profile",
            label: "Profile",
            icon: icon("M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"),
          },
        ]}
      />
    );
  },
};
