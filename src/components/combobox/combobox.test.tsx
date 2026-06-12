import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./combobox";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
];

describe("Combobox", () => {
  it("toggles selection of options", async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Multi-select" }));
    await userEvent.click(screen.getByRole("option", { name: "Alpha" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["a"]);
  });

  it("removes a selected chip", async () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} defaultValue={["a", "b"]} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove Alpha" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["b"]);
  });
});
