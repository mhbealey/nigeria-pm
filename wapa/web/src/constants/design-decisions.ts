/**
 * WAPA Frontend Design Decisions — Agent Cognition Framework Part 2
 *
 * This file documents non-obvious architectural decisions for future developers.
 * Each decision explains WHAT was chosen, WHY, and what ALTERNATIVES were considered.
 */

/**
 * DECISION: Zustand over Redux/Context
 * WHY: Minimal boilerplate, no provider wrapping, excellent TypeScript inference.
 * ALTERNATIVE: Redux Toolkit — too much ceremony for a prototype.
 * ALTERNATIVE: React Context — re-renders entire tree on state change.
 * TRADE-OFF: Less middleware ecosystem, but we don't need middleware for a prototype.
 */

/**
 * DECISION: Framer Motion over CSS animations
 * WHY: Spring physics feel more natural than cubic-bezier. AnimatePresence handles
 *      exit animations that CSS alone cannot (unmounting components).
 * TRADE-OFF: +40KB bundle size, but justified for investor-demo polish.
 */

/**
 * DECISION: Mock data over backend API calls
 * WHY: This is a clickable prototype for investor demos. Real API integration
 *      would add complexity without adding demo value. The simulation engine
 *      provides realistic interactions without a server.
 * WHEN TO CHANGE: When moving from prototype to production MVP.
 */

/**
 * DECISION: CSS Custom Properties over Tailwind theme extension
 * WHY: CSS vars enable runtime theme switching (dark mode toggle) without
 *      rebuilding. Tailwind classes are compile-time only.
 * TRADE-OFF: Slightly more verbose (var(--wapa-green-500) vs text-wapa-green-500).
 */

/**
 * DECISION: Pattern-matching simulation over AI-powered responses
 * WHY: Deterministic responses are essential for repeatable investor demos.
 *      AI responses would vary each time, making the demo unpredictable.
 * TRADE-OFF: Limited freeform vocabulary, but guided scenarios cover the key flows.
 */

/**
 * DECISION: Single-page PhoneFrame over real WhatsApp screenshots
 * WHY: Interactive simulation lets investors TYPE commands and see responses.
 *      Screenshots are passive. The phone frame provides the "aha moment."
 */
