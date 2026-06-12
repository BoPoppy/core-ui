import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OTPInput } from "./otp-input";

describe("OTPInput", () => {
  it("auto-advances and calls onComplete when filled", async () => {
    const onComplete = vi.fn();
    render(<OTPInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
    inputs[0]?.focus();
    await userEvent.keyboard("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("ignores non-numeric input", async () => {
    const onValueChange = vi.fn();
    render(<OTPInput length={4} onValueChange={onValueChange} />);
    screen.getAllByRole("textbox")[0]?.focus();
    await userEvent.keyboard("a");
    expect(onValueChange).not.toHaveBeenCalledWith(expect.stringContaining("a"));
  });
});
