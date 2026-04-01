import Redis from 'ioredis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

/**
 * Redis client configured with automatic reconnection and lazy connect.
 * Uses exponential backoff with a maximum delay of 5 seconds.
 */
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    return delay;
  },
  lazyConnect: true,
});

redis.on('error', (err) => logger.error({ err }, 'Redis connection error'));
redis.on('connect', () => logger.info('Redis connected'));

/**
 * Checks whether the Redis connection is alive by sending a PING command.
 *
 * @returns `true` if Redis responds with PONG, `false` otherwise.
 */
export async function checkRedisHealth(): Promise<boolean> {
  try {
    const result = await redis.ping();
    return result === 'PONG';
  } catch {
    return false;
  }
}
