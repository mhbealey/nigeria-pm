import { redis } from '../config/redis.js';
import { db } from '../config/database.js';
import { tasks } from '../db/schema/tasks.js';
import { teams, teamMembers } from '../db/schema/teams.js';
import { users } from '../db/schema/users.js';
import { sprints } from '../db/schema/sprints.js';
import { projects } from '../db/schema/projects.js';
import { eq, and, desc, ne } from 'drizzle-orm';
import type { NlpContext } from '../nlp/types.js';

const CTX_PREFIX = 'wapa:ctx:';
const CTX_TTL = 300;

/** Build the full context for NLP and command processing */
export async function buildContext(userId: string, teamId?: string): Promise<NlpContext & { projectId?: string; sprintId?: string }> {
  const cacheKey = `${CTX_PREFIX}${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

  let projectName: string | undefined;
  let sprintName: string | undefined;
  let sprintEndDate: string | undefined;
  let projectId: string | undefined;
  let sprintId: string | undefined;
  let recentTaskTitles: string[] = [];
  let teamMemberNames: string[] = [];

  if (teamId) {
    // Get active project
    const project = await db.query.projects.findFirst({
      where: and(eq(projects.teamId, teamId), eq(projects.status, 'active')),
    });

    if (project) {
      projectId = project.id;
      projectName = project.name;

      // Get current sprint
      const sprint = await db.query.sprints.findFirst({
        where: and(eq(sprints.projectId, project.id), eq(sprints.status, 'active')),
      });

      if (sprint) {
        sprintId = sprint.id;
        sprintName = sprint.name ?? undefined;
        sprintEndDate = sprint.endDate ?? undefined;
      }
    }

    // Get recent task titles
    const recentTasks = await db.query.tasks.findMany({
      where: projectId ? and(eq(tasks.projectId, projectId), ne(tasks.status, 'done')) : undefined,
      orderBy: [desc(tasks.createdAt)],
      limit: 10,
    });
    recentTaskTitles = recentTasks.map((t) => t.title);

    // Get team member names
    const members = await db.query.teamMembers.findMany({
      where: eq(teamMembers.teamId, teamId),
    });
    // Fetch user names for members
    for (const member of members) {
      const memberUser = await db.query.users.findFirst({ where: eq(users.id, member.userId) });
      if (memberUser?.name) teamMemberNames.push(memberUser.name);
    }
  }

  const context = {
    userName: user?.name ?? 'there',
    projectName,
    sprintName,
    sprintEndDate,
    projectId,
    sprintId,
    recentTaskTitles,
    teamMemberNames,
  };

  await redis.set(cacheKey, JSON.stringify(context), 'EX', CTX_TTL);
  return context;
}

/** Invalidate context cache for a user */
export async function invalidateContext(userId: string): Promise<void> {
  await redis.del(`${CTX_PREFIX}${userId}`);
}
