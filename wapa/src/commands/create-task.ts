import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { createId } from '@paralleldrive/cuid2';

/** Create a new task with smart defaults */
export async function createTask(ctx: CommandContext): Promise<CommandResult> {
  const taskName = ctx.entities.taskName;
  if (!taskName) {
    return { reply: "What's the task? Try: *add task: design the landing page*", success: false };
  }

  const [task] = await db.insert(tasks).values({
    id: createId(),
    title: taskName,
    projectId: ctx.projectId ?? null,
    sprintId: ctx.sprintId ?? null,
    creatorId: ctx.userId,
    assigneeId: ctx.userId,
    status: 'todo',
    priority: ctx.entities.priority ?? 'medium',
    dueDate: ctx.entities.dueDate ?? null,
  }).returning();

  const priority = ctx.entities.priority ?? 'medium';
  const priorityEmoji = { low: '🟢', medium: '🟡', high: '🔴', urgent: '🔴' }[priority];

  return {
    reply: `✅ Task created — *${taskName}* ${priorityEmoji} — assigned to you`,
    success: true,
    metadata: { taskId: task.id },
  };
}
