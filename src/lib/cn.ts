import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving Tailwind conflicts so a later class wins
 * (e.g. `cn("px-4", props.className)` lets a consumer override padding).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
