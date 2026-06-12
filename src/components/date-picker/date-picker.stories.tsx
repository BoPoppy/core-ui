import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, DatePicker } from "./date-picker";

const meta = {
  title: "Advanced/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A single-date picker — a text trigger that opens a month-grid \`Calendar\` in a popover, with a today marker and month navigation.

### When to use
- Choosing one calendar date (a due date, a birthday, an appointment).
- When a compact, click-to-reveal calendar is preferable to a free-text field.

For selecting a start→end span use DateRangePicker. The \`Calendar\` is also exported on its own for inline, always-visible use.

### Usage
\`\`\`tsx
import { DatePicker, Calendar } from "@fv/ui";

// Uncontrolled trigger + popover calendar
<DatePicker defaultValue={new Date()} onValueChange={setDate} />

// Custom display format
<DatePicker value={date} onValueChange={setDate} format={(d) => d.toISOString().slice(0, 10)} />

// Inline calendar (no popover)
<Calendar value={date} onSelect={setDate} />
\`\`\`

### Accessibility
- The trigger is a labelled \`<button>\` (\`aria-label\` defaults to "Pick a date") and inherits the popover's open/close keyboard handling.
- Calendar day cells are \`<button>\`s with \`aria-pressed\` for the selected day and an \`aria-label\` of the full date; month nav buttons are labelled "Previous month" / "Next month".

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — day cells are circular in Pebble, the selection/today accent and border weight follow the active theme.
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "Controlled selected date. Pair with `onValueChange`.",
      table: { type: { summary: "Date" } },
    },
    defaultValue: {
      control: false,
      description: "Initial date when uncontrolled.",
      table: { type: { summary: "Date" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the picked `Date` when a day is selected.",
      table: { type: { summary: "(date: Date) => void" } },
    },
    format: {
      control: false,
      description: "Format the selected date for display in the trigger.",
      table: {
        type: { summary: "(date: Date) => string" },
        defaultValue: { summary: "d.toLocaleDateString()" },
      },
    },
    placeholder: {
      control: "text",
      description: "Trigger text when no date is selected.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Pick a date"' } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the trigger.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-label": {
      control: "text",
      description: "Accessible name for the trigger button.",
      table: { type: { summary: "string" }, defaultValue: { summary: '"Pick a date"' } },
    },
  },
} satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InlineCalendar: Story = {
  parameters: {
    docs: {
      description: {
        story: "The exported `Calendar` rendered on its own, without the popover trigger.",
      },
    },
  },
  render: () => (
    <div className="rounded-md bg-surface border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] shadow-1">
      <Calendar />
    </div>
  ),
};
