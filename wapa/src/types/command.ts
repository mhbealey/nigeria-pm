/** Context passed to every command handler */
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

/** Result returned by command handlers */
export interface CommandResult {
  reply: string;
  success: boolean;
  metadata?: Record<string, unknown>;
  duration?: number;
}

/** Command handler function signature */
export type CommandHandler = (ctx: CommandContext) => Promise<CommandResult>;
