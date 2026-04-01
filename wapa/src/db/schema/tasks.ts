import { pgTable, text, timestamp, date, index, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { projects } from './projects.js';
import { sprints } from './sprints.js';
import { users } from './users.js';
import { notes } from './notes.js';

// DECISION: Status and priority are Postgres enums (not plain text columns) for three reasons:
// 1. DB-level constraint prevents invalid values without application-level validation
// 2. Enums use 4 bytes per row vs variable-length strings — measurable savings at scale
// 3. Drizzle infers the union type automatically, so TypeScript catches invalid values at compile time
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'blocked', 'done']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  projectId: text('project_id').notNull().references(() => projects.id),
  sprintId: text('sprint_id').references(() => sprints.id),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull().default('todo'),
  priority: taskPriorityEnum('priority').notNull().default('medium'),
  assigneeId: text('assignee_id').references(() => users.id),
  creatorId: text('creator_id').notNull().references(() => users.id),
  dueDate: date('due_date'),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  // DECISION: Composite indexes pair each foreign key with status because nearly every query filters
  // by status (e.g., "show my open tasks", "sprint progress"). A single-column index on assigneeId
  // would still require a table scan to filter by status. The composite index lets Postgres satisfy
  // WHERE assignee_id = ? AND status = 'todo' entirely from the index without hitting the heap.
  index('tasks_project_id_status_idx').on(table.projectId, table.status),
  index('tasks_assignee_id_status_idx').on(table.assigneeId, table.status),
  index('tasks_sprint_id_status_idx').on(table.sprintId, table.status),
]);

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  sprint: one(sprints, {
    fields: [tasks.sprintId],
    references: [sprints.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
    relationName: 'assignedTasks',
  }),
  creator: one(users, {
    fields: [tasks.creatorId],
    references: [users.id],
    relationName: 'createdTasks',
  }),
  notes: many(notes),
}));

/** A task record as stored in the database. */
export type Task = typeof tasks.$inferSelect;

/** Shape used when inserting a new task. */
export type NewTask = typeof tasks.$inferInsert;
