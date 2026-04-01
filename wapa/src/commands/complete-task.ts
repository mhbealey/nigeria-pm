import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { eq, and } from 'drizzle-orm';

/** Mark a task as complete */
export async function completeTask(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task did you finish? Try: *done with [task name]*", success: false };
  }

  const allTasks = await db.query.tasks.findMany({
    where: and(
      eq(tasks.assigneeId, ctx.userId),
      eq(tasks.status, 'todo'),
    ),
  });

  // Also check in_progress tasks
  const inProgressTasks = await db.query.tasks.findMany({
    where: and(
      eq(tasks.assigneeId, ctx.userId),
      eq(tasks.status, 'in_progress'),
    ),
  });

  const searchTasks = [...allTasks, ...inProgressTasks];
  const task = searchTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find an open task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  await db.update(tasks).set({
    status: 'done',
    completedAt: new Date(),
  }).where(eq(tasks.id, task.id));

  // Count remaining tasks
  const remaining = searchTasks.filter((t) => t.id !== task.id).length;

  return {
    reply: `Nice, marking *${task.title}* complete 🎉 ${remaining} task${remaining === 1 ? '' : 's'} left`,
    success: true,
    metadata: { taskId: task.id },
  };
}
