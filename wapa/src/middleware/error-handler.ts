import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import * as Sentry from '@sentry/node';
import { logger } from '../utils/logger.js';

/** Global Fastify error handler that logs errors, reports to Sentry, and returns a sanitized response */
export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  const requestId = request.id;

  logger.error({
    err: error,
    requestId,
    method: request.method,
    url: request.url,
  }, 'Request error');

  Sentry.captureException(error, {
    extra: { requestId, method: request.method, url: request.url },
  });

  const statusCode = error.statusCode ?? 500;
  return reply.status(statusCode).send({
    error: statusCode >= 500 ? 'Internal Server Error' : error.message,
    requestId,
  });
}
