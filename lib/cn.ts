import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge des classes Tailwind en résolvant les conflits (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
