import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { sprints } from '../db/schema/sprints.js';
import { eq, and } from 'drizzle-orm';
import { progressBar } from '../utils/format.js';
import { differenceInDays } from 'date-fns';

/** Show sprint progress */
export async function sprintStatus(ctx: CommandContext): Promise<CommandResult> {
  if (!ctx.sprintId) {
    return { reply: "No active sprint. Create a project first with *new project: [name]*", success: false };
  }

  const sprint = await db.query.sprints.findFirst({
    where: eq(sprints.id, ctx.sprintId),
  });

  if (!sprint) {
    return { reply: "Couldn't find the current sprint", success: false };
  }

  const sprintTasks = await db.query.tasks.findMany({
    where: eq(tasks.sprintId, ctx.sprintId),
  });

  const total = sprintTasks.length;
  if (total === 0) {
    return { reply: `📊 *${sprint.name ?? 'Current Sprint'}* — no tasks yet. Add some with *add task: [name]*`, success: true };
  }

  const done = sprintTasks.filter((t) => t.status === 'done').length;
  const inProgress = sprintTasks.filter((t) => t.status === 'in_progress').length;
  const blocked = sprintTasks.filter((t) => t.status === 'blocked').length;
  const todo = sprintTasks.filter((t) => t.status === 'todo').length;
  const percent = Math.round((done / total) * 100);
  const daysLeft = sprint.endDate ? differenceInDays(new Date(sprint.endDate), new Date()) : 0;

  let msg = `📊 *${sprint.name ?? 'Sprint'}*\n\n`;
  msg += `${progressBar(percent)}\n\n`;
  msg += `✅ Done: ${done} | 🔄 In progress: ${inProgress} | ⬜ Todo: ${todo}`;
  if (blocked > 0) msg += ` | 🚫 Blocked: ${blocked}`;
  msg += `\n\n${daysLeft > 0 ? `${daysLeft} days left` : 'Sprint ended'}`;

  return { reply: msg, success: true };
}
