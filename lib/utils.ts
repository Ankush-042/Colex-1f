import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe DOM element access with null checks
export function safeQuerySelector<T extends Element>(selector: string): T | null {
  if (typeof document === "undefined") return null
  return document.querySelector<T>(selector)
}

// Safe window access
export function safeWindow(): Window | null {
  if (typeof window === "undefined") return null
  return window
}

// Safe localStorage access
export function safeLocalStorage() {
  if (typeof localStorage === "undefined") return null
  return localStorage
}

// Safe object property access
export function safeGet<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj ? obj[key] : undefined
}

