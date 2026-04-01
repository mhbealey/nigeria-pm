/**
 * WAPA Inter-Agent Contracts — Agent Cognition Framework Part 4
 *
 * These interfaces define the typed boundaries between system components.
 * When an upstream agent changes a contract, downstream agents must be updated.
 *
 * Contract Hierarchy:
 *   WhatsApp Layer → NLP Layer → Command Layer → Service Layer → DB Layer
 */

import type { Intent } from '../nlp/types.js';

/** Contract: WhatsApp webhook delivers this to the NLP layer */
export interface InboundMessage {
  /** WhatsApp message ID for dedup */
  readonly messageId: string;
  /** Sender's phone number in E.164 format */
  readonly phoneNumber: string;
  /** Raw message text from user */
  readonly text: string;
  /** ISO 8601 timestamp from WhatsApp */
  readonly timestamp: string;
  /** Message type — we only process 'text' currently */
  readonly type: 'text' | 'image' | 'audio' | 'document';
}

/** Contract: NLP layer delivers this to the Command layer */
export interface ParsedIntent {
  /** Classified intent */
  readonly intent: Intent;
  /** Confidence score 0-1 — see CONFIDENCE_HIGH/MEDIUM in constants */
  readonly confidence: number;
  /** Extracted entities (task name, assignee, date, etc.) */
  readonly entities: Record<string, string>;
  /** Original text for context */
  readonly originalText: string;
}

/** Contract: Command layer delivers this to the WhatsApp sender */
export interface CommandResponse {
  /** User-friendly response text (WhatsApp markdown supported) */
  readonly text: string;
  /** Whether the command mutated state (for analytics) */
  readonly mutated: boolean;
  /** Optional follow-up prompt to guide the user */
  readonly followUp?: string;
}

/** Contract: Service layer returns this from state-changing operations */
export interface MutationResult<T> {
  /** The created/updated entity */
  readonly data: T;
  /** Human-readable description of what changed */
  readonly summary: string;
  /** Side effects triggered (notifications, jobs, etc.) */
  readonly sideEffects: string[];
}
