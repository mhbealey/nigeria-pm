import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import * as Sentry from '@sentry/node';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { redis } from './config/redis.js';
import { pool } from './config/database.js';
import { webhookRoute } from './whatsapp/webhook.js';
import { verifyRoute } from './whatsapp/verify.js';
import { errorHandler } from './middleware/error-handler.js';

/** Boots and starts the Fastify server */
async function start() {
  // Initialize Sentry if DSN is configured
  if (env.SENTRY_DSN) {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      environment: env.NODE_ENV,
      tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
    });
  }

  const app = Fastify({
    logger: false, // We use our own Pino logger
    trustProxy: true,
  });

  // Plugins
  await app.register(cors);
  await app.register(helmet);

  // Global error handler
  app.setErrorHandler(errorHandler);

  // Health check
  app.get('/health', async (_request, reply) => {
    const redisOk = await redis.ping().then(() => true).catch(() => false);
    const dbOk = await pool.query('SELECT 1').then(() => true).catch(() => false);

    const status = redisOk && dbOk ? 'healthy' : 'degraded';
    const code = status === 'healthy' ? 200 : 503;

    return reply.status(code).send({
      status,
      timestamp: new Date().toISOString(),
      services: { database: dbOk, redis: redisOk },
    });
  });

  // WhatsApp webhook routes
  app.get('/webhook', verifyRoute);
  app.post('/webhook', webhookRoute);

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, async () => {
      logger.info({ signal }, 'Shutting down gracefully');
      await app.close();
      await redis.quit();
      await pool.end();
      process.exit(0);
    });
  }

  // Connect Redis
  await redis.connect();

  // Start server
  await app.listen({ port: env.PORT, host: '0.0.0.0' });
  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'WAPA server started');
}

start().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
