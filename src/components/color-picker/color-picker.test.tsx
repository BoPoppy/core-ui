import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ColorPicker } from "./color-picker";

describe("ColorPicker", () => {
  it("selects a color from a swatch", async () => {
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: "#22c55e" }));
    expect(onValueChange).toHaveBeenCalledWith("#22c55e");
  });

  it("applies a typed hex value on blur", async () => {
    const onValueChange = vi.fn();
    render(<ColorPicker onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Hex color");
    await userEvent.clear(input);
    await userEvent.type(input, "ff0000");
    await userEvent.tab();
    expect(onValueChange).toHaveBeenCalledWith("#ff0000");
  });
});
