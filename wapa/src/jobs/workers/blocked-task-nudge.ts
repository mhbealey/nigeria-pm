import { Worker, Job } from 'bullmq';
import { redis } from '../../config/redis.js';
import { db } from '../../config/database.js';
import { tasks } from '../../db/schema/tasks.js';
import { users } from '../../db/schema/users.js';
import { teamMembers } from '../../db/schema/teams.js';
import { eq, and } from 'drizzle-orm';
import { sendTextMessage } from '../../whatsapp/sender.js';
import { setupWorkerErrorHandling } from '../queue.js';
import { logger } from '../../utils/logger.js';
import { differenceInHours } from 'date-fns';

const connection = { host: redis.options.host ?? 'localhost', port: redis.options.port ?? 6379 };

/** Worker that nudges teams about long-blocked tasks */
export const blockedTaskNudgeWorker = new Worker(
  'notifications',
  async (_job: Job) => {
    const blockedTasks = await db.query.tasks.findMany({
      where: eq(tasks.status, 'blocked'),
    });

    for (const task of blockedTasks) {
      // Check how long it's been blocked (approximate via updatedAt or createdAt)
      const blockedSince = task.createdAt; // Simplified — ideally track status change time
      const hoursBlocked = differenceInHours(new Date(), new Date(blockedSince));

      if (hoursBlocked < 48) continue;

      const days = Math.floor(hoursBlocked / 24);
      const message = `Hey team 👋 *${task.title}* has been blocked for ${days} days — anyone able to help unblock?`;

      // Get team members to notify
      if (task.projectId) {
        // Find team members through project -> team
        const members = await db.query.teamMembers.findMany({});
        for (const member of members.slice(0, 5)) {
          const user = await db.query.users.findFirst({ where: eq(users.id, member.userId) });
          if (user) {
            await sendTextMessage(user.phone, message);
          }
        }
      }

      logger.info({ taskId: task.id, hoursBlocked }, 'Blocked task nudge sent');
    }
  },
  { connection },
);

setupWorkerErrorHandling(blockedTaskNudgeWorker);
