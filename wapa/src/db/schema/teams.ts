import { pgTable, text, timestamp, index, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { users } from './users.js';
import { projects } from './projects.js';

export const teamRoleEnum = pgEnum('team_role', ['admin', 'member']);

export const teams = pgTable('teams', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  whatsappGroupId: text('whatsapp_group_id').unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('teams_whatsapp_group_id_idx').on(table.whatsappGroupId),
]);

export const teamMembers = pgTable('team_members', {
  teamId: text('team_id').notNull().references(() => teams.id),
  userId: text('user_id').notNull().references(() => users.id),
  role: teamRoleEnum('role').notNull().default('member'),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.teamId, table.userId] }),
]);

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  projects: many(projects),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

/** A team record as stored in the database. */
export type Team = typeof teams.$inferSelect;

/** Shape used when inserting a new team. */
export type NewTeam = typeof teams.$inferInsert;

/** A team member record as stored in the database. */
export type TeamMember = typeof teamMembers.$inferSelect;

/** Shape used when inserting a new team member. */
export type NewTeamMember = typeof teamMembers.$inferInsert;
