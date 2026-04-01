import { WHATSAPP_MESSAGE_MAX_LENGTH } from '../constants/index.js';

/**
 * Format a progress bar using Unicode block characters.
 * @param percent - The completion percentage (0-100)
 * @param width - The number of block characters in the bar (default 10)
 * @returns A string like "█████░░░░░ 50%"
 */
export function progressBar(percent: number, width: number = 10): string {
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;
  return '█'.repeat(filled) + '░'.repeat(empty) + ` ${Math.round(percent)}%`;
}

/**
 * Format a task list item for WhatsApp display with status emoji and optional due date.
 * @param index - The 1-based position in the list
 * @param title - The task title (rendered in bold)
 * @param status - The task status: "todo", "in_progress", "blocked", or "done"
 * @param dueDate - Optional formatted due date string
 * @returns A formatted string like "1. ⬜ *My Task* — due Jan 5"
 */
export function formatTaskItem(index: number, title: string, status: string, dueDate?: string): string {
  const statusEmoji = { todo: '⬜', in_progress: '🔄', blocked: '🚫', done: '✅' }[status] ?? '⬜';
  const due = dueDate ? ` — due ${dueDate}` : '';
  return `${index}. ${statusEmoji} *${title}*${due}`;
}

/**
 * Get the emoji representation for a priority level.
 * @param priority - The priority level: "low", "medium", "high", or "urgent"
 * @returns The corresponding emoji(s)
 */
export function priorityEmoji(priority: string): string {
  return { low: '🟢', medium: '🟡', high: '🔴', urgent: '🔴🔴' }[priority] ?? '🟡';
}

/**
 * Truncate text to a maximum length for WhatsApp readability.
 * @param text - The text to truncate
 * @param maxLength - The maximum allowed length (default 280)
 * @returns The original text if within limits, or a truncated version ending with "..."
 */
export function truncate(text: string, maxLength: number = WHATSAPP_MESSAGE_MAX_LENGTH): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
