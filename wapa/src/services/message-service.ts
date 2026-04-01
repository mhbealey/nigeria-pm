import { db } from '../config/database.js';
import { messages } from '../db/schema/messages.js';
import { createId } from '@paralleldrive/cuid2';

/** Log an inbound message */
export async function logInboundMessage(data: {
  whatsappMessageId: string;
  userId: string;
  content: string;
  intent?: string;
}): Promise<void> {
  await db.insert(messages).values({
    id: createId(),
    whatsappMessageId: data.whatsappMessageId,
    userId: data.userId,
    direction: 'inbound',
    content: data.content,
    intent: data.intent ?? null,
    processedAt: new Date(),
  });
}

/** Log an outbound message */
export async function logOutboundMessage(data: {
  whatsappMessageId: string;
  userId: string;
  content: string;
}): Promise<void> {
  await db.insert(messages).values({
    id: createId(),
    whatsappMessageId: data.whatsappMessageId,
    userId: data.userId,
    direction: 'outbound',
    content: data.content,
  });
}
