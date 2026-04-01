import { eq, and } from 'drizzle-orm';
import { db } from '../config/database.js';
import { sprints, type Sprint } from '../db/schema/sprints.js';
import { tasks } from '../db/schema/tasks.js';
import { createId } from '@paralleldrive/cuid2';
import { format, addWeeks } from 'date-fns';

/** Create a new sprint */
export async function createSprint(projectId: string, name: string, durationWeeks: number = 2): Promise<Sprint> {
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addWeeks(new Date(), durationWeeks), 'yyyy-MM-dd');

  const [sprint] = await db.insert(sprints).values({
    id: createId(),
    projectId,
    name,
    startDate,
    endDate,
    status: 'active',
  }).returning();

  return sprint;
}

/** Get the current active sprint for a project */
export async function getCurrentSprint(projectId: string): Promise<Sprint | undefined> {
  return db.query.sprints.findFirst({
    where: and(eq(sprints.projectId, projectId), eq(sprints.status, 'active')),
  });
}

/** Get sprint progress metrics */
export async function getSprintProgress(sprintId: string) {
  const sprintTasks = await db.query.tasks.findMany({
    where: eq(tasks.sprintId, sprintId),
  });

  const total = sprintTasks.length;
  const done = sprintTasks.filter((t) => t.status === 'done').length;
  const inProgress = sprintTasks.filter((t) => t.status === 'in_progress').length;
  const blocked = sprintTasks.filter((t) => t.status === 'blocked').length;
  const todo = sprintTasks.filter((t) => t.status === 'todo').length;
  const percentComplete = total > 0 ? Math.round((done / total) * 100) : 0;

  return { total, done, inProgress, blocked, todo, percentComplete };
}

/** Complete a sprint */
export async function completeSprint(sprintId: string): Promise<void> {
  await db.update(sprints).set({ status: 'completed' }).where(eq(sprints.id, sprintId));
}
