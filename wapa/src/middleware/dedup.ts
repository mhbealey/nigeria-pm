import { redis } from '../config/redis.js';
import { logger } from '../utils/logger.js';

// DECISION: Message deduplication is necessary because WhatsApp's webhook delivery is at-least-once.
// Network hiccups between WhatsApp and our server can cause the same message to be delivered 2-3
// times within seconds. Without dedup, users would see duplicate task creations, double replies, etc.

// DECISION: 5-minute TTL is long enough to cover WhatsApp's retry window (retries happen within
// ~30s-2min) but short enough to keep Redis memory usage bounded. At 10K messages/day, this holds
// ~35 keys in Redis at any time — negligible memory footprint.
const DEDUP_TTL = 300; // 5 minutes
const DEDUP_PREFIX = 'wapa:dedup:';

/**
 * Check if a message has already been processed using Redis-based deduplication.
 * Uses SET with NX (set-if-not-exists) and a 5-minute TTL to track seen message IDs.
 * @param messageId - The unique WhatsApp message ID to check
 * @returns true if the message is a duplicate (already processed), false if it is new
 */
export async function isDuplicate(messageId: string): Promise<boolean> {
  const key = `${DEDUP_PREFIX}${messageId}`;
  const result = await redis.set(key, '1', 'EX', DEDUP_TTL, 'NX');
  if (result === null) {
    logger.debug({ messageId }, 'Duplicate message detected');
    return true;
  }
  return false;
}
