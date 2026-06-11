import { Fragment, forwardRef } from "react";
import { cn } from "../../lib/cn";

export interface Step {
  label: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  /** Index of the current (active) step. Earlier steps render as done. */
  current: number;
}

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-[15px]" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Stepper — a horizontal progress indicator across labelled steps. */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, current, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-wrap items-center", className)} {...props}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={i}>
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-[30px] flex-none place-items-center rounded-full text-[13px] font-bold",
                  "border-solid [border-width:var(--line-w)] transition-colors duration-200",
                  done && "bg-accent text-accent-fg border-accent pop:border-fg",
                  active &&
                    "bg-surface text-accent border-accent shadow-[0_0_0_3px_var(--accent-soft)]",
                  !done && !active && "bg-surface-2 text-muted [border-color:var(--line-color)]",
                )}
              >
                {done ? <CheckIcon /> : i + 1}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[13px] font-semibold",
                  done || active ? "text-fg" : "text-muted",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn("mx-3 h-px w-12 flex-none", done ? "bg-accent" : "bg-border-strong")}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  ),
);
Stepper.displayName = "Stepper";
