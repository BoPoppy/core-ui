import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TreeView } from "./tree-view";

const data = [{ id: "root", label: "root", children: [{ id: "child", label: "child.txt" }] }];

describe("TreeView", () => {
  it("expands and collapses a node on click", async () => {
    render(<TreeView data={data} />);
    expect(screen.queryByText("child.txt")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("root"));
    expect(screen.getByText("child.txt")).toBeInTheDocument();
    await userEvent.click(screen.getByText("root"));
    expect(screen.queryByText("child.txt")).not.toBeInTheDocument();
  });
});
