import { forwardRef, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";

interface TrackedFile {
  id: string;
  file: File;
}

export interface FileDropzoneProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Called with the current file list whenever it changes. */
  onFilesChange?: (files: File[]) => void;
  title?: string;
  description?: string;
  className?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const UploadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className="size-6"
  >
    <path
      d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * FileDropzone — drag-and-drop or click to browse. Shows selected files with a
 * fill animation (a visual placeholder for upload progress) and remove buttons.
 */
export const FileDropzone = forwardRef<HTMLDivElement, FileDropzoneProps>(
  (
    {
      accept,
      multiple = true,
      disabled,
      onFilesChange,
      title = "Drop files here, or click to browse",
      description = "PNG, JPG or PDF up to 10MB",
      className,
    },
    ref,
  ) => {
    const [files, setFiles] = useState<TrackedFile[]>([]);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const idBase = useId();
    const counter = useRef(0);

    const update = (next: TrackedFile[]) => {
      setFiles(next);
      onFilesChange?.(next.map((f) => f.file));
    };

    const addFiles = (list: FileList | null) => {
      if (!list || disabled) return;
      const incoming = Array.from(list).map((file) => {
        counter.current += 1;
        return { id: `${idBase}-${counter.current}`, file };
      });
      update(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
    };

    return (
      <div ref={ref} className={cn("max-w-[440px]", className)}>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2.5 rounded-md border-2 border-dashed bg-surface px-6 py-9 text-center transition-all",
            "border-border-strong pop:border-fg",
            "hover:border-accent hover:bg-accent-soft focus-visible:border-accent focus-visible:outline-none",
            dragging && "scale-[1.01] border-accent bg-accent-soft",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          <span
            className={cn(
              "grid size-12 place-items-center rounded-full bg-accent-soft text-fg transition-all",
              "[.group:hover_&]:bg-accent",
              dragging && "-translate-y-0.5 bg-accent text-accent-fg",
            )}
          >
            <UploadIcon />
          </span>
          <span className="text-[15px] [font-weight:var(--font-weight-strong)] text-fg">
            {title}
          </span>
          <span className="text-[13px] text-muted">{description}</span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <ul className="mt-3.5 flex flex-col gap-2">
            {files.map(({ id, file }) => (
              <li
                key={id}
                className="flex items-center gap-3 rounded-sm bg-surface px-3 py-2.5 border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg"
              >
                <span className="grid size-8 flex-none place-items-center rounded-sm bg-accent-soft text-[11px] font-bold text-fg uppercase">
                  {file.name.split(".").pop()?.slice(0, 3) ?? "?"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-fg">
                    {file.name}
                  </span>
                  <span className="block text-[11px] text-muted">{formatSize(file.size)}</span>
                  <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-surface-2">
                    <span className="block h-full rounded-full bg-accent [animation:fv-upload_1s_ease_forwards]" />
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => update(files.filter((f) => f.id !== id))}
                  className="flex-none text-base text-faint hover:text-danger"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
FileDropzone.displayName = "FileDropzone";
