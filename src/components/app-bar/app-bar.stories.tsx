import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../avatar/avatar";
import { AppBar, AppBarIcon, AppBarSpacer, AppBarTitle } from "./app-bar";

const meta = {
  title: "Surfaces/AppBar",
  component: AppBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A top application bar in the accent color. Compose it freely from the supplied parts — \`AppBarIcon\` for icon buttons, \`AppBarTitle\` for the heading, and \`AppBarSpacer\` to push trailing content to the end.

### When to use
- Provide a persistent header for app-shell layouts: branding/title, navigation triggers, and account or action controls.

For in-page section toolbars or filter rows, a plain flex container is usually enough; reach for the AppBar when you want the accent-colored, elevated application header.

### Usage
\`\`\`tsx
import { AppBar, AppBarIcon, AppBarTitle, AppBarSpacer, Avatar } from "@fv/ui";

<AppBar>
  <AppBarIcon aria-label="Open menu"><MenuIcon /></AppBarIcon>
  <AppBarTitle>Dashboard</AppBarTitle>
  <AppBarSpacer />
  <Avatar size="sm" fallback="TV" />
</AppBar>
\`\`\`

### Accessibility
Renders a semantic \`<header>\` landmark. \`AppBarIcon\` is a native \`<button type="button">\` — always give icon-only buttons an \`aria-label\`. \`AppBarTitle\` is a plain \`<span>\`; wrap or replace it with a heading element if it should be the page title in the document outline.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the accent background, foreground, radius, elevation, and Pop's border all derive from theme variables.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof AppBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppBar className="w-full">
      <AppBarIcon aria-label="Open menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
        </svg>
      </AppBarIcon>
      <AppBarTitle>Dashboard</AppBarTitle>
      <AppBarSpacer />
      <Avatar size="sm" fallback="TV" className="border-white/30" />
    </AppBar>
  ),
};
