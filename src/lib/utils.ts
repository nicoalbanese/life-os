import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function differenceInDays(date1: Date, date2: Date): number {
  const timeDiff = date1.getTime() - date2.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return daysDiff + 1;
}

export function daysSince(pastDate: Date): number {
  const now = new Date();
  const timeDiff = now.getTime() - pastDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

export function daysUntil(futureDate: Date): number {
  const now = new Date();
  const timeDiff = futureDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysDiff < 0 ? 0 : daysDiff; // If the future date has passed, return 0
}
