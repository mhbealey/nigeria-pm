import { pgTable, text, timestamp, pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { users } from './users.js';

export const messageDirectionEnum = pgEnum('message_direction', ['inbound', 'outbound']);

export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  whatsappMessageId: text('whatsapp_message_id').unique(),
  userId: text('user_id').notNull().references(() => users.id),
  direction: messageDirectionEnum('direction').notNull(),
  content: text('content'),
  intent: text('intent'),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('messages_whatsapp_message_id_idx').on(table.whatsappMessageId),
]);

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));

/** A message record as stored in the database. */
export type Message = typeof messages.$inferSelect;

/** Shape used when inserting a new message. */
export type NewMessage = typeof messages.$inferInsert;
