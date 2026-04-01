/**
 * Context passed to every command handler after NLP parsing.
 * Populated by the router from the user record and parsed entities.
 * Handlers should treat this as read-only; mutations belong in services.
 */
export interface CommandContext {
  userId: string;
  userName: string;
  userPhone: string;
  teamId?: string;
  projectId?: string;
  sprintId?: string;
  messageId: string;
  rawText: string;
  entities: {
    taskName?: string;
    assigneeName?: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    projectName?: string;
    noteContent?: string;
    blockReason?: string;
  };
}

/**
 * Result returned by command handlers to the router.
 * The router uses `reply` as the WhatsApp response text and logs `success`
 * plus optional `metadata` for observability. Handlers must always return
 * a user-friendly `reply` even on failure.
 */
export interface CommandResult {
  reply: string;
  success: boolean;
  metadata?: Record<string, unknown>;
  duration?: number;
}

/** Command handler function signature */
export type CommandHandler = (ctx: CommandContext) => Promise<CommandResult>;
