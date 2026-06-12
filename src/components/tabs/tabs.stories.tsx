import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Switch between sibling views within the same context, keeping the user in place. Compose \`Tabs\` with \`TabsList\`, \`TabsTrigger\`, and (optionally) \`TabsContent\`.

### When to use
- Splitting related content into a few peer panels (Overview / Activity / Settings).
- A self-contained segmented control where each option reveals its own panel.

For moving between top-level destinations that change the URL, use navigation links rather than Tabs.

### Usage
\`\`\`tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fv/ui";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity">…</TabsContent>
</Tabs>

// "pill" variant for a compact segmented control
<TabsList variant="pill">…</TabsList>
\`\`\`

### Accessibility
- Built on [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs): triggers get \`role="tab"\`, panels \`role="tabpanel"\`, with roving-tabindex arrow-key navigation and matched \`aria-controls\`/\`aria-labelledby\` wiring.
- Active state is exposed via \`data-[state=active]\`; focus rings come from the design tokens.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the underline accent, pill radius, surface and shadow all follow the active theme.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default `underline` variant — an accent bar marks the active tab over a bottom border.",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">The overview panel.</TabsContent>
      <TabsContent value="activity">Recent activity here.</TabsContent>
      <TabsContent value="settings">Settings live here.</TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`variant="pill"` on `TabsList` renders a compact segmented control on a raised surface.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="day">
      <TabsList variant="pill">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};
