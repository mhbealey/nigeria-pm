import { createHmac } from 'node:crypto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { whatsappConfig } from '../config/whatsapp.js';
import { logger } from '../utils/logger.js';

declare module 'fastify' {
  interface FastifyRequest {
    rawBody?: Buffer;
  }
}

/**
 * Verifies the X-Hub-Signature-256 header from Meta webhooks.
 * Computes an HMAC-SHA256 of the raw body using the app secret and compares it
 * against the provided signature.
 * @param rawBody - The raw request body as a Buffer
 * @param signature - The value of the X-Hub-Signature-256 header
 * @returns true if the signature is valid, false otherwise
 */
export function verifySignature(rawBody: Buffer, signature: string | undefined): boolean {
  if (!signature) return false;

  const expectedSignature = 'sha256=' + createHmac('sha256', whatsappConfig.appSecret)
    .update(rawBody)
    .digest('hex');

  return signature === expectedSignature;
}

/**
 * Fastify preHandler hook for Meta webhook signature verification.
 * Rejects requests with a 401 status if the X-Hub-Signature-256 header
 * is missing or does not match the expected HMAC digest.
 */
export async function signatureVerifyHook(request: FastifyRequest, reply: FastifyReply) {
  const signature = request.headers['x-hub-signature-256'] as string | undefined;
  const rawBody = request.rawBody;

  if (!rawBody || !verifySignature(rawBody, signature)) {
    logger.warn({ ip: request.ip }, 'Invalid webhook signature');
    return reply.status(401).send({ error: 'Invalid signature' });
  }
}
