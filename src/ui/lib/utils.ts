import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Private className helper — not part of the public package API. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
