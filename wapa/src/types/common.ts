/** Incoming message from webhook processing pipeline */
export interface IncomingMessage {
  text: string;
  senderPhone: string;
  senderName: string;
  messageId: string;
  groupId?: string;
}

/** Task status type */
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

/** Task priority type */
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

/** Team member role */
export type TeamRole = 'admin' | 'member';
