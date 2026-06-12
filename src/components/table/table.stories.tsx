import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../badge/badge";
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from "./table";

const meta = {
  title: "Data display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A composable, token-styled data table. \`Table\` renders the bordered wrapper plus the \`<table>\`; you assemble rows from the \`TableHeader\`, \`TableBody\`, \`TableRow\`, \`TableHead\`, and \`TableCell\` parts.

### When to use
- Presenting structured, scannable rows of records (people, transactions, line items).
- When columns map cleanly onto data fields and rows are comparable.

For non-tabular, free-form content prefer a List; for a key/value layout of one record, a description list is clearer than a one-row table.

### Usage
\`\`\`tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@fv/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell>Engineer</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Empty / error state spanning all columns
import { TableEmpty } from "@fv/ui";
<TableBody>
  <TableEmpty colSpan={2}>No results.</TableEmpty>
</TableBody>
\`\`\`

### Accessibility
- Renders native \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<tr>\`, \`<th>\`, and \`<td>\` elements, so assistive tech gets proper table semantics for free.
- Use \`TableHead\` (\`<th>\`) for column headers; add \`scope="col"\`/\`scope="row"\` via standard attributes when a row header is needed.
- \`TableEmpty\` requires a \`colSpan\` so the message spans the full width.

### Theming
Re-skins across the **Pebble / Slate / Pop** personalities and light/dark via CSS tokens — border weight, radius, header treatment, and the row hover tint.
`.trim(),
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { name: "Ada Lovelace", role: "Engineer", status: "Active" },
  { name: "Alan Turing", role: "Researcher", status: "Active" },
  { name: "Grace Hopper", role: "Admiral", status: "Away" },
];

export const Default: Story = {
  render: () => (
    <Table className="w-[480px]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.name}>
            <TableCell className="font-semibold">{r.name}</TableCell>
            <TableCell>{r.role}</TableCell>
            <TableCell>
              <Badge variant={r.status === "Active" ? "success" : "neutral"} dot>
                {r.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`TableEmpty` renders a single full-width cell (`colSpan`) for empty or error states.",
      },
    },
  },
  render: () => (
    <Table className="w-[480px]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={3}>No team members yet.</TableEmpty>
      </TableBody>
    </Table>
  ),
};
