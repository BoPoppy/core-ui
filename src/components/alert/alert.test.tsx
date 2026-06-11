import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./alert";

describe("Alert", () => {
  it("has role=alert and renders content", () => {
    render(<Alert title="Heads up">Body text</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Heads up");
    expect(alert).toHaveTextContent("Body text");
  });

  it("calls onClose when dismissed", async () => {
    const onClose = vi.fn();
    render(<Alert title="x" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Alert variant="success" title="Saved">
        All good
      </Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
