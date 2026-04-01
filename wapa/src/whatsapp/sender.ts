import { whatsappConfig } from '../config/whatsapp.js';
import { logger } from '../utils/logger.js';
import { retry } from '../utils/retry.js';
import type { SendTextMessage, SendTemplateMessage, SendInteractiveMessage, SendReaction, ApiResponse } from './types.js';

/** Send a text message via WhatsApp Cloud API */
export async function sendTextMessage(to: string, body: string): Promise<ApiResponse> {
  const payload: SendTextMessage = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body },
  };
  return sendMessage(payload);
}

/** Send a template message */
export async function sendTemplateMessage(to: string, templateName: string, languageCode: string = 'en', components?: SendTemplateMessage['template']['components']): Promise<ApiResponse> {
  const payload: SendTemplateMessage = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name: templateName, language: { code: languageCode }, components },
  };
  return sendMessage(payload);
}

/** Send an interactive button message */
export async function sendInteractiveMessage(to: string, body: string, buttons: Array<{ id: string; title: string }>): Promise<ApiResponse> {
  const payload: SendInteractiveMessage = {
    messaging_product: 'whatsapp',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text: body },
      action: {
        buttons: buttons.map((b) => ({ type: 'reply' as const, reply: { id: b.id, title: b.title } })),
      },
    },
  };
  return sendMessage(payload);
}

/** Send a reaction emoji to a message */
export async function sendReaction(to: string, messageId: string, emoji: string): Promise<ApiResponse> {
  const payload: SendReaction = {
    messaging_product: 'whatsapp',
    to,
    type: 'reaction',
    reaction: { message_id: messageId, emoji },
  };
  return sendMessage(payload);
}

/** Send typing indicator (mark as read) */
export async function sendTypingIndicator(to: string): Promise<void> {
  try {
    await fetch(whatsappConfig.messagesUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: to, // This is actually the message ID to mark as read
      }),
    });
  } catch (err) {
    logger.debug({ err }, 'Failed to send typing indicator');
  }
}

/** Mark a message as read */
export async function markAsRead(messageId: string): Promise<void> {
  try {
    await fetch(whatsappConfig.messagesUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      }),
    });
  } catch (err) {
    logger.debug({ err }, 'Failed to mark message as read');
  }
}

/** Core message sending with retry */
async function sendMessage(payload: Record<string, unknown>): Promise<ApiResponse> {
  return retry(async () => {
    const response = await fetch(whatsappConfig.messagesUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappConfig.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      logger.error({ status: response.status, error }, 'WhatsApp API error');
      throw new Error(`WhatsApp API error: ${response.status}`);
    }

    return response.json() as Promise<ApiResponse>;
  }, { maxRetries: 2, baseDelay: 500 });
}
