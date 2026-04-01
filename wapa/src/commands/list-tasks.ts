import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq, and, ne } from 'drizzle-orm';
import { formatTaskItem } from '../utils/format.js';
import { formatShortDate } from '../utils/date.js';

/** List tasks with optional filters */
export async function listTasks(ctx: CommandContext): Promise<CommandResult> {
  const userTasks = await db.query.tasks.findMany({
    where: and(
      eq(tasks.assigneeId, ctx.userId),
      ne(tasks.status, 'done'),
    ),
    orderBy: (tasks, { asc }) => [asc(tasks.dueDate)],
  });

  if (userTasks.length === 0) {
    return { reply: "You're all clear — no open tasks! 🎉", success: true };
  }

  let msg = `📋 *Your tasks* (${userTasks.length}):\n\n`;

  for (let i = 0; i < Math.min(userTasks.length, 10); i++) {
    const t = userTasks[i];
    const due = t.dueDate ? formatShortDate(new Date(t.dueDate)) : undefined;
    msg += formatTaskItem(i + 1, t.title, t.status, due) + '\n';
  }

  if (userTasks.length > 10) {
    msg += `\n...and ${userTasks.length - 10} more`;
  }

  return { reply: msg.trim(), success: true };
}
