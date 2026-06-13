import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";

export const inputVariants = cva(
  [
    "w-full h-[42px] px-3.5 text-sm text-fg bg-surface outline-none",
    "rounded-sm border-solid [border-width:var(--line-w)] [border-color:var(--line-color)] pop:border-fg",
    "placeholder:text-faint",
    "transition-[border-color,box-shadow,background-color] duration-150",
    "focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]",
    "disabled:bg-surface-2 disabled:text-faint disabled:cursor-not-allowed",
  ],
  {
    variants: {
      state: {
        default: "",
        error: "border-danger! shadow-[0_0_0_3px_var(--danger-soft)]",
        success: "border-success! shadow-[0_0_0_3px_var(--success-soft)]",
      },
    },
    defaultVariants: { state: "default" },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

/** Bare input control. Use `TextField` for the labelled, accessible wrapper. */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, ...props }, ref) => (
    <input ref={ref} className={cn(inputVariants({ state }), className)} {...props} />
  ),
);
Input.displayName = "Input";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputVariants> {}

/** Bare multi-line input. Use `TextareaField` for the labelled, accessible wrapper. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        inputVariants({ state }),
        "h-auto min-h-[84px] resize-y py-2.5 leading-normal",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export interface TextFieldProps extends InputProps {
  label?: string;
  /** Helper text below the field. Replaced by `error`/`success` when set. */
  hint?: string;
  error?: string;
  success?: string;
}

/**
 * Labelled text field with hint/error/success states. Wires `label`↔`input`
 * via `for`/`id` and links the message with `aria-describedby` + `aria-invalid`.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hint, error, success, id, className, state, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const msgId = `${fieldId}-msg`;
    const message = error ?? success ?? hint;
    const resolvedState = error ? "error" : success ? "success" : state;

    return (
      <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={fieldId} className="text-[13px] font-semibold text-fg">
            {label}
          </label>
        )}
        <Input
          ref={ref}
          id={fieldId}
          state={resolvedState}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? msgId : undefined}
          {...props}
        />
        {message && (
          <span
            id={msgId}
            className={cn("text-xs text-muted", error && "text-danger", success && "text-success")}
          >
            {message}
          </span>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export interface TextareaFieldProps extends TextareaProps {
  label?: string;
  /** Helper text below the field. Replaced by `error`/`success` when set. */
  hint?: string;
  error?: string;
  success?: string;
}

/**
 * Labelled multi-line field with hint/error/success states. Wires `label`↔`textarea`
 * via `for`/`id` and links the message with `aria-describedby` + `aria-invalid`.
 */
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, hint, error, success, id, className, state, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const msgId = `${fieldId}-msg`;
    const message = error ?? success ?? hint;
    const resolvedState = error ? "error" : success ? "success" : state;

    return (
      <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={fieldId} className="text-[13px] font-semibold text-fg">
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          id={fieldId}
          state={resolvedState}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? msgId : undefined}
          {...props}
        />
        {message && (
          <span
            id={msgId}
            className={cn("text-xs text-muted", error && "text-danger", success && "text-success")}
          >
            {message}
          </span>
        )}
      </div>
    );
  },
);
TextareaField.displayName = "TextareaField";
