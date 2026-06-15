import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { List, ListItem } from "./list";

describe("List", () => {
  it("renders as a list element with children", () => {
    render(
      <List>
        <ListItem title="Item one" />
      </List>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("renders ListItem title and subtitle", () => {
    render(
      <List>
        <ListItem title="My Title" subtitle="My Subtitle" />
      </List>,
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("My Subtitle")).toBeInTheDocument();
  });

  it("renders ListItem icon when provided", () => {
    render(
      <List>
        <ListItem icon={<svg data-testid="test-icon" />} title="With Icon" />
      </List>,
    );
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders ListItem meta content", () => {
    render(
      <List>
        <ListItem title="With Meta" meta="99+" />
      </List>,
    );
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("renders ListItem children alongside other props", () => {
    render(
      <List>
        <ListItem title="Parent">
          <span>child content</span>
        </ListItem>
      </List>,
    );
    expect(screen.getByText("child content")).toBeInTheDocument();
    expect(screen.getByText("Parent")).toBeInTheDocument();
  });

  it("applies custom className to List and ListItem", () => {
    render(
      <List className="custom-list">
        <ListItem className="custom-item" title="Styled" />
      </List>,
    );
    expect(screen.getByRole("list")).toHaveClass("custom-list");
    expect(screen.getByRole("listitem")).toHaveClass("custom-item");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <List>
        <ListItem icon={<svg aria-hidden="true" />} title="First" subtitle="Details" meta="1h ago" />
        <ListItem title="Second" subtitle="More details" />
      </List>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
