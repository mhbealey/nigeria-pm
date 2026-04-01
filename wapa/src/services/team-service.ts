import { eq } from 'drizzle-orm';
import { db } from '../config/database.js';
import { teams, teamMembers, type Team } from '../db/schema/teams.js';
import { createId } from '@paralleldrive/cuid2';

/** Create a new team, optionally linked to a WhatsApp group */
export async function createTeam(name: string, whatsappGroupId?: string): Promise<Team> {
  const [team] = await db.insert(teams).values({
    id: createId(),
    name,
    whatsappGroupId: whatsappGroupId ?? null,
  }).returning();
  return team;
}

/** Find a team by WhatsApp group ID */
export async function findTeamByGroupId(groupId: string): Promise<Team | undefined> {
  return db.query.teams.findFirst({ where: eq(teams.whatsappGroupId, groupId) });
}

/** Add a member to a team */
export async function addTeamMember(teamId: string, userId: string, role: 'admin' | 'member' = 'member'): Promise<void> {
  await db.insert(teamMembers).values({ teamId, userId, role }).onConflictDoNothing();
}

/** Remove a member from a team */
export async function removeTeamMember(teamId: string, userId: string): Promise<void> {
  await db.delete(teamMembers).where(
    eq(teamMembers.teamId, teamId),
  );
}

/** Get a team by ID */
export async function getTeamById(id: string): Promise<Team | undefined> {
  return db.query.teams.findFirst({ where: eq(teams.id, id) });
}
