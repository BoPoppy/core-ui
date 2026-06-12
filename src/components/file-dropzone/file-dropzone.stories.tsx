import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileDropzone } from "./file-dropzone";

const meta = {
  title: "Advanced/FileDropzone",
  component: FileDropzone,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof FileDropzone>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleFile: Story = { args: { multiple: false, title: "Drop a single file" } };
