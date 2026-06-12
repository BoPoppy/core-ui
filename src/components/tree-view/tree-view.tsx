import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
  data: TreeNode[];
  /** Node ids expanded by default. */
  defaultExpanded?: string[];
}

const Caret = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={cn("size-4 flex-none text-muted transition-transform", open && "rotate-90")}
  >
    <path
      d="m9 6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function TreeItem({
  node,
  expanded,
  toggle,
}: {
  node: TreeNode;
  expanded: Set<string>;
  toggle: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const open = expanded.has(node.id);

  return (
    <li role="treeitem" aria-expanded={hasChildren ? open : undefined} className="select-none">
      <div
        role="button"
        tabIndex={0}
        onClick={() => hasChildren && toggle(node.id)}
        onKeyDown={(e) => {
          if (hasChildren && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            toggle(node.id);
          }
        }}
        className="flex cursor-pointer items-center gap-[7px] rounded-sm px-2 py-1.5 text-sm text-fg transition-colors hover:bg-accent-soft"
      >
        {hasChildren ? <Caret open={open} /> : <span className="size-4 flex-none" />}
        {node.icon && (
          <span className="size-4 flex-none text-muted [&_svg]:size-full">{node.icon}</span>
        )}
        {node.label}
      </div>
      {hasChildren && open && (
        <ul role="group" className="ms-[18px] ps-2 border-s border-dashed border-border-strong">
          {node.children?.map((child) => (
            <TreeItem key={child.id} node={child} expanded={expanded} toggle={toggle} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** TreeView — an expandable/collapsible hierarchy. */
export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
  ({ className, data, defaultExpanded = [], ...props }, ref) => {
    const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
    const toggle = (id: string) =>
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });

    return (
      <ul ref={ref} role="tree" className={cn("max-w-[360px] text-sm", className)} {...props}>
        {data.map((node) => (
          <TreeItem key={node.id} node={node} expanded={expanded} toggle={toggle} />
        ))}
      </ul>
    );
  },
);
TreeView.displayName = "TreeView";
