import { redis } from '../config/redis.js';
import { logger } from '../utils/logger.js';

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
