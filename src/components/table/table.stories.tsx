import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../badge/badge";
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from "./table";

const meta = {
  title: "Data display/Table",
  component: Table,
  tags: ["autodocs"],
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
