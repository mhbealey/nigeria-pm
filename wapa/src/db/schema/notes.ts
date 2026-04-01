import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { tasks } from './tasks.js';
import { users } from './users.js';

export const notes = pgTable('notes', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  taskId: text('task_id').notNull().references(() => tasks.id),
  authorId: text('author_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  task: one(tasks, {
    fields: [notes.taskId],
    references: [tasks.id],
  }),
  author: one(users, {
    fields: [notes.authorId],
    references: [users.id],
  }),
}));

/** A note record as stored in the database. */
export type Note = typeof notes.$inferSelect;

/** Shape used when inserting a new note. */
export type NewNote = typeof notes.$inferInsert;
