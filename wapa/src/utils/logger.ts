import pino from 'pino';
import { env } from '../config/env.js';

/**
 * Application-wide Pino logger instance.
 * In development mode, uses pino-pretty for human-readable output and sets level to debug.
 * In production, outputs structured JSON at the configured LOG_LEVEL.
 */
export const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : env.LOG_LEVEL,
  transport: env.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Creates a child logger with additional contextual bindings (e.g., request ID, user ID).
 *
 * @param bindings - Key-value pairs to attach to every log entry from this child logger.
 * @returns A child Pino logger instance.
 */
export function createChildLogger(bindings: Record<string, unknown>) {
  return logger.child(bindings);
}
