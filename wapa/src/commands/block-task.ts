import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq } from 'drizzle-orm';

/** Mark a task as blocked */
export async function blockTask(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task is blocked? Try: *[task] is blocked by [reason]*", success: false };
  }

  const allTasks = await db.query.tasks.findMany();
  const task = allTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find a task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  await db.update(tasks).set({ status: 'blocked' }).where(eq(tasks.id, task.id));

  const reason = ctx.entities.blockReason ? ` by ${ctx.entities.blockReason}` : '';
  return {
    reply: `🚫 *${task.title}* marked as blocked${reason} — I'll let the team know`,
    success: true,
  };
}
