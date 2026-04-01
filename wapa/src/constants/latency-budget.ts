/**
 * WAPA Latency Budget — Agent Cognition Framework Part 7
 *
 * Total response time target: 800ms
 * Each component has an allocated time slice.
 *
 * Budget breakdown:
 *   Webhook receive + validate:    50ms
 *   Dedup check (Redis):           20ms
 *   Rate limit check (Redis):      20ms
 *   NLP intent classification:    300ms  (Claude Haiku)
 *   Entity extraction:            100ms
 *   Command execution (DB):       200ms
 *   WhatsApp reply send:          100ms
 *   Buffer:                        10ms
 *   ─────────────────────────────
 *   Total:                        800ms
 */

export const LATENCY_BUDGET = {
  /** Total end-to-end response time target */
  TOTAL_MS: 800,

  /** Webhook receive, signature verify, parse */
  WEBHOOK_RECEIVE_MS: 50,

  /** Redis dedup check */
  DEDUP_CHECK_MS: 20,

  /** Redis rate limit check */
  RATE_LIMIT_CHECK_MS: 20,

  /** Claude Haiku intent classification */
  NLP_CLASSIFY_MS: 300,

  /** Entity extraction from parsed message */
  ENTITY_EXTRACT_MS: 100,

  /** Command handler DB operations */
  COMMAND_EXECUTE_MS: 200,

  /** WhatsApp Cloud API send */
  WHATSAPP_SEND_MS: 100,

  /** Buffer for variance */
  BUFFER_MS: 10,
} as const;

/** Performance rules — the 5 commandments */
export const PERFORMANCE_RULES = {
  /** Rule 1: Prefer Promise.all over sequential awaits */
  PARALLEL_OVER_SEQUENTIAL: 'Use Promise.all for independent async operations',
  /** Rule 2: SELECT only needed columns, not * */
  FETCH_ONLY_NEEDED: 'Never SELECT * — specify columns explicitly',
  /** Rule 3: Every WHERE clause column must have an index */
  USE_INDEXES: 'Add indexes for every filtered/sorted column',
  /** Rule 4: Cache reads that happen more than once per minute */
  CACHE_STRATEGICALLY: 'Cache with TTL for frequently-read, rarely-written data',
  /** Rule 5: Return 200 immediately on webhooks, process async */
  WEBHOOK_FAST_ACK: 'Acknowledge webhooks immediately, process in background',
} as const;
