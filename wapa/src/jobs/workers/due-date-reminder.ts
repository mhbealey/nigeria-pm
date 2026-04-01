import { Worker, Job } from 'bullmq';
import { redis } from '../../config/redis.js';
import { db } from '../../config/database.js';
import { tasks } from '../../db/schema/tasks.js';
import { users } from '../../db/schema/users.js';
import { eq, and, ne, lte } from 'drizzle-orm';
import { sendTextMessage } from '../../whatsapp/sender.js';
import { taskReminderTemplate } from '../../whatsapp/templates.js';
import { setupWorkerErrorHandling } from '../queue.js';
import { logger } from '../../utils/logger.js';
import { formatShortDate, isOverdue } from '../../utils/date.js';
import { format, addDays } from 'date-fns';

const connection = { host: redis.options.host ?? 'localhost', port: redis.options.port ?? 6379 };
const NUDGE_PREFIX = 'wapa:nudge:';
const MAX_OVERDUE_NUDGES = 3;

/** Worker that sends due date reminders */
export const dueDateReminderWorker = new Worker(
  'reminders',
  async (_job: Job) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

    // Find tasks due today or tomorrow that aren't done
    const dueTasks = await db.query.tasks.findMany({
      where: and(
        ne(tasks.status, 'done'),
        lte(tasks.dueDate, tomorrow),
      ),
    });

    for (const task of dueTasks) {
      if (!task.assigneeId || !task.dueDate) continue;

      const user = await db.query.users.findFirst({ where: eq(users.id, task.assigneeId) });
      if (!user) continue;

      const overdue = isOverdue(new Date(task.dueDate));

      // Check nudge count for overdue tasks
      if (overdue) {
        const nudgeKey = `${NUDGE_PREFIX}${task.id}`;
        const nudgeCount = parseInt(await redis.get(nudgeKey) ?? '0');
        if (nudgeCount >= MAX_OVERDUE_NUDGES) continue;
        await redis.incr(nudgeKey);
        await redis.expire(nudgeKey, 86400 * 7); // 7 day TTL
      }

      const message = taskReminderTemplate(
        task.title,
        formatShortDate(new Date(task.dueDate)),
        overdue,
      );

      await sendTextMessage(user.phone, message);
      logger.info({ taskId: task.id, userId: user.id, overdue }, 'Due date reminder sent');
    }
  },
  { connection },
);

setupWorkerErrorHandling(dueDateReminderWorker);
