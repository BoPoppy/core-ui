import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./select";

describe("Select", () => {
  it("renders option children", () => {
    render(
      <Select>
        <option value="a">Alpha</option>
        <option value="b">Beta</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Beta" })).toBeInTheDocument();
  });

  it("renders a label linked to the select", () => {
    render(
      <Select label="Country">
        <option value="us">US</option>
      </Select>,
    );
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("renders a hint message", () => {
    render(
      <Select hint="Choose one">
        <option value="x">X</option>
      </Select>,
    );
    expect(screen.getByText("Choose one")).toBeInTheDocument();
  });

  it("renders an error message and sets aria-invalid", () => {
    render(
      <Select error="Required">
        <option value="x">X</option>
      </Select>,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("fires onChange when the value changes", async () => {
    const onChange = vi.fn();
    render(
      <Select onChange={onChange}>
        <option value="a">A</option>
        <option value="b">B</option>
      </Select>,
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "b");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is set", () => {
    render(
      <Select disabled>
        <option value="x">X</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Select label="Fruit" hint="Pick a fruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
