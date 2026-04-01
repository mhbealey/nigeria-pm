import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq } from 'drizzle-orm';
import { resolveDate } from '../nlp/resolvers/date-resolver.js';
import { formatDate } from '../utils/date.js';

/** Set or update a task's due date */
export async function setDueDate(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task? Try: *push [task] to [date]*", success: false };
  }
  if (!ctx.entities.dueDate) {
    return { reply: "When should it be due? Try: *next tuesday* or *in 3 days*", success: false };
  }

  const allTasks = await db.query.tasks.findMany();
  const task = allTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find a task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  const resolved = resolveDate(ctx.entities.dueDate);
  if (!resolved) {
    return { reply: `I couldn't figure out that date. Try something like *next tuesday* or *in 3 days*`, success: false };
  }

  await db.update(tasks).set({ dueDate: resolved }).where(eq(tasks.id, task.id));

  return {
    reply: `Moved *${task.title}* to ${formatDate(new Date(resolved))} 📅`,
    success: true,
  };
}
