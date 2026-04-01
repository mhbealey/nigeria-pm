/**
 * WAPA Error Taxonomy — Agent Cognition Framework Part 6
 *
 * Four-level error hierarchy:
 * 1. BusinessError — Expected domain errors (task not found, sprint full, duplicate)
 * 2. ValidationError — Input validation failures (missing fields, invalid format)
 * 3. InfrastructureError — External system failures (DB down, API timeout, Redis unreachable)
 * 4. ProgrammingError — Bugs that should never reach production
 *
 * Error Response Formula: Acknowledge → Explain → Guide
 * Never expose internals or blame the user.
 */

export enum ErrorCode {
  // Business errors (1xxx)
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
  SPRINT_NOT_FOUND = 'SPRINT_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  TEAM_NOT_FOUND = 'TEAM_NOT_FOUND',
  DUPLICATE_TASK = 'DUPLICATE_TASK',
  SPRINT_FULL = 'SPRINT_FULL',
  TASK_ALREADY_COMPLETED = 'TASK_ALREADY_COMPLETED',
  TASK_ALREADY_BLOCKED = 'TASK_ALREADY_BLOCKED',
  TASK_NOT_BLOCKED = 'TASK_NOT_BLOCKED',
  UNAUTHORIZED_ACTION = 'UNAUTHORIZED_ACTION',

  // Validation errors (2xxx)
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  INVALID_DATE = 'INVALID_DATE',
  INVALID_PRIORITY = 'INVALID_PRIORITY',
  INVALID_STATUS = 'INVALID_STATUS',
  MESSAGE_TOO_LONG = 'MESSAGE_TOO_LONG',
  AMBIGUOUS_USER = 'AMBIGUOUS_USER',
  AMBIGUOUS_TASK = 'AMBIGUOUS_TASK',

  // Infrastructure errors (3xxx)
  DATABASE_ERROR = 'DATABASE_ERROR',
  REDIS_ERROR = 'REDIS_ERROR',
  WHATSAPP_API_ERROR = 'WHATSAPP_API_ERROR',
  ANTHROPIC_API_ERROR = 'ANTHROPIC_API_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Programming errors (4xxx)
  INVARIANT_VIOLATION = 'INVARIANT_VIOLATION',
  UNHANDLED_INTENT = 'UNHANDLED_INTENT',
  INVALID_STATE = 'INVALID_STATE',
}

export abstract class WapaError extends Error {
  abstract readonly level: 'business' | 'validation' | 'infrastructure' | 'programming';
  abstract readonly code: ErrorCode;
  abstract readonly statusCode: number;
  abstract readonly userMessage: string;
  readonly timestamp = new Date().toISOString();

  constructor(message: string, public readonly context?: Record<string, unknown>) {
    super(message);
    this.name = new.target.name;
  }

  /** Acknowledge → Explain → Guide response formula */
  toUserResponse(): string {
    return this.userMessage;
  }

  toLog(): Record<string, unknown> {
    return {
      error: this.name,
      code: this.code,
      level: this.level,
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
    };
  }
}

/** Level 1: Expected domain errors — handle gracefully with friendly messages */
export class BusinessError extends WapaError {
  readonly level = 'business' as const;
  readonly statusCode = 400;

  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly userMessage: string,
    context?: Record<string, unknown>,
  ) {
    super(message, context);
  }
}

/** Level 2: Input validation failures — reject early with specific corrections */
export class ValidationError extends WapaError {
  readonly level = 'validation' as const;
  readonly statusCode = 422;

  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly userMessage: string,
    readonly field?: string,
    context?: Record<string, unknown>,
  ) {
    super(message, context);
  }
}

/** Level 3: External system failures — degrade gracefully with retry logic */
export class InfrastructureError extends WapaError {
  readonly level = 'infrastructure' as const;
  readonly statusCode = 503;

  constructor(
    readonly code: ErrorCode,
    message: string,
    readonly retryable: boolean = true,
    context?: Record<string, unknown>,
  ) {
    super(message, context);
  }

  get userMessage(): string {
    return this.retryable
      ? "I'm having a brief connectivity issue. Please try again in a moment. 🔄"
      : "Something went wrong on our end. The team has been notified. 🛠️";
  }
}

/** Level 4: Bugs that should never reach production — log with full context */
export class ProgrammingError extends WapaError {
  readonly level = 'programming' as const;
  readonly statusCode = 500;

