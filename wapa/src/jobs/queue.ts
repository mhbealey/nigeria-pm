import { Queue, Worker, QueueEvents } from 'bullmq';
import { redis } from '../config/redis.js';
import { logger } from '../utils/logger.js';
import * as Sentry from '@sentry/node';

const connection = { host: redis.options.host ?? 'localhost', port: redis.options.port ?? 6379 };

/** Standup notification queue */
export const standupQueue = new Queue('standup', { connection });

/** Weekly digest queue */
export const digestQueue = new Queue('digest', { connection });

/** Due date reminder queue */
export const reminderQueue = new Queue('reminders', { connection });

/** General notification queue */
export const notificationQueue = new Queue('notifications', { connection });

/** Set up global error handling for all workers */
export function setupWorkerErrorHandling(worker: Worker): void {
  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, queue: worker.name, err }, 'Job failed');

    if (job && job.attemptsMade >= (job.opts.attempts ?? 3)) {
      logger.error({ jobId: job.id }, 'Job moved to dead letter queue');
      Sentry.captureException(err, { extra: { jobId: job.id, queue: worker.name } });
    }
  });

  worker.on('completed', (job) => {
    logger.debug({ jobId: job.id, queue: worker.name }, 'Job completed');
  });

  worker.on('error', (err) => {
    logger.error({ err, queue: worker.name }, 'Worker error');
  });
}

/** Default job options with retry */
export const defaultJobOptions = {
  attempts: 3,
  backoff: { type: 'exponential' as const, delay: 2000 },
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 500 },
};
