import Anthropic from '@anthropic-ai/sdk';
import { env } from './env.js';

/**
 * Pre-configured Anthropic SDK client for calling Claude APIs.
 * Timeout is set to 30 seconds with up to 2 automatic retries on transient failures.
 */
export const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
  timeout: 30_000,
  maxRetries: 2,
});

/** Default model used for NLP intent classification and text generation. */
export const NLP_MODEL = 'claude-3-5-haiku-20241022';
