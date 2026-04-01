import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { users } from '../db/schema/users.js';
import { eq, ilike } from 'drizzle-orm';

/** Assign a task to a team member */
export async function assignTask(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.entities.taskName) {
    return { reply: "Which task? Try: *assign [task] to [person]*", success: false };
  }
  if (!ctx.entities.assigneeName) {
    return { reply: "Who should I assign it to?", success: false };
  }

  // Find the task by fuzzy name match
  const allTasks = await db.query.tasks.findMany({
    where: eq(tasks.projectId, ctx.projectId ?? ''),
  });
  const task = allTasks.find((t) => t.title.toLowerCase().includes(ctx.entities.taskName!.toLowerCase()));

  if (!task) {
    return { reply: `Couldn't find a task matching "*${ctx.entities.taskName}*"`, success: false };
  }

  // Find the assignee
  const assigneeName = ctx.entities.assigneeName.replace(/^@/, '');

  // Check if "me" or "myself"
  let assigneeId = ctx.userId;
  let assigneeDisplay = 'you';

  if (!['me', 'myself'].includes(assigneeName.toLowerCase())) {
    const assignee = await db.query.users.findFirst({
      where: ilike(users.name, `%${assigneeName}%`),
    });
    if (assignee) {
      assigneeId = assignee.id;
      assigneeDisplay = assignee.name ?? assigneeName;
    } else {
      return { reply: `Couldn't find anyone named "${assigneeName}" on the team`, success: false };
    }
  }

  await db.update(tasks).set({ assigneeId }).where(eq(tasks.id, task.id));

  return {
    reply: `Done — ${assigneeDisplay}'s on *${task.title}* 👍`,
    success: true,
    metadata: { taskId: task.id, assigneeId },
  };
}
