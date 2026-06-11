import { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * Table — composable, token-styled. Wrap rows in `TableHeader`/`TableBody`:
 *
 *   <Table>
 *     <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
 *     <TableBody><TableRow><TableCell>Ada</TableCell></TableRow></TableBody>
 *   </Table>
 */
export const Table = forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn(
        "overflow-hidden rounded-md shadow-1",
        "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
      )}
    >
      <table
        ref={ref}
        className={cn("w-full border-collapse bg-surface text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead ref={ref} className={className} {...props} />);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />);
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("transition-colors duration-100 hover:bg-accent-soft", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "bg-bg px-4 py-3.5 text-start text-xs font-semibold uppercase tracking-[0.05em] text-muted",
      "border-b-solid [border-bottom-width:var(--line-w)] [border-color:var(--card-line-color)]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "border-b border-border px-4 py-3.5 text-fg group-last:border-b-0 [tr:last-child_&]:border-b-0",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/** Full-width empty/error state row for a table body. */
export const TableEmpty = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { colSpan: number }
>(({ className, colSpan, children, ...props }, ref) => (
  <tr ref={ref} {...props}>
    <td colSpan={colSpan} className={cn("px-4 py-10 text-center text-sm text-muted", className)}>
      {children}
    </td>
  </tr>
));
TableEmpty.displayName = "TableEmpty";
