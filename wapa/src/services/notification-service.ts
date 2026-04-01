import { sendTextMessage } from '../whatsapp/sender.js';
import { logger } from '../utils/logger.js';

/** Notify a user about a task assignment */
export async function notifyAssignment(phone: string, taskTitle: string, assignerName: string): Promise<void> {
  await sendTextMessage(phone, `📌 ${assignerName} assigned *${taskTitle}* to you`);
  logger.info({ phone: phone.slice(0, 6) + '****' }, 'Assignment notification sent');
}

/** Notify team about a blocked task */
export async function notifyBlocked(phones: string[], taskTitle: string, reason?: string): Promise<void> {
  const reasonText = reason ? ` — reason: ${reason}` : '';
  const message = `🚫 *${taskTitle}* is blocked${reasonText}. Can anyone help unblock?`;

  for (const phone of phones) {
    await sendTextMessage(phone, message);
  }
}

/** Notify about upcoming due date */
export async function notifyDueDate(phone: string, taskTitle: string, dueDate: string, isOverdue: boolean): Promise<void> {
  if (isOverdue) {
    await sendTextMessage(phone, `⏰ *${taskTitle}* was due ${dueDate} — need more time?`);
  } else {
    await sendTextMessage(phone, `📅 Reminder: *${taskTitle}* is due ${dueDate}`);
  }
}

/** Notify about sprint completion */
export async function notifySprintComplete(phones: string[], sprintName: string, totalTasks: number): Promise<void> {
  const message = `🎉 *${sprintName}* is complete! ${totalTasks} tasks shipped. Great work, team!`;
  for (const phone of phones) {
    await sendTextMessage(phone, message);
  }
}
