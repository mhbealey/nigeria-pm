import { eq, and } from 'drizzle-orm';
import { db } from '../config/database.js';
import { projects, type Project } from '../db/schema/projects.js';
import { tasks } from '../db/schema/tasks.js';
import { createId } from '@paralleldrive/cuid2';

/** Create a new project */
export async function createProjectRecord(teamId: string, name: string): Promise<Project> {
  const [project] = await db.insert(projects).values({
    id: createId(),
    teamId,
    name,
    status: 'active',
  }).returning();
  return project;
}

/** Get the active project for a team */
export async function getActiveProject(teamId: string): Promise<Project | undefined> {
  return db.query.projects.findFirst({
    where: and(eq(projects.teamId, teamId), eq(projects.status, 'active')),
  });
}

/** Archive a project */
export async function archiveProject(projectId: string): Promise<void> {
  await db.update(projects).set({ status: 'archived' }).where(eq(projects.id, projectId));
}

/** Get project statistics */
export async function getProjectStats(projectId: string) {
  const projectTasks = await db.query.tasks.findMany({
    where: eq(tasks.projectId, projectId),
  });

  return {
    total: projectTasks.length,
    done: projectTasks.filter((t) => t.status === 'done').length,
    inProgress: projectTasks.filter((t) => t.status === 'in_progress').length,
    blocked: projectTasks.filter((t) => t.status === 'blocked').length,
    todo: projectTasks.filter((t) => t.status === 'todo').length,
  };
}
