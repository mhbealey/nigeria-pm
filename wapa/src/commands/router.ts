import { Intent } from '../nlp/types.js';
import type { CommandContext, CommandResult, CommandHandler } from '../types/command.js';
import type { IncomingMessage } from '../types/common.js';
import { parseMessage } from '../nlp/intent-parser.js';
import { logger } from '../utils/logger.js';
import { createTask } from './create-task.js';
import { assignTask } from './assign-task.js';
import { completeTask } from './complete-task.js';
import { listTasks } from './list-tasks.js';
import { sprintStatus } from './sprint-status.js';
import { setDueDate } from './set-due-date.js';
import { setPriority } from './set-priority.js';
import { addNote } from './add-note.js';
import { blockTask } from './block-task.js';
import { unblockTask } from './unblock-task.js';
import { createProject } from './create-project.js';
import { help } from './help.js';
import { unknown } from './unknown.js';
import { db } from '../config/database.js';
import { users } from '../db/schema/users.js';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

const handlers: Record<Intent, CommandHandler> = {
  [Intent.CREATE_TASK]: createTask,
  [Intent.ASSIGN_TASK]: assignTask,
  [Intent.COMPLETE_TASK]: completeTask,
  [Intent.LIST_TASKS]: listTasks,
  [Intent.SPRINT_STATUS]: sprintStatus,
  [Intent.SET_DUE_DATE]: setDueDate,
  [Intent.SET_PRIORITY]: setPriority,
  [Intent.ADD_NOTE]: addNote,
  [Intent.BLOCK_TASK]: blockTask,
  [Intent.UNBLOCK_TASK]: unblockTask,
  [Intent.CREATE_PROJECT]: createProject,
  [Intent.HELP]: help,
  [Intent.GREETING]: greeting,
  [Intent.UNKNOWN]: unknown,
};

/** Greeting handler */
async function greeting(ctx: CommandContext): Promise<CommandResult> {
  const replies = [
    `👋 Hey ${ctx.userName}! What are we working on?`,
    `Hey! 👋 Ready when you are.`,
    `Hi ${ctx.userName}! Need anything?`,
  ];
  return { reply: replies[Math.floor(Math.random() * replies.length)], success: true };
}

/** Process an incoming message through the NLP → command pipeline */
export async function processMessage(message: IncomingMessage): Promise<string> {
  const startTime = Date.now();

  // Find or create user
  let user = await db.query.users.findFirst({
    where: eq(users.phone, message.senderPhone),
  });

  if (!user) {
    const [newUser] = await db.insert(users).values({
      id: createId(),
      phone: message.senderPhone,
      name: message.senderName,
    }).returning();
    user = newUser;
  }

  // Parse message with NLP
  const parseResult = await parseMessage(message.text, {
    userName: user.name ?? message.senderName,
    recentTaskTitles: [],
    teamMemberNames: [],
  });

  // Build command context
  const ctx: CommandContext = {
    userId: user.id,
    userName: user.name ?? message.senderName,
    userPhone: message.senderPhone,
    messageId: message.messageId,
    rawText: message.text,
    entities: parseResult.entities,
  };

  // Route to handler
  const handler = handlers[parseResult.intent];
  const result = await handler(ctx);

  const duration = Date.now() - startTime;
  logger.info({
    intent: parseResult.intent,
    confidence: parseResult.confidence,
    success: result.success,
    duration,
  }, 'Command processed');

  // If confidence is medium, prepend confirmation
  if (parseResult.confidence >= 0.60 && parseResult.confidence < 0.85 && result.success) {
    return `I think you want to ${parseResult.intent.replace(/_/g, ' ')} — ${result.reply}\n\nNot right? Just rephrase and I'll try again.`;
  }

  return result.reply;
}
