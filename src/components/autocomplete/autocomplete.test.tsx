import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Autocomplete } from "./autocomplete";

const options = ["Apple", "Banana", "Cherry"];

describe("Autocomplete", () => {
  it("filters options as you type", async () => {
    render(<Autocomplete options={options} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getAllByRole("option")).toHaveLength(3);
    await userEvent.keyboard("ch");
    expect(screen.getByRole("option")).toHaveTextContent("Cherry");
  });

  it("selects via keyboard", async () => {
    const onValueChange = vi.fn();
    render(<Autocomplete options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    // opens with the first option active; one ArrowDown moves to the second.
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith("Banana");
  });

  it("names the input with its visible label", () => {
    render(<Autocomplete options={options} label="Assign a teammate" />);
    expect(screen.getByRole("combobox", { name: "Assign a teammate" })).toBeInTheDocument();
  });
});
