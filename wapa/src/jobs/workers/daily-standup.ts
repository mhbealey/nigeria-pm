import { Worker, Job } from 'bullmq';
import { redis } from '../../config/redis.js';
import { db } from '../../config/database.js';
import { tasks } from '../../db/schema/tasks.js';
import { users } from '../../db/schema/users.js';
import { eq, and, ne } from 'drizzle-orm';
import { sendTextMessage } from '../../whatsapp/sender.js';
import { dailyStandupTemplate } from '../../whatsapp/templates.js';
import { setupWorkerErrorHandling } from '../queue.js';
import { logger } from '../../utils/logger.js';
import { formatShortDate } from '../../utils/date.js';

interface StandupJobData {
  userId: string;
  teamId: string;
}

const connection = { host: redis.options.host ?? 'localhost', port: redis.options.port ?? 6379 };

/** Worker that sends daily standup messages */
export const dailyStandupWorker = new Worker<StandupJobData>(
  'standup',
  async (job: Job<StandupJobData>) => {
    const { userId } = job.data;

    const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
    if (!user) return;

    const userTasks = await db.query.tasks.findMany({
      where: and(
        eq(tasks.assigneeId, userId),
        ne(tasks.status, 'done'),
      ),
      orderBy: (tasks, { asc }) => [asc(tasks.priority), asc(tasks.dueDate)],
    });

    const taskList = userTasks.map((t) => ({
      title: t.title,
      priority: t.priority,
      dueDate: t.dueDate ? formatShortDate(new Date(t.dueDate)) : undefined,
    }));

    const message = dailyStandupTemplate(user.name ?? 'there', taskList);
    await sendTextMessage(user.phone, message);

    logger.info({ userId }, 'Daily standup sent');
  },
  { connection },
);

setupWorkerErrorHandling(dailyStandupWorker);
