import { addDays, addWeeks, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday, nextSunday, format } from 'date-fns';

/** Resolve a relative date string to an absolute ISO date */
export function resolveDate(input: string, options: { timezone?: string; sprintEndDate?: string; from?: Date } = {}): string | null {
  const lower = input.toLowerCase().trim();
  const now = options.from ?? new Date();

  if (lower === 'today') return formatISO(now);
  if (lower === 'tomorrow') return formatISO(addDays(now, 1));
  if (lower === 'yesterday') return formatISO(addDays(now, -1));

  // "in X days"
  const inDaysMatch = lower.match(/^in\s+(\d+)\s+days?$/);
  if (inDaysMatch) return formatISO(addDays(now, parseInt(inDaysMatch[1])));

  // "in X weeks"
  const inWeeksMatch = lower.match(/^in\s+(\d+)\s+weeks?$/);
  if (inWeeksMatch) return formatISO(addWeeks(now, parseInt(inWeeksMatch[1])));

  // "next week"
  if (lower === 'next week') return formatISO(nextMonday(now));

  // "end of sprint"
  if (lower === 'end of sprint' || lower === 'sprint end') {
    return options.sprintEndDate ?? null;
  }

  // "next [day]"
  const nextDayMatch = lower.match(/^next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (nextDayMatch) {
    const dayMap: Record<string, (d: Date) => Date> = {
      monday: nextMonday, tuesday: nextTuesday, wednesday: nextWednesday,
      thursday: nextThursday, friday: nextFriday, saturday: nextSaturday, sunday: nextSunday,
    };
    const fn = dayMap[nextDayMatch[1]];
    if (fn) return formatISO(fn(now));
  }

  // "[day]" without "next"
  const dayOnlyMatch = lower.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (dayOnlyMatch) {
    const dayMap: Record<string, (d: Date) => Date> = {
      monday: nextMonday, tuesday: nextTuesday, wednesday: nextWednesday,
      thursday: nextThursday, friday: nextFriday, saturday: nextSaturday, sunday: nextSunday,
    };
    const fn = dayMap[dayOnlyMatch[1]];
    if (fn) return formatISO(fn(now));
  }

  // "end of week"
  if (lower === 'end of week' || lower === 'eow') {
    return formatISO(nextFriday(now));
  }

  return null;
}

function formatISO(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
