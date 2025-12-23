import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ChecklistItem, ChecklistItemStatus, Language } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format?: string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  // If custom format is provided, use it
  if (format) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (format === 'EEE, MMM d, yyyy') {
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
    if (format === 'MMM d, yyyy') {
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
    if (format === 'EEE, MMM d') {
      return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
    }
    if (format === 'MMM d') {
      return `${months[d.getMonth()]} ${d.getDate()}`;
    }
    if (format === 'MMMM d, yyyy') {
      const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return `${fullMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  }

  // Default format
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function deriveChecklistItemStatus(item: ChecklistItem): ChecklistItemStatus {
  // Explicitly blocked takes precedence
  if (item.status === "blocked") {
    return "blocked";
  }

  const { evidence, requiredLanguages } = item;

  // No evidence at all
  if (evidence.length === 0) {
    return "not_started";
  }

  // No language requirements - just need any evidence
  if (!requiredLanguages || requiredLanguages.length === 0) {
    return "completed";
  }

  // Check if all required languages are present in evidence
  const evidenceLanguages = new Set(
    evidence.filter((e) => e.language).map((e) => e.language as Language)
  );

  const allLanguagesPresent = requiredLanguages.every((lang) =>
    evidenceLanguages.has(lang)
  );

  if (allLanguagesPresent) {
    return "completed";
  }

  // Has some evidence but missing required languages
  return "in_progress";
}

export function getMissingLanguages(item: ChecklistItem): Language[] {
  if (!item.requiredLanguages || item.requiredLanguages.length === 0) {
    return [];
  }

  const evidenceLanguages = new Set(
    item.evidence.filter((e) => e.language).map((e) => e.language as Language)
  );

  return item.requiredLanguages.filter((lang) => !evidenceLanguages.has(lang));
}
