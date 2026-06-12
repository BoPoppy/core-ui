import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileDropzone } from "./file-dropzone";

const meta = {
  title: "Advanced/FileDropzone",
  component: FileDropzone,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A drag-and-drop file picker that also accepts clicks to open the native file browser. Selected files are listed with their size, a progress fill animation, and a remove button.

### When to use
- Uploading one or more attachments, images or documents where drag-and-drop is convenient.
- Restrict accepted types with \`accept\` and limit to a single file with \`multiple={false}\`.

The component manages its own file list internally and reports changes through \`onFilesChange\` — wire that to your upload logic.

### Usage
\`\`\`tsx
import { FileDropzone } from "@fv/ui";

<FileDropzone
  accept="image/*,.pdf"
  onFilesChange={(files) => upload(files)}
/>

// Single-file mode replaces the selection each time
<FileDropzone multiple={false} title="Drop a single file" />
\`\`\`

### Accessibility
The drop target is a \`role="button"\` element that is keyboard-focusable (\`tabIndex={0}\`) and activates on Enter/Space, mirroring the click behavior. When \`disabled\` it sets \`aria-disabled\` and removes itself from the tab order. Each listed file gets a "Remove {name}" labelled button.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — the dashed border, accent hover/drag tint and the upload-fill animation all derive from tokens.
`.trim(),
      },
    },
  },
  argTypes: {
    accept: {
      control: "text",
      description: "Comma-separated list of accepted file types, forwarded to the file input.",
      table: { type: { summary: "string" } },
    },
    multiple: {
      control: "boolean",
      description: "Allow selecting several files. When `false`, each pick replaces the list.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    disabled: {
      control: "boolean",
      description: "Dim the zone and block interaction.",
      table: { type: { summary: "boolean" } },
    },
    onFilesChange: {
      control: false,
      description: "Called with the current `File[]` whenever the selection changes.",
      table: { type: { summary: "(files: File[]) => void" } },
    },
    title: {
      control: "text",
      description: "Primary prompt text inside the zone.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Drop files here, or click to browse"' },
      },
    },
    description: {
      control: "text",
      description: "Secondary hint below the title.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"PNG, JPG or PDF up to 10MB"' },
      },
    },
  },
} satisfies Meta<typeof FileDropzone>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleFile: Story = {
  args: { multiple: false, title: "Drop a single file" },
  parameters: {
    docs: {
      description: {
        story: "With `multiple={false}`, picking a new file replaces the current selection.",
      },
    },
  },
};
