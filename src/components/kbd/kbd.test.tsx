import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Kbd, KbdCombo } from "./kbd";

describe("Kbd", () => {
  it("renders children as keyboard text", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘")).toBeInTheDocument();
  });

  it("renders a kbd element", () => {
    const { container } = render(<Kbd>K</Kbd>);
    expect(container.querySelector("kbd")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(<Kbd className="custom-class">A</Kbd>);
    expect(container.querySelector("kbd")).toHaveClass("custom-class");
  });

  it("forwards extra HTML attributes", () => {
    render(<Kbd data-testid="my-kbd">B</Kbd>);
    expect(screen.getByTestId("my-kbd")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Kbd>Enter</Kbd>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("KbdCombo", () => {
  it("renders children inside a span", () => {
    const { container } = render(
      <KbdCombo>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdCombo>,
    );
    expect(container.querySelector("span")).toBeInTheDocument();
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(
      <KbdCombo className="combo-class">
        <Kbd>X</Kbd>
      </KbdCombo>,
    );
    expect(container.querySelector("span")).toHaveClass("combo-class");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <KbdCombo>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdCombo>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
