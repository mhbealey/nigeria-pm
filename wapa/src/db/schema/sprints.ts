import { pgTable, text, timestamp, date, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { projects } from './projects.js';
import { tasks } from './tasks.js';

export const sprintStatusEnum = pgEnum('sprint_status', ['planning', 'active', 'completed']);

export const sprints = pgTable('sprints', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  status: sprintStatusEnum('status').notNull().default('planning'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const sprintsRelations = relations(sprints, ({ one, many }) => ({
  project: one(projects, {
    fields: [sprints.projectId],
    references: [projects.id],
  }),
  tasks: many(tasks),
}));

/** A sprint record as stored in the database. */
export type Sprint = typeof sprints.$inferSelect;

/** Shape used when inserting a new sprint. */
export type NewSprint = typeof sprints.$inferInsert;