  constructor(
    readonly code: ErrorCode,
    message: string,
    context?: Record<string, unknown>,
  ) {
    super(message, context);
  }

  get userMessage(): string {
    return "Something unexpected happened. The team has been notified and is looking into it. 🛠️";
  }
}

/** Type guard for WapaError */
export function isWapaError(error: unknown): error is WapaError {
  return error instanceof WapaError;
}

/** Factory functions for common errors */
export const Errors = {
  taskNotFound: (taskId: string) =>
    new BusinessError(ErrorCode.TASK_NOT_FOUND, `Task ${taskId} not found`, "I couldn't find that task. Could you double-check the name or try listing your tasks with \"list tasks\"?", { taskId }),

  projectNotFound: (projectId: string) =>
    new BusinessError(ErrorCode.PROJECT_NOT_FOUND, `Project ${projectId} not found`, "I couldn't find that project. Try \"list projects\" to see what's available.", { projectId }),

  sprintNotFound: (sprintId: string) =>
    new BusinessError(ErrorCode.SPRINT_NOT_FOUND, `Sprint ${sprintId} not found`, "I couldn't find that sprint. Check the current sprint with \"sprint status\".", { sprintId }),

  userNotFound: (identifier: string) =>
    new BusinessError(ErrorCode.USER_NOT_FOUND, `User ${identifier} not found`, `I couldn't find anyone named "${identifier}" on this team. Check the spelling or try "team" to see all members.`, { identifier }),

  duplicateTask: (title: string) =>
    new BusinessError(ErrorCode.DUPLICATE_TASK, `Task "${title}" already exists`, `A task called "${title}" already exists. Want to update it instead?`, { title }),

  taskAlreadyCompleted: (title: string) =>
    new BusinessError(ErrorCode.TASK_ALREADY_COMPLETED, `Task "${title}" already completed`, `"${title}" is already marked as done! 🎉`, { title }),

  missingField: (field: string) =>
    new ValidationError(ErrorCode.MISSING_REQUIRED_FIELD, `Missing required field: ${field}`, `I need a ${field} to continue. Could you include it?`, field),

  invalidDate: (input: string) =>
    new ValidationError(ErrorCode.INVALID_DATE, `Invalid date: ${input}`, `I couldn't understand "${input}" as a date. Try something like "tomorrow", "next Friday", or "March 15".`, 'date', { input }),

  ambiguousUser: (name: string, matches: string[]) =>
    new ValidationError(ErrorCode.AMBIGUOUS_USER, `Ambiguous user: ${name}`, `Multiple people match "${name}": ${matches.join(', ')}. Could you be more specific?`, 'assignee', { name, matches }),

  ambiguousTask: (name: string, matches: string[]) =>
    new ValidationError(ErrorCode.AMBIGUOUS_TASK, `Ambiguous task: ${name}`, `Multiple tasks match "${name}": ${matches.join(', ')}. Which one did you mean?`, 'task', { name, matches }),

  databaseError: (operation: string, cause?: unknown) =>
    new InfrastructureError(ErrorCode.DATABASE_ERROR, `Database error during ${operation}`, true, { operation, cause: String(cause) }),

  redisError: (operation: string, cause?: unknown) =>
    new InfrastructureError(ErrorCode.REDIS_ERROR, `Redis error during ${operation}`, true, { operation, cause: String(cause) }),

  whatsappApiError: (operation: string, statusCode?: number) =>
    new InfrastructureError(ErrorCode.WHATSAPP_API_ERROR, `WhatsApp API error: ${operation}`, statusCode !== 400, { operation, statusCode }),

  anthropicApiError: (cause?: unknown) =>
    new InfrastructureError(ErrorCode.ANTHROPIC_API_ERROR, 'Anthropic API error', true, { cause: String(cause) }),

  rateLimitExceeded: (phoneNumber: string) =>
    new InfrastructureError(ErrorCode.RATE_LIMIT_EXCEEDED, `Rate limit exceeded for ${phoneNumber}`, false, { phoneNumber }),

  invariantViolation: (condition: string) =>
    new ProgrammingError(ErrorCode.INVARIANT_VIOLATION, `Invariant violation: ${condition}`, { condition }),

  unhandledIntent: (intent: string) =>
    new ProgrammingError(ErrorCode.UNHANDLED_INTENT, `No handler for intent: ${intent}`, { intent }),

  invalidState: (description: string) =>
    new ProgrammingError(ErrorCode.INVALID_STATE, `Invalid state: ${description}`, { description }),
} as const;
