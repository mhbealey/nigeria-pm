import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq, and } from 'drizzle-orm';

/** Unblock a task */
export async function unblockTask(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task? Try: *unblock [task name]*", success: false };
  }

  const allTasks = await db.query.tasks.findMany({
    where: eq(tasks.status, 'blocked'),
  });
  const task = allTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find a blocked task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  await db.update(tasks).set({ status: 'in_progress' }).where(eq(tasks.id, task.id));

  return {
    reply: `✅ *${task.title}* is unblocked and back in progress!`,
    success: true,
  };
}
