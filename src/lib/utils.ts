import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function calculateMasteryScore(
  repairs: { repairStatus: string; confidenceScore: number }[]
): number {
  if (repairs.length === 0) return 0;
  const total = repairs.reduce((sum, r) => {
    if (r.repairStatus === "repaired") return sum + 100;
    if (r.repairStatus === "repairing") return sum + r.confidenceScore;
    return sum;
  }, 0);
  return Math.round(total / repairs.length);
}
