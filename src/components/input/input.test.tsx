import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { TextareaField, TextField } from "./input";

describe("TextField", () => {
  it("wires the label to the input", () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("marks the field invalid and links the error message", () => {
    render(<TextField label="Email" error="Bad email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Bad email");
  });

  it("has no axe violations", async () => {
    const { container } = render(<TextField label="Email" hint="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("TextareaField", () => {
  it("wires the label to the textarea", () => {
    render(<TextareaField label="Message" />);
    expect(screen.getByLabelText("Message").tagName).toBe("TEXTAREA");
  });

  it("marks the field invalid and links the error message", () => {
    render(<TextareaField label="Message" error="Too short" />);
    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Too short");
  });

  it("has no axe violations", async () => {
    const { container } = render(<TextareaField label="Message" hint="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
