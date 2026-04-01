import { FastifyRequest, FastifyReply } from 'fastify';
import { whatsappConfig } from '../config/whatsapp.js';
import { logger } from '../utils/logger.js';

/** Handles Meta's webhook verification challenge (GET /webhook) */
export async function verifyRoute(
  request: FastifyRequest<{ Querystring: { 'hub.mode'?: string; 'hub.verify_token'?: string; 'hub.challenge'?: string } }>,
  reply: FastifyReply,
) {
  const mode = request.query['hub.mode'];
  const token = request.query['hub.verify_token'];
  const challenge = request.query['hub.challenge'];

  if (mode === 'subscribe' && token === whatsappConfig.verifyToken) {
    logger.info('Webhook verified successfully');
    return reply.status(200).send(challenge);
  }

  logger.warn({ mode, tokenMatch: token === whatsappConfig.verifyToken }, 'Webhook verification failed');
  return reply.status(403).send({ error: 'Verification failed' });
}
