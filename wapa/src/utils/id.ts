import { createId as cuid2 } from '@paralleldrive/cuid2';

/**
 * Generates a globally unique, collision-resistant CUID2 identifier.
 *
 * @returns A new CUID2 string.
 */
export function createId(): string {
  return cuid2();
}

/** Branded type for User identifiers. */
export type UserId = string & { readonly __brand: 'UserId' };

/** Branded type for Team identifiers. */
export type TeamId = string & { readonly __brand: 'TeamId' };

/** Branded type for Project identifiers. */
export type ProjectId = string & { readonly __brand: 'ProjectId' };

/** Branded type for Task identifiers. */
export type TaskId = string & { readonly __brand: 'TaskId' };

/** Branded type for Sprint identifiers. */
export type SprintId = string & { readonly __brand: 'SprintId' };

/** Branded type for Note identifiers. */
export type NoteId = string & { readonly __brand: 'NoteId' };

/** Branded type for Message identifiers. */
export type MessageId = string & { readonly __brand: 'MessageId' };
