import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paper } from "./paper";

const meta = {
  title: "Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A plain elevated surface — a themed \`<div>\` with padding, a border, rounded corners and one of four shadow elevations. The low-level building block other surfaces sit on.

### When to use
- Group related content onto a raised panel: cards, sidebars, form sections, summary boxes.
- When you need a neutral container and want elevation/border/radius to follow the theme automatically.

For a structured card with header/media/footer slots, reach for \`Card\` instead; Paper is intentionally unopinionated about its contents.

### Usage
\`\`\`tsx
import { Paper } from "@fv/ui";

<Paper elevation={2}>
  <h3>Monthly summary</h3>
  <p>…</p>
</Paper>

// Flat panel with no shadow
<Paper elevation={0}>…</Paper>
\`\`\`

### Accessibility
Renders a generic \`<div>\` and adds no implicit semantics, so apply a landmark role or heading structure to its contents as the context requires. All native \`div\` props (including \`role\` and \`aria-*\`) pass through.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface color, radius, border weight (Pop adds a hard \`fg\` border) and each elevation's shadow all come from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    elevation: {
      control: "inline-radio",
      options: [0, 1, 2, 3],
      description: "Shadow depth; 0 is flat (border only).",
      table: { type: { summary: "0 | 1 | 2 | 3" }, defaultValue: { summary: "1" } },
    },
  },
} satisfies Meta<typeof Paper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Elevations: Story = {
  parameters: {
    docs: { description: { story: "The four elevation levels, flat (0) through highest (3)." } },
  },
  render: () => (
    <div className="flex gap-5">
      {([0, 1, 2, 3] as const).map((e) => (
        <Paper key={e} elevation={e} className="grid size-24 place-items-center text-sm text-muted">
          {e}
        </Paper>
      ))}
    </div>
  ),
};
