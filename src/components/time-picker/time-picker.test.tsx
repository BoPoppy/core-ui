import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TimePicker } from "./time-picker";

describe("TimePicker", () => {
  it("toggles the period", async () => {
    const onValueChange = vi.fn();
    render(
      <TimePicker
        defaultValue={{ hour: 9, minute: 0, period: "AM" }}
        onValueChange={onValueChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Toggle AM/PM" }));
    expect(onValueChange).toHaveBeenCalledWith({ hour: 9, minute: 0, period: "PM" });
  });

  it("steps the hour with arrow keys and wraps 12→1", async () => {
    const onValueChange = vi.fn();
    render(
      <TimePicker
        defaultValue={{ hour: 12, minute: 0, period: "AM" }}
        onValueChange={onValueChange}
      />,
    );
    screen.getByLabelText("Hour").focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(onValueChange).toHaveBeenLastCalledWith({ hour: 1, minute: 0, period: "AM" });
  });
});
