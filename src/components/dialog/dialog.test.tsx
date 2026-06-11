import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Dialog, DialogBody, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

describe("Dialog", () => {
  it("opens on trigger and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogBody>
            <DialogTitle>Title</DialogTitle>
          </DialogBody>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
