import { standupQueue, defaultJobOptions } from '../queue.js';
import { db } from '../../config/database.js';
import { teamMembers } from '../../db/schema/teams.js';
import { teams } from '../../db/schema/teams.js';
import { logger } from '../../utils/logger.js';

/** Schedule daily standup messages for all teams */
export async function scheduleStandups(): Promise<void> {
  // Remove existing repeatable jobs first
  const existing = await standupQueue.getRepeatableJobs();
  for (const job of existing) {
    await standupQueue.removeRepeatableByKey(job.key);
  }

  const allTeams = await db.query.teams.findMany();

  for (const team of allTeams) {
    const members = await db.query.teamMembers.findMany({
      where: teamMembers.teamId ? undefined : undefined,
    });

    for (const member of members) {
      await standupQueue.add(
        `standup-${team.id}-${member.userId}`,
        { userId: member.userId, teamId: team.id },
        {
          ...defaultJobOptions,
          repeat: { pattern: '0 9 * * 1-5' }, // 9am weekdays
        },
      );
    }
  }

  logger.info('Standup schedules configured');
}
