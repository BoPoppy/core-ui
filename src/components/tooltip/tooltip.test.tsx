import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Tooltip, TooltipProvider } from "./tooltip";

describe("Tooltip", () => {
  it("renders the trigger child", () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("shows tooltip content when defaultOpen is true", () => {
    render(
      <Tooltip content="Visible tip" defaultOpen>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Visible tip");
  });

  it("renders ReactNode content when defaultOpen is true", () => {
    render(
      <Tooltip content={<span>Rich</span>} defaultOpen>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Rich");
  });

  it("shows tooltip content on hover", async () => {
    render(
      <Tooltip content="Hovered tip" delayDuration={0}>
        <button>Hover target</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button", { name: "Hover target" }));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Hovered tip");
    });
  });

  it("works inside an explicit TooltipProvider", () => {
    render(
      <TooltipProvider>
        <Tooltip content="Provider tip" defaultOpen>
          <button>Wrapped trigger</button>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Provider tip");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Tooltip content="Accessible tip" defaultOpen>
        <button>Accessible trigger</button>
      </Tooltip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
