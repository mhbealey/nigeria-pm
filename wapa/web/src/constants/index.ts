/**
 * WAPA Frontend Constants — Agent Cognition Framework Part 9
 *
 * Constants as design decisions frozen in code.
 * Each constant documents WHY the value was chosen.
 */

// ─── WhatsApp Colors (Authentic) ─────────────────────────────────
/** DECISION: These are the exact colors from WhatsApp Web as of 2024, verified with devtools */
export const WHATSAPP_COLORS = {
  /** Outgoing message bubble — the distinctive green tint */
  OUTGOING_BUBBLE: '#d9fdd3',
  /** Incoming message bubble */
  INCOMING_BUBBLE: '#ffffff',
  /** Chat background — the doodle pattern background */
  CHAT_BG: '#efeae2',
  /** Header/primary brand green */
  PRIMARY: '#25d366',
  /** Header bar dark green */
  HEADER: '#075e54',
  /** Secondary/teal green */
  TEAL: '#128c7e',
  /** Read receipt blue (double blue check) */
  READ_RECEIPT_BLUE: '#53bdeb',
  /** Unread receipt gray (single/double gray check) */
  UNREAD_RECEIPT_GRAY: '#8696a0',
} as const;

// ─── Animation Timing ────────────────────────────────────────────
/** DECISION: Delays calibrated to feel natural — too fast feels robotic, too slow feels broken */
export const ANIMATION = {
  /** Base typing delay before WAPA responds — matches human "thinking" perception */
  TYPING_BASE_MS: 400,
  /** Per-character addition to typing delay — longer messages take longer to "type" */
  TYPING_PER_CHAR_MS: 15,
  /** Random variance on typing delay to feel organic (±ms) */
  TYPING_VARIANCE_MS: 200,
  /** Stagger delay between child elements in list animations */
  STAGGER_DELAY: 0.05,
  /** Spring stiffness for interactive elements (buttons, toggles) */
  SPRING_STIFFNESS: 400,
  /** Spring damping for interactive elements */
  SPRING_DAMPING: 25,
  /** Duration for page transitions */
  PAGE_TRANSITION_MS: 250,
  /** Duration for micro-interactions (hover, focus) */
  MICRO_INTERACTION_MS: 150,
} as const;

// ─── Layout ──────────────────────────────────────────────────────
/** DECISION: Sidebar 240px matches Linear/Notion convention — wide enough for labels, narrow enough for content */
export const LAYOUT = {
  SIDEBAR_WIDTH: 240,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  TASK_DETAIL_PANEL_WIDTH: 400,
  PHONE_FRAME_MAX_WIDTH: 420,
  TOP_BAR_HEIGHT: 56,
} as const;

// ─── Demo/Simulation ─────────────────────────────────────────────
/** DECISION: Scenario count and speed presets designed for investor demos — 4 scenarios cover the core value prop */
export const DEMO = {
  SCENARIO_COUNT: 4,
  SPEED_PRESETS: [0.5, 1, 2] as const,
  /** Confetti particle count — 16 feels celebratory without being overwhelming */
  CONFETTI_PARTICLES: 16,
  /** Max messages to keep in chat history to prevent memory issues */
  MAX_CHAT_MESSAGES: 200,
  /** Scroll threshold (px from bottom) to auto-scroll new messages */
  AUTO_SCROLL_THRESHOLD: 100,
} as const;

// ─── Time Formatting ─────────────────────────────────────────────
export const TIME = {
  MS_PER_MINUTE: 60_000,
  MS_PER_HOUR: 3_600_000,
  MS_PER_DAY: 86_400_000,
} as const;
