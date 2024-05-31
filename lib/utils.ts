import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// $12.30 = > 12300
export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

// 12300 => $12.30
export function convertMiliunitsToAmount(amount: number) {
  return amount / 1000;
}
