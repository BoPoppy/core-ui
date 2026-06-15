import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

describe("Drawer", () => {
  it("renders trigger and opens drawer on click", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>My Drawer</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title and description inside open drawer", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer Description</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
    expect(screen.getByText("Drawer Description")).toBeInTheDocument();
  });

  it("closes drawer when DrawerClose is clicked", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Close"));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("renders children inside the content", async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <p>Custom content</p>
        </DrawerContent>
      </Drawer>,
    );
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("can be opened with defaultOpen", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Open by default</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Open by default")).toBeInTheDocument();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Accessible Drawer</DrawerTitle>
          <DrawerDescription>Some description</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
