import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Stepper } from "./stepper";

const steps = [{ label: "Account" }, { label: "Profile" }, { label: "Review" }];

describe("Stepper", () => {
  it("renders all step labels", () => {
    render(<Stepper steps={steps} current={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders step numbers for pending and active steps", () => {
    render(<Stepper steps={steps} current={1} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders check icons for completed steps", () => {
    const { container } = render(<Stepper steps={steps} current={2} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(2);
  });

  it("renders no check icons when current is 0", () => {
    const { container } = render(<Stepper steps={steps} current={0} />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(0);
  });

  it("applies a custom className to the root element", () => {
    const { container } = render(<Stepper steps={steps} current={0} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards extra HTML attributes to the root div", () => {
    render(<Stepper steps={steps} current={0} data-testid="my-stepper" />);
    expect(screen.getByTestId("my-stepper")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Stepper steps={steps} current={1} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
