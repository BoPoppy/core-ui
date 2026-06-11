import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button/button";
import { ToastProvider, useToast } from "./toast";

function Harness() {
  const { toast } = useToast();
  return <Button onClick={() => toast({ title: "Saved", description: "Done" })}>Notify</Button>;
}

describe("Toast", () => {
  it("shows a toast when triggered", async () => {
    render(
      <ToastProvider>
        <Harness />
      </ToastProvider>,
    );
    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Notify" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("throws when useToast is used outside a provider", () => {
    function Bad() {
      useToast();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/ToastProvider/);
  });
});
