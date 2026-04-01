import { pgTable, text, timestamp, index, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { teams } from './teams.js';
import { sprints } from './sprints.js';
import { tasks } from './tasks.js';

export const projectStatusEnum = pgEnum('project_status', ['active', 'archived']);

export const projects = pgTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  teamId: text('team_id').notNull().references(() => teams.id),
  name: text('name').notNull(),
  status: projectStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('projects_team_id_status_idx').on(table.teamId, table.status),
]);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  team: one(teams, {
    fields: [projects.teamId],
    references: [teams.id],
  }),
  sprints: many(sprints),
  tasks: many(tasks),
}));

/** A project record as stored in the database. */
export type Project = typeof projects.$inferSelect;

/** Shape used when inserting a new project. */
export type NewProject = typeof projects.$inferInsert;
