import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircularProgress, Progress, Spinner } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Progress indicators for ongoing work. The module exports three: \`Progress\` (linear bar), \`CircularProgress\` (a percentage ring) and \`Spinner\` (a small indeterminate loader).

### When to use
- **Determinate** (\`value\` 0–100) when the completion fraction is known — uploads, multi-step jobs.
- **Indeterminate** (\`Progress\` without \`value\`, or \`Spinner\`) when duration is unknown — fetching, connecting.
- **\`CircularProgress\`** for compact, inline or tile contexts where a ring reads better than a bar.

For a loading placeholder that mimics page layout, use \`Skeleton\` instead.

### Usage
\`\`\`tsx
import { Progress, CircularProgress, Spinner } from "@fv/ui";

<Progress value={65} />          // determinate bar
<Progress />                     // indeterminate bar
<CircularProgress value={30} showLabel />
<Spinner />
\`\`\`

### Accessibility
\`Progress\` and \`CircularProgress\` set \`role="progressbar"\` with \`aria-valuemin={0}\`, \`aria-valuemax={100}\` and \`aria-valuenow\` (omitted when indeterminate). \`Spinner\` uses \`role="status"\` with \`aria-label="Loading"\`. The percentage shown by \`showLabel\` is decorative — the value is already exposed via aria.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — track and fill colors (accent), radius and border weight (Pop adds a hard \`fg\` border) all come from tokens.
`.trim(),
      },
    },
  },
  // The linear bar is `w-full`, so give every story a real width to render into
  // (Storybook's `centered` layout otherwise shrink-wraps it to ~zero).
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Completion percentage (0–100). Omit for an indeterminate bar.",
      table: { type: { summary: "number" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  args: { value: 65 },
  parameters: {
    docs: { description: { story: "Determinate bar — `value` drives the fill width." } },
  },
};
export const Indeterminate: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "With no `value`, the bar animates continuously for unknown-duration work.",
      },
    },
  },
};

export const Circular: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CircularProgress` rings (with and without `showLabel`) plus an indeterminate `Spinner`.",
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={65} showLabel />
      <CircularProgress value={30} />
      <Spinner />
    </div>
  ),
};
