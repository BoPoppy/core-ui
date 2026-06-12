import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { ToastProvider, useToast } from "./toast";

const Demo = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ variant: "success", title: "Uploaded", description: "3 files added." })
        }
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: "danger",
            title: "Failed",
            description: "Could not connect.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        With action
      </Button>
    </div>
  );
};

const meta = {
  title: "Feedback/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: null },
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
