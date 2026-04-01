import { Worker, Job } from 'bullmq';
import { redis } from '../../config/redis.js';
import { db } from '../../config/database.js';
import { tasks } from '../../db/schema/tasks.js';
import { sprints } from '../../db/schema/sprints.js';
import { users } from '../../db/schema/users.js';
import { teamMembers } from '../../db/schema/teams.js';
import { eq, and } from 'drizzle-orm';
import { sendTextMessage } from '../../whatsapp/sender.js';
import { weeklyDigestTemplate } from '../../whatsapp/templates.js';
import { setupWorkerErrorHandling } from '../queue.js';
import { logger } from '../../utils/logger.js';
import { formatShortDate } from '../../utils/date.js';
import { addDays } from 'date-fns';

interface DigestJobData {
  teamId: string;
  projectId: string;
  sprintId: string;
}

const connection = { host: redis.options.host ?? 'localhost', port: redis.options.port ?? 6379 };

/** Worker that sends weekly digest messages */
export const weeklyDigestWorker = new Worker<DigestJobData>(
  'digest',
  async (job: Job<DigestJobData>) => {
    const { teamId, sprintId } = job.data;

    const sprint = await db.query.sprints.findFirst({ where: eq(sprints.id, sprintId) });
    if (!sprint) return;

    const sprintTasks = await db.query.tasks.findMany({
      where: eq(tasks.sprintId, sprintId),
    });

    const total = sprintTasks.length;
    if (total === 0) return;

    const done = sprintTasks.filter((t) => t.status === 'done').length;
    const inProgress = sprintTasks.filter((t) => t.status === 'in_progress').length;
    const todo = sprintTasks.filter((t) => t.status === 'todo').length;
    const blocked = sprintTasks.filter((t) => t.status === 'blocked').length;
    const progress = Math.round((done / total) * 100);

    // Get team members for notifications
    const members = await db.query.teamMembers.findMany({
      where: eq(teamMembers.teamId, teamId),
    });

    // Calculate top contributors
    const contributorMap = new Map<string, number>();
    for (const t of sprintTasks.filter((t) => t.status === 'done' && t.assigneeId)) {
      contributorMap.set(t.assigneeId!, (contributorMap.get(t.assigneeId!) ?? 0) + 1);
    }

    const topContributors: Array<{ name: string; completed: number }> = [];
    for (const [userId, count] of contributorMap) {
      const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
      topContributors.push({ name: user?.name ?? 'Unknown', completed: count });
    }
    topContributors.sort((a, b) => b.completed - a.completed);

    // Upcoming due dates
    const nextWeek = addDays(new Date(), 7);
    const upcomingDue = sprintTasks
      .filter((t) => t.dueDate && t.status !== 'done' && new Date(t.dueDate) <= nextWeek)
      .map((t) => ({ title: t.title, dueDate: formatShortDate(new Date(t.dueDate!)) }));

    const digestMsg = weeklyDigestTemplate({
      sprintName: sprint.name ?? 'Current Sprint',
      progress,
      done,
      inProgress,
      todo,
      blocked,
      velocity: done,
      prevVelocity: done, // Simplified: would need historical data
      topContributors: topContributors.slice(0, 3),
      upcomingDue: upcomingDue.slice(0, 5),
    });

    // Send to all team members
    for (const member of members) {
      const user = await db.query.users.findFirst({ where: eq(users.id, member.userId) });
      if (user) {
        await sendTextMessage(user.phone, digestMsg);
      }
    }

    logger.info({ teamId, sprintId }, 'Weekly digest sent');
  },
  { connection },
);

setupWorkerErrorHandling(weeklyDigestWorker);
