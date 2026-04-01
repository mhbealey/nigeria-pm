/**
 * WAPA Constants — Agent Cognition Framework Part 9
 *
 * "Constants are design decisions frozen in code."
 * Each constant documents WHY the value was chosen, not just WHAT it is.
 */

// ─── Database Pool ───────────────────────────────────────────────
/** DECISION: 20 connections balances concurrency with PostgreSQL's default 100 max_connections, leaving room for admin/migration connections */
export const DB_POOL_MAX = 20;
/** DECISION: 30s idle timeout prevents connection hoarding while accommodating bursty WhatsApp traffic */
export const DB_IDLE_TIMEOUT_MS = 30_000;
/** DECISION: 5s connection timeout catches unreachable DB quickly without failing on cold starts */
export const DB_CONNECT_TIMEOUT_MS = 5_000;

// ─── Redis ───────────────────────────────────────────────────────
/** DECISION: 200ms initial retry keeps reconnection fast; exponential backoff to 5s prevents thundering herd */
export const REDIS_RETRY_MIN_MS = 200;
export const REDIS_RETRY_MAX_MS = 5_000;

// ─── Rate Limiting ───────────────────────────────────────────────
/** DECISION: 60s window with 30 max prevents abuse while allowing rapid task creation sessions */
export const RATE_LIMIT_WINDOW_SECONDS = 60;
export const RATE_LIMIT_MAX_REQUESTS = 30;

// ─── Job Queue ───────────────────────────────────────────────────
/** DECISION: 2s backoff gives downstream services time to recover without blocking the queue */
export const JOB_BACKOFF_DELAY_MS = 2_000;
/** DECISION: 100 removes per cleanup cycle balances memory with throughput */
export const JOB_REMOVE_ON_COMPLETE = 100;
/** DECISION: 500 failed jobs retained for debugging; older ones are auto-purged */
export const JOB_REMOVE_ON_FAIL = 500;

// ─── Caching ─────────────────────────────────────────────────────
/** DECISION: 5min TTL for user/context cache — fresh enough for real-time feel, stale enough to reduce DB hits */
export const CACHE_TTL_SECONDS = 300;

// ─── NLP ─────────────────────────────────────────────────────────
/** DECISION: 256 max tokens keeps Haiku responses concise and fast; longer responses indicate prompt issues */
export const NLP_MAX_TOKENS = 256;
/** DECISION: Confidence thresholds calibrated from testing: >0.85 = direct action, 0.60-0.85 = confirm, <0.60 = fallback */
export const CONFIDENCE_HIGH = 0.85;
export const CONFIDENCE_MEDIUM = 0.60;
/** DECISION: 0.3 fuzzy match threshold allows partial matches without false positives (tested with Nigerian names) */
export const FUZZY_MATCH_THRESHOLD = 0.3;
/** DECISION: 0.5 strong match threshold for high-confidence entity resolution */
export const FUZZY_MATCH_STRONG = 0.5;

// ─── WhatsApp ────────────────────────────────────────────────────
/** DECISION: 500ms retry delay for WhatsApp API matches their recommended retry-after guidance */
export const WHATSAPP_RETRY_DELAY_MS = 500;
/** DECISION: 280 char limit keeps single-bubble messages readable on mobile screens */
export const WHATSAPP_MESSAGE_MAX_LENGTH = 280;

// ─── API ─────────────────────────────────────────────────────────
/** DECISION: 30s timeout for Anthropic API — Haiku is fast but network variability in Nigeria requires generous timeout */
export const ANTHROPIC_TIMEOUT_MS = 30_000;

// ─── Display ─────────────────────────────────────────────────────
/** DECISION: 10 tasks per list response prevents message overflow on WhatsApp */
export const TASK_LIST_MAX_DISPLAY = 10;

// ─── Workers ─────────────────────────────────────────────────────
/** DECISION: Nudge after 48h gives assignees a full 2 working days before reminder */
export const BLOCKED_NUDGE_HOURS = 48;
/** DECISION: Max 3 due-date reminders prevents notification fatigue */
export const DUE_DATE_MAX_NUDGES = 3;
/** DECISION: 7-day TTL for reminder tracking keys — covers weekly sprint cycles */
export const DUE_DATE_REMINDER_TTL_SECONDS = 86_400 * 7;

// ─── Phone Formatting ────────────────────────────────────────────
/** DECISION: Mask all but last 6 digits for privacy while keeping enough for identification */
export const PHONE_VISIBLE_DIGITS = 6;
