import type { CommandContext, CommandResult } from '../types/command.js';
import { db } from '../config/database.js';
import { projects } from '../db/schema/projects.js';
import { sprints } from '../db/schema/sprints.js';
import { createId } from '@paralleldrive/cuid2';
import { addWeeks, format } from 'date-fns';

/** Create a new project with auto-sprint */
export async function createProject(ctx: CommandContext): Promise<CommandResult> {
  const projectName = ctx.entities.projectName;
  if (!projectName) {
    return { reply: "What should we call it? Try: *new project: Website Redesign*", success: false };
  }

  const projectId = createId();
  await db.insert(projects).values({
    id: projectId,
    teamId: ctx.teamId ?? null,
    name: projectName,
    status: 'active',
  });

  // Auto-create first 2-week sprint
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addWeeks(new Date(), 2), 'yyyy-MM-dd');

  await db.insert(sprints).values({
    id: createId(),
    projectId,
    name: 'Sprint 1',
    startDate,
    endDate,
    status: 'active',
  });

  return {
    reply: `🆕 Project *${projectName}* created with a 2-week sprint!\n\nAdd tasks whenever you're ready: *add task: [name]*`,
    success: true,
    metadata: { projectId },
  };
}
