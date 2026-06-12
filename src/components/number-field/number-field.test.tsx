import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberField } from "./number-field";

describe("NumberField", () => {
  it("increments and clamps to max", async () => {
    const onValueChange = vi.fn();
    render(<NumberField defaultValue={9} max={10} onValueChange={onValueChange} aria-label="n" />);
    const inc = screen.getByRole("button", { name: "Increment" });
    await userEvent.click(inc);
    expect(onValueChange).toHaveBeenLastCalledWith(10);
    expect(inc).toBeDisabled();
  });

  it("decrements", async () => {
    const onValueChange = vi.fn();
    render(<NumberField defaultValue={5} step={2} onValueChange={onValueChange} aria-label="n" />);
    await userEvent.click(screen.getByRole("button", { name: "Decrement" }));
    expect(onValueChange).toHaveBeenCalledWith(3);
  });
});
