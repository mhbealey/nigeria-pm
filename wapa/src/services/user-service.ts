import { eq } from 'drizzle-orm';
import { db } from '../config/database.js';
import { redis } from '../config/redis.js';
import { users, type User, type NewUser } from '../db/schema/users.js';
import { teamMembers } from '../db/schema/teams.js';
import { createId } from '@paralleldrive/cuid2';
import { logger } from '../utils/logger.js';
import { CACHE_TTL_SECONDS } from '../constants/index.js';

const CACHE_PREFIX = 'wapa:user:';

/** Find a user by phone number, creating one if they don't exist */
export async function findOrCreateByPhone(phone: string, name?: string): Promise<User> {
  // Check cache first
  const cached = await redis.get(`${CACHE_PREFIX}phone:${phone}`);
  if (cached) return JSON.parse(cached);

  let user = await db.query.users.findFirst({ where: eq(users.phone, phone) });

  if (!user) {
    const [created] = await db.insert(users).values({
      id: createId(),
      phone,
      name: name ?? null,
    }).returning();
    user = created;
    logger.info({ userId: user.id }, 'New user created');
  }

  await redis.set(`${CACHE_PREFIX}phone:${phone}`, JSON.stringify(user), 'EX', CACHE_TTL_SECONDS);
  return user;
}

/** Find a user by ID */
export async function findUserById(id: string): Promise<User | undefined> {
  const cached = await redis.get(`${CACHE_PREFIX}${id}`);
  if (cached) return JSON.parse(cached);

  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  if (user) {
    await redis.set(`${CACHE_PREFIX}${id}`, JSON.stringify(user), 'EX', CACHE_TTL_SECONDS);
  }
  return user;
}

/** Update a user's name */
export async function updateUserName(id: string, name: string): Promise<User> {
  const [updated] = await db.update(users).set({ name }).where(eq(users.id, id)).returning();
  await redis.del(`${CACHE_PREFIX}${id}`);
  return updated;
}

/** Get all members of a team */
export async function getTeamMembers(teamId: string): Promise<User[]> {
  const members = await db.query.teamMembers.findMany({
    where: eq(teamMembers.teamId, teamId),
    with: { user: true },
  });
  return members.map((m) => m.user);
}
