import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from "./popover";

describe("Popover", () => {
  it("opens on trigger click and closes on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverBody>Panel content</PopoverBody>
        </PopoverContent>
      </Popover>,
    );

    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
    await user.click(screen.getByText("Open"));
    expect(screen.getByText("Panel content")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
  });
});
