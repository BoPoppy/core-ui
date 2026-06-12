import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, RangeCalendar } from "./date-range";

const meta = {
  title: "Advanced/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A date-range picker — a text trigger that opens a \`RangeCalendar\` in a popover and selects a start→end span. The first click sets the start, the second sets the end (clicking an earlier day swaps the bounds), and the popover closes once both are set.

### When to use
- Choosing a span of dates (a reporting window, a booking, a filter range).

For a single date use DatePicker. The \`RangeCalendar\` is exported separately for inline, always-visible use.

### Usage
\`\`\`tsx
import { DateRangePicker, RangeCalendar, type DateRange } from "@fv/ui";

// Uncontrolled trigger + popover
<DateRangePicker onValueChange={(range) => console.log(range.start, range.end)} />

// Controlled
<DateRangePicker value={range} onValueChange={setRange} />

// Inline calendar (no popover)
<RangeCalendar value={range} onValueChange={setRange} />
\`\`\`

A \`DateRange\` is \`{ start?: Date; end?: Date }\`.

### Accessibility
- The trigger is a labelled \`<button>\` and inherits the popover's keyboard handling.
- Day cells are \`<button>\`s with an \`aria-label\` of the full date; in-range days are tinted and the start/end edges are highlighted. Month nav buttons are labelled "Previous month" / "Next month".

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the range fill, rounded edges and accent all follow the active theme.
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "Controlled `{ start, end }` range. Pair with `onValueChange`.",
      table: { type: { summary: "DateRange" } },
    },
    defaultValue: {
      control: false,
      description: "Initial range when uncontrolled.",
      table: { type: { summary: "DateRange" }, defaultValue: { summary: "{}" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the new `{ start, end }` whenever an endpoint changes.",
      table: { type: { summary: "(range: DateRange) => void" } },
    },
    format: {
      control: false,
      description: "Format each endpoint for display in the trigger.",
      table: {
        type: { summary: "(date: Date) => string" },
        defaultValue: { summary: "d.toLocaleDateString()" },
      },
    },
    placeholder: {
      control: "text",
      description: "Trigger text when no range is selected.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Pick a date range"' } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the trigger.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof DateRangePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InlineCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story: "The exported `RangeCalendar` on its own — click a start day, then an end day.",
      },
    },
  },
  render: () => (
    <div className="rounded-md bg-surface border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] shadow-1">
      <RangeCalendar />
    </div>
  ),
};
