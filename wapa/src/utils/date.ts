import {
  addDays, addWeeks, nextMonday, nextTuesday, nextWednesday, nextThursday,
  nextFriday, nextSaturday, nextSunday, endOfWeek, format, parseISO,
  isAfter, isBefore, differenceInDays, startOfDay,
} from 'date-fns';

/**
 * Format a date for display in WhatsApp messages.
 * @param date - The date to format
 * @returns A human-readable string like "Monday, January 5"
 */
export function formatDate(date: Date): string {
  return format(date, 'EEEE, MMMM d');
}

/**
 * Format a short date for compact display.
 * @param date - The date to format
 * @returns A short string like "Jan 5"
 */
export function formatShortDate(date: Date): string {
  return format(date, 'MMM d');
}

/**
 * Calculate the number of days remaining until a given date from today.
 * @param date - The target date
 * @returns Number of days until the date (negative if in the past)
 */
export function daysUntil(date: Date): number {
  return differenceInDays(startOfDay(date), startOfDay(new Date()));
}

/**
 * Check if a date is overdue (before today).
 * @param date - The date to check
 * @returns true if the date is before today
 */
export function isOverdue(date: Date): boolean {
  return isBefore(startOfDay(date), startOfDay(new Date()));
}

/**
 * Get the next occurrence of a named day of the week.
 * @param dayName - The day name (e.g. "monday", "friday") — case-insensitive
 * @param from - The reference date to search from (defaults to now)
 * @returns The next occurrence of that day, or `from` if the day name is unrecognized
 */
export function getNextDay(dayName: string, from: Date = new Date()): Date {
  const dayMap: Record<string, (date: Date) => Date> = {
    monday: nextMonday, tuesday: nextTuesday, wednesday: nextWednesday,
    thursday: nextThursday, friday: nextFriday, saturday: nextSaturday, sunday: nextSunday,
  };
  const fn = dayMap[dayName.toLowerCase()];
  return fn ? fn(from) : from;
}

export { addDays, addWeeks, format, parseISO, isAfter, isBefore, differenceInDays };
