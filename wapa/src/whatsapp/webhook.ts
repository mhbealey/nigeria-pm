import { FastifyRequest, FastifyReply } from 'fastify';
import { logger } from '../utils/logger.js';
import { isDuplicate } from '../middleware/dedup.js';
import { checkRateLimit } from '../middleware/rate-limiter.js';
import { normalizePhone } from '../utils/phone.js';
import { sendTextMessage, markAsRead } from './sender.js';
import { processMessage } from '../commands/router.js';
import type { WebhookPayload, InboundMessage } from './types.js';

/** Handles incoming WhatsApp webhook events (POST /webhook) */
export async function webhookRoute(request: FastifyRequest, reply: FastifyReply) {
  // Immediately return 200 to acknowledge receipt
  reply.status(200).send({ status: 'ok' });

  try {
    const payload = request.body as WebhookPayload;
    if (payload.object !== 'whatsapp_business_account') return;

    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        const messages = change.value.messages;
        const contacts = change.value.contacts;
        if (!messages || !contacts) continue;

        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          const contact = contacts[i] ?? contacts[0];

          // Process each message asynchronously
          handleMessage(message, contact.profile.name, contact.wa_id).catch((err) => {
            logger.error({ err, messageId: message.id }, 'Failed to process message');
          });
        }
      }
    }
  } catch (err) {
    logger.error({ err }, 'Webhook processing error');
  }
}

async function handleMessage(message: InboundMessage, senderName: string, senderPhone: string) {
  const phone = normalizePhone(senderPhone);
  const childLogger = logger.child({ messageId: message.id, phone: phone.slice(0, 4) + '****' });

  // Mark as read immediately
  markAsRead(message.id).catch(() => {});

  // Deduplication check
  if (await isDuplicate(message.id)) {
    childLogger.debug('Skipping duplicate message');
    return;
  }

  // Rate limit check
  const rateResult = await checkRateLimit(phone);
  if (!rateResult.allowed) {
    childLogger.warn('Rate limit exceeded');
    await sendTextMessage(phone, "Whoa, slow down a bit! 😅 Try again in a minute.");
    return;
  }

  // Only handle text messages for now
  if (message.type !== 'text' || !message.text?.body) {
    childLogger.debug({ type: message.type }, 'Non-text message, skipping');
    return;
  }

  const text = message.text.body.trim();
  childLogger.info({ text: text.slice(0, 50) }, 'Processing message');

  // Route to command handler
  const response = await processMessage({
    text,
    senderPhone: phone,
    senderName,
    messageId: message.id,
  });

  if (response) {
    await sendTextMessage(phone, response);
  }
}
