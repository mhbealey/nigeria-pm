import { eq, and, ilike, desc } from 'drizzle-orm';
import { db } from '../config/database.js';
import { tasks, type Task } from '../db/schema/tasks.js';
import { createId } from '@paralleldrive/cuid2';
import { logger } from '../utils/logger.js';
import type { TaskStatus, TaskPriority } from '../types/common.js';

/**
 * Create a new task and persist it to the database.
 * Defaults assignee to the creator when none is specified,
 * and sets initial status to "todo".
 */
export async function createTaskRecord(data: {
  title: string;
  projectId?: string;
  sprintId?: string;
  creatorId: string;
  assigneeId?: string;
  priority?: TaskPriority;
  dueDate?: string;
  description?: string;
}): Promise<Task> {
  const [task] = await db.insert(tasks).values({
    id: createId(),
    title: data.title,
    projectId: data.projectId ?? null,
    sprintId: data.sprintId ?? null,
    creatorId: data.creatorId,
    assigneeId: data.assigneeId ?? data.creatorId,
    priority: data.priority ?? 'medium',
    status: 'todo',
    dueDate: data.dueDate ?? null,
    description: data.description ?? null,
  }).returning();

  logger.info({ taskId: task.id, title: task.title }, 'Task created');
  return task;
}

/**
 * Get tasks assigned to a user, optionally filtered by status.
 * Results are ordered by creation date, newest first.
 */
export async function getTasksByAssignee(userId: string, status?: TaskStatus): Promise<Task[]> {
  if (status) {
    return db.query.tasks.findMany({
      where: and(eq(tasks.assigneeId, userId), eq(tasks.status, status)),
      orderBy: [desc(tasks.createdAt)],
    });
  }
  return db.query.tasks.findMany({
    where: eq(tasks.assigneeId, userId),
    orderBy: [desc(tasks.createdAt)],
  });
}

/** Get tasks in a sprint */
export async function getTasksBySprint(sprintId: string): Promise<Task[]> {
  return db.query.tasks.findMany({
    where: eq(tasks.sprintId, sprintId),
  });
}

/**
 * Search tasks by title using case-insensitive substring matching.
 * Optionally scoped to a single project. Used by command handlers to
 * resolve task references from natural language input.
 */
export async function searchTaskByName(query: string, projectId?: string): Promise<Task[]> {
  if (projectId) {
    return db.query.tasks.findMany({
      where: and(eq(tasks.projectId, projectId), ilike(tasks.title, `%${query}%`)),
    });
  }
  return db.query.tasks.findMany({
    where: ilike(tasks.title, `%${query}%`),
  });
}

/**
 * Update a task's status. Automatically sets `completedAt` when
 * transitioning to "done".
 */
export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
  const updates: Record<string, unknown> = { status };
  if (status === 'done') updates.completedAt = new Date();

  const [updated] = await db.update(tasks).set(updates).where(eq(tasks.id, taskId)).returning();
  logger.info({ taskId, status }, 'Task status updated');
  return updated;
}

/** Update task priority */
export async function updateTaskPriority(taskId: string, priority: TaskPriority): Promise<Task> {
  const [updated] = await db.update(tasks).set({ priority }).where(eq(tasks.id, taskId)).returning();
  return updated;
}

/** Update task assignee */
export async function updateTaskAssignee(taskId: string, assigneeId: string): Promise<Task> {
  const [updated] = await db.update(tasks).set({ assigneeId }).where(eq(tasks.id, taskId)).returning();
  return updated;
}

/** Update task due date */
export async function updateTaskDueDate(taskId: string, dueDate: string): Promise<Task> {
  const [updated] = await db.update(tasks).set({ dueDate }).where(eq(tasks.id, taskId)).returning();
  return updated;
}
