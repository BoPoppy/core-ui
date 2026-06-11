import * as RadixToast from "@radix-ui/react-toast";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";

export type ToastVariant = "default" | "success" | "danger";

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss after N ms. Defaults to the provider's duration. */
  duration?: number;
  /** Action button label + handler. */
  action?: { label: string; onClick: () => void };
}

interface ToastEntry extends ToastOptions {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICON_COLOR: Record<ToastVariant, string> = {
  default: "text-accent",
  success: "text-success",
  danger: "text-danger",
};

export interface ToastProviderProps {
  children: ReactNode;
  /** Default auto-dismiss duration in ms. */
  duration?: number;
}

/**
 * Wrap your app once. Then call `useToast().toast({ title, description })`
 * anywhere. Built on Radix Toast — swipe-to-dismiss, timers, and screen-reader
 * announcements come for free.
 */
export function ToastProvider({ children, duration = 4000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    idRef.current += 1;
    const id = idRef.current;
    setToasts((list) => [...list, { ...options, id }]);
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider duration={duration} swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            duration={t.duration ?? duration}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            className={cn(
              "flex items-center gap-3 rounded-md bg-surface px-4 py-3.5 text-sm text-fg shadow-3",
              "border-solid [border-width:var(--line-w)] [border-color:var(--card-line-color)] pop:border-fg",
              "data-[state=open]:animate-[fv-toast-in_300ms_cubic-bezier(0.2,0.9,0.3,1.2)]",
              "data-[state=closed]:animate-[fv-toast-out_300ms_ease]",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
              "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
              "data-[swipe=end]:animate-[fv-toast-out_200ms_ease]",
            )}
          >
            <span
              className={cn(
                "size-2.5 flex-none rounded-full bg-current",
                ICON_COLOR[t.variant ?? "default"],
              )}
            />
            <div className="min-w-0 flex-1">
              {t.title && <RadixToast.Title className="font-semibold">{t.title}</RadixToast.Title>}
              {t.description && (
                <RadixToast.Description className="text-[13px] text-muted">
                  {t.description}
                </RadixToast.Description>
              )}
            </div>
            {t.action && (
              <RadixToast.Action
                altText={t.action.label}
                onClick={t.action.onClick}
                className="flex-none text-[13px] font-bold text-accent"
              >
                {t.action.label}
              </RadixToast.Action>
            )}
            <RadixToast.Close
              aria-label="Close"
              className="flex-none text-base leading-none text-muted opacity-70 hover:opacity-100"
            >
              ✕
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed end-[22px] bottom-[22px] z-[60] m-0 flex w-[340px] max-w-[100vw] list-none flex-col items-end gap-2.5 p-0 outline-none" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}
