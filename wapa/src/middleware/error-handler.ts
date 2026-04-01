import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import * as Sentry from '@sentry/node';
import { logger } from '../utils/logger.js';
import {
  isWapaError,
  WapaError,
  BusinessError,
  ValidationError,
  InfrastructureError,
  ProgrammingError,
} from '../errors/index.js';

/** Log a WapaError at the appropriate level based on its error tier */
function logWapaError(error: WapaError, requestId: string): void {
  const logPayload = {
    ...error.toLog(),
    requestId,
  };

  if (error instanceof BusinessError) {
    logger.warn(logPayload, `Business error: ${error.code}`);
  } else if (error instanceof ValidationError) {
    logger.info(logPayload, `Validation error: ${error.code}`);
  } else if (error instanceof InfrastructureError) {
    logger.error(
      { ...logPayload, retryable: error.retryable },
      `Infrastructure error: ${error.code}`,
    );
  } else if (error instanceof ProgrammingError) {
    logger.error(
      { ...logPayload, stack: error.stack },
      `Programming error: ${error.code}`,
    );
  }
}

/** Global Fastify error handler that logs errors, reports to Sentry, and returns a sanitized response */
export function errorHandler(error: FastifyError | Error, request: FastifyRequest, reply: FastifyReply) {
  const requestId = request.id;

  // Handle WapaError hierarchy with level-appropriate logging
  if (isWapaError(error)) {
    logWapaError(error, requestId);

    // Only report infrastructure and programming errors to Sentry
    if (error instanceof InfrastructureError || error instanceof ProgrammingError) {
      Sentry.captureException(error, {
        extra: { requestId, method: request.method, url: request.url, ...error.toLog() },
      });
    }

    return reply.status(error.statusCode).send({
      error: error.code,
      message: error.toUserResponse(),
      requestId,
    });
  }

  // Fallback for non-WapaError errors (e.g. Fastify built-in errors)
  logger.error({
    err: error,
    requestId,
    method: request.method,
    url: request.url,
  }, 'Unclassified request error');

  Sentry.captureException(error, {
    extra: { requestId, method: request.method, url: request.url },
  });

  const statusCode = (error as FastifyError).statusCode ?? 500;
  return reply.status(statusCode).send({
    error: statusCode >= 500 ? 'Internal Server Error' : error.message,
    requestId,
  });
}
