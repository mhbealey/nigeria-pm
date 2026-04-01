import { redis } from '../config/redis.js';
import { RATE_LIMIT_WINDOW_SECONDS, RATE_LIMIT_MAX_REQUESTS } from '../constants/index.js';

const RATE_PREFIX = 'wapa:ratelimit:';

/**
 * Check the rate limit for a phone number using a Redis sorted-set sliding window.
 * Each request timestamp is stored as a member; expired entries are pruned on each check.
 * @param phone - The phone number (E.164 format) to rate-limit
 * @returns An object with `allowed` (boolean), `remaining` message count, and optional `retryAfter` seconds
 */
export async function checkRateLimit(phone: string): Promise<{ allowed: boolean; remaining: number; retryAfter?: number }> {
  const key = `${RATE_PREFIX}${phone}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_SECONDS * 1000;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, windowStart);
  pipe.zadd(key, now.toString(), `${now}`);
  pipe.zcard(key);
  pipe.expire(key, RATE_LIMIT_WINDOW_SECONDS);

  const results = await pipe.exec();
  const count = (results?.[2]?.[1] as number) ?? 0;

  if (count > RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfter: RATE_LIMIT_WINDOW_SECONDS };
  }

  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - count };
}
