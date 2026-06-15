import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { ToggleButtons, ToggleButtonsItem } from "./toggle-buttons";

describe("ToggleButtons", () => {
  it("renders children inside the group", () => {
    render(
      <ToggleButtons type="single">
        <ToggleButtonsItem value="a">Alpha</ToggleButtonsItem>
        <ToggleButtonsItem value="b">Beta</ToggleButtonsItem>
      </ToggleButtons>,
    );
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders a group role", () => {
    render(
      <ToggleButtons type="single">
        <ToggleButtonsItem value="x">X</ToggleButtonsItem>
      </ToggleButtons>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("applies a custom className to the root", () => {
    render(
      <ToggleButtons type="single" className="my-custom-class">
        <ToggleButtonsItem value="x">X</ToggleButtonsItem>
      </ToggleButtons>,
    );
    expect(screen.getByRole("group")).toHaveClass("my-custom-class");
  });

  it("selects a single item on click", async () => {
    render(
      <ToggleButtons type="single">
        <ToggleButtonsItem value="one">One</ToggleButtonsItem>
        <ToggleButtonsItem value="two">Two</ToggleButtonsItem>
      </ToggleButtons>,
    );
    const one = screen.getByRole("radio", { name: "One" });
    await userEvent.click(one);
    expect(one).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("radio", { name: "Two" })).toHaveAttribute("data-state", "off");
  });

  it("calls onValueChange with the selected value in single mode", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleButtons type="single" onValueChange={onValueChange}>
        <ToggleButtonsItem value="yes">Yes</ToggleButtonsItem>
        <ToggleButtonsItem value="no">No</ToggleButtonsItem>
      </ToggleButtons>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "Yes" }));
    expect(onValueChange).toHaveBeenCalledWith("yes");
  });

  it("supports multiple selection", async () => {
    render(
      <ToggleButtons type="multiple">
        <ToggleButtonsItem value="a">A</ToggleButtonsItem>
        <ToggleButtonsItem value="b">B</ToggleButtonsItem>
      </ToggleButtons>,
    );
    const a = screen.getByRole("button", { name: "A" });
    const b = screen.getByRole("button", { name: "B" });
    await userEvent.click(a);
    await userEvent.click(b);
    expect(a).toHaveAttribute("data-state", "on");
    expect(b).toHaveAttribute("data-state", "on");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ToggleButtons type="single" defaultValue="b" aria-label="Options">
        <ToggleButtonsItem value="a">Option A</ToggleButtonsItem>
        <ToggleButtonsItem value="b">Option B</ToggleButtonsItem>
      </ToggleButtons>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
