import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";
import { Carousel } from "./carousel";

describe("Carousel", () => {
  it("renders slides as children", () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("has aria-roledescription=carousel on the root", () => {
    const { container } = render(
      <Carousel>
        <div>A</div>
        <div>B</div>
      </Carousel>,
    );
    expect(container.querySelector('[aria-roledescription="carousel"]')).toBeInTheDocument();
  });

  it("advances to the next slide when the next arrow is clicked", async () => {
    render(
      <Carousel defaultIndex={0}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    const slides = document.querySelectorAll('[aria-roledescription="slide"]');
    expect(slides[0]).toHaveAttribute("aria-hidden", "true");
    expect(slides[1]).toHaveAttribute("aria-hidden", "false");
  });

  it("goes to previous slide when the prev arrow is clicked", async () => {
    render(
      <Carousel defaultIndex={1}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    const slides = document.querySelectorAll('[aria-roledescription="slide"]');
    expect(slides[0]).toHaveAttribute("aria-hidden", "false");
    expect(slides[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("calls onIndexChange when navigating", async () => {
    const onIndexChange = vi.fn();
    render(
      <Carousel onIndexChange={onIndexChange}>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it("hides arrows when hideArrows is true", () => {
    render(
      <Carousel hideArrows>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>,
    );
    expect(screen.queryByRole("button", { name: "Previous slide" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next slide" })).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
