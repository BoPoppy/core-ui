import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./radio";

describe("RadioGroup", () => {
  it("renders with role=radiogroup", () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Option A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });
});

describe("Radio", () => {
  it("renders a radio button with a label", () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Option A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Option A" })).toBeInTheDocument();
  });

  it("reflects checked state when defaultValue matches", () => {
    render(
      <RadioGroup defaultValue="b">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Option B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Option A" })).not.toBeChecked();
  });

  it("calls onValueChange when a radio is selected", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Option A" }));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("is disabled when the disabled prop is set", () => {
    render(
      <RadioGroup>
        <Radio value="a" label="Disabled Option" disabled />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Disabled Option" })).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
