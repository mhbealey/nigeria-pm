import { redis } from '../config/redis.js';

const SESSION_PREFIX = 'wapa:session:';
const SESSION_TTL = 300; // 5 minutes

interface SessionState {
  pendingIntent?: string;
  pendingEntities?: Record<string, string>;
  clarificationContext?: string;
  lastMessageAt: number;
}

/** Get or create a conversation session */
export async function getSession(userId: string): Promise<SessionState | null> {
  const data = await redis.get(`${SESSION_PREFIX}${userId}`);
  return data ? JSON.parse(data) : null;
}

/** Save conversation session state */
export async function saveSession(userId: string, state: SessionState): Promise<void> {
  await redis.set(`${SESSION_PREFIX}${userId}`, JSON.stringify(state), 'EX', SESSION_TTL);
}

/** Clear a conversation session */
export async function clearSession(userId: string): Promise<void> {
  await redis.del(`${SESSION_PREFIX}${userId}`);
}

/** Check if there's a pending clarification */
export async function hasPendingClarification(userId: string): Promise<boolean> {
  const session = await getSession(userId);
  return !!session?.clarificationContext;
}
