import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { sprints } from '../db/schema/sprints.js';

/** Get team velocity (tasks completed per sprint) */
export async function getTeamVelocity(projectId: string, sprintCount: number = 3): Promise<number[]> {
  const recentSprints = await db.query.sprints.findMany({
    where: eq(sprints.projectId, projectId),
    orderBy: (sprints, { desc }) => [desc(sprints.endDate)],
    limit: sprintCount,
  });

  const velocities: number[] = [];
  for (const sprint of recentSprints) {
    const completed = await db.query.tasks.findMany({
      where: and(eq(tasks.sprintId, sprint.id), eq(tasks.status, 'done')),
    });
    velocities.push(completed.length);
  }

  return velocities;
}

/** Get individual throughput */
export async function getUserThroughput(userId: string, sprintId: string): Promise<number> {
  const completed = await db.query.tasks.findMany({
    where: and(
      eq(tasks.assigneeId, userId),
      eq(tasks.sprintId, sprintId),
      eq(tasks.status, 'done'),
    ),
  });
  return completed.length;
}

/** Get average task completion time in days */
export async function getAvgCompletionTime(projectId: string): Promise<number> {
  const completedTasks = await db.query.tasks.findMany({
    where: and(eq(tasks.projectId, projectId), eq(tasks.status, 'done')),
  });

  if (completedTasks.length === 0) return 0;

  let totalDays = 0;
  for (const task of completedTasks) {
    if (task.completedAt && task.createdAt) {
      const diff = new Date(task.completedAt).getTime() - new Date(task.createdAt).getTime();
      totalDays += diff / (1000 * 60 * 60 * 24);
    }
  }

  return Math.round(totalDays / completedTasks.length);
}
