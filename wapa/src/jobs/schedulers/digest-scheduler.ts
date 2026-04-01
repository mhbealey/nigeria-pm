import { digestQueue, defaultJobOptions } from '../queue.js';
import { db } from '../../config/database.js';
import { teams } from '../../db/schema/teams.js';
import { projects } from '../../db/schema/projects.js';
import { sprints } from '../../db/schema/sprints.js';
import { eq, and } from 'drizzle-orm';
import { logger } from '../../utils/logger.js';

/** Schedule weekly digest messages for all active teams */
export async function scheduleDigests(): Promise<void> {
  // Remove existing repeatable jobs
  const existing = await digestQueue.getRepeatableJobs();
  for (const job of existing) {
    await digestQueue.removeRepeatableByKey(job.key);
  }

  const allTeams = await db.query.teams.findMany();

  for (const team of allTeams) {
    const project = await db.query.projects.findFirst({
      where: and(eq(projects.teamId, team.id), eq(projects.status, 'active')),
    });
    if (!project) continue;

    const sprint = await db.query.sprints.findFirst({
      where: and(eq(sprints.projectId, project.id), eq(sprints.status, 'active')),
    });
    if (!sprint) continue;

    await digestQueue.add(
      `digest-${team.id}`,
      { teamId: team.id, projectId: project.id, sprintId: sprint.id },
      {
        ...defaultJobOptions,
        repeat: { pattern: '0 9 * * 1' }, // 9am Monday
      },
    );
  }

  logger.info('Digest schedules configured');
}
