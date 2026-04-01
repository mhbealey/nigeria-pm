import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq } from 'drizzle-orm';
import { priorityEmoji } from '../utils/format.js';

/** Set a task's priority */
export async function setPriority(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task? Try: *[task name] is urgent*", success: false };
  }

  const priority = ctx.entities.priority ?? 'medium';

  const allTasks = await db.query.tasks.findMany();
  const task = allTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find a task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  await db.update(tasks).set({ priority }).where(eq(tasks.id, task.id));

  return {
    reply: `Bumped *${task.title}* to ${priorityEmoji(priority)} ${priority}`,
    success: true,
  };
}
