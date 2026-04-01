import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { teamMembers } from './teams.js';
import { tasks } from './tasks.js';
import { notes } from './notes.js';

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  phone: text('phone').unique().notNull(),
  name: text('name'),
  timezone: text('timezone').default('UTC'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('users_phone_idx').on(table.phone),
]);

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  assignedTasks: many(tasks),
  createdTasks: many(tasks),
  notes: many(notes),
}));

/** A user record as stored in the database. */
export type User = typeof users.$inferSelect;

/** Shape used when inserting a new user. */
export type NewUser = typeof users.$inferInsert;
