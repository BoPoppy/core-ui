import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileDropzone } from "./file-dropzone";

describe("FileDropzone", () => {
  it("renders default title and description", () => {
    render(<FileDropzone />);
    expect(screen.getByText("Drop files here, or click to browse")).toBeInTheDocument();
    expect(screen.getByText("PNG, JPG or PDF up to 10MB")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(<FileDropzone title="Upload here" description="Only CSV files" />);
    expect(screen.getByText("Upload here")).toBeInTheDocument();
    expect(screen.getByText("Only CSV files")).toBeInTheDocument();
  });

  it("renders a button role for the dropzone area", () => {
    render(<FileDropzone />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("is aria-disabled when disabled", () => {
    render(<FileDropzone disabled />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onFilesChange and shows file in list after file input change", async () => {
    const onFilesChange = vi.fn();
    render(<FileDropzone onFilesChange={onFilesChange} />);
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    await userEvent.upload(input, file);
    expect(onFilesChange).toHaveBeenCalledOnce();
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText("hello.png")).toBeInTheDocument();
  });

  it("removes a file when its remove button is clicked", async () => {
    const onFilesChange = vi.fn();
    render(<FileDropzone onFilesChange={onFilesChange} />);
    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    const file = new File(["data"], "report.pdf", { type: "application/pdf" });
    await userEvent.upload(input, file);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove report.pdf" }));
    expect(screen.queryByText("report.pdf")).not.toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it("adds files on drop and calls onFilesChange", () => {
    const onFilesChange = vi.fn();
    render(<FileDropzone onFilesChange={onFilesChange} />);
    const button = screen.getByRole("button");
    const file = new File(["content"], "dropped.jpg", { type: "image/jpeg" });
    const dataTransfer = { files: [file] as unknown as FileList };
    fireEvent.dragOver(button, { dataTransfer });
    fireEvent.drop(button, { dataTransfer });
    expect(onFilesChange).toHaveBeenCalledWith([file]);
    expect(screen.getByText("dropped.jpg")).toBeInTheDocument();
  });

  it("renders with a title and description", () => {
    render(<FileDropzone title="Upload files" description="PNG or PDF up to 10MB" />);
    expect(screen.getByText("Upload files")).toBeInTheDocument();
    expect(screen.getByText("PNG or PDF up to 10MB")).toBeInTheDocument();
  });
});
