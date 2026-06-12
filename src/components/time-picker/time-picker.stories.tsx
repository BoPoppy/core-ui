import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimePicker } from "./time-picker";

const meta = {
  title: "Advanced/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A segmented 12-hour time entry: editable hour and minute fields with an AM/PM toggle. The value is a structured \`{ hour, minute, period }\` object rather than a string.

### When to use
- Entering a specific time of day — appointment slots, reminders, schedules.
- When you want predictable, keyboard-friendly numeric entry rather than parsing free text.

For picking a calendar date use a DatePicker; combine the two when you need a full date-and-time.

### Usage
\`\`\`tsx
import { TimePicker, type TimeValue } from "@fv/ui";

// Uncontrolled
<TimePicker defaultValue={{ hour: 9, minute: 30, period: "AM" }} />

// Controlled, snapping minutes to 5
const [time, setTime] = useState<TimeValue>({ hour: 2, minute: 15, period: "PM" });
<TimePicker value={time} onValueChange={setTime} minuteStep={5} />
\`\`\`

### Accessibility
- Hour and minute are real \`<input inputMode="numeric">\` fields labelled "Hour" and "Minute"; **Arrow Up/Down** step the value (minutes by \`minuteStep\`) and wrap at their bounds.
- The period control is a \`<button>\` labelled "Toggle AM/PM" that flips between AM and PM.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — surface, border weight, focus ring, and the AM/PM pill.
`.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: "Controlled time. Pair with `onValueChange`.",
      table: { type: { summary: "TimeValue" } },
    },
    defaultValue: {
      control: false,
      description: "Initial time when uncontrolled.",
      table: { type: { summary: "TimeValue" }, defaultValue: { summary: "12:00 AM" } },
    },
    onValueChange: {
      control: false,
      description: "Called with the next `{ hour, minute, period }` on any change.",
      table: { type: { summary: "(value: TimeValue) => void" } },
    },
    minuteStep: {
      control: "number",
      description: "Amount the minute field increments per Arrow Up/Down press.",
      table: { type: { summary: "number" }, defaultValue: { summary: "1" } },
    },
    disabled: {
      control: "boolean",
      description: "Prevent interaction and dim the field.",
      table: { defaultValue: { summary: "false" } },
    },
  },
} satisfies Meta<typeof TimePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: { hour: 9, minute: 30, period: "AM" } },
  parameters: {
    docs: {
      description: {
        story: "Edit the fields directly or use Arrow Up/Down to step; the button toggles AM/PM.",
      },
    },
  },
};
export const FiveMinuteStep: Story = {
  args: { minuteStep: 5, defaultValue: { hour: 2, minute: 15, period: "PM" } },
  parameters: {
    docs: {
      description: {
        story: "`minuteStep={5}` makes Arrow keys jump the minute field in 5-minute increments.",
      },
    },
  },
};
