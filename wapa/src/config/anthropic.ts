import Anthropic from '@anthropic-ai/sdk';
import { env } from './env.js';
import { ANTHROPIC_TIMEOUT_MS } from '../constants/index.js';

/**
 * Pre-configured Anthropic SDK client for calling Claude APIs.
 * Timeout and retry configuration rationale documented in constants/index.ts.
 */
export const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
  timeout: ANTHROPIC_TIMEOUT_MS,
  maxRetries: 2,
});

/** Default model used for NLP intent classification and text generation. */
export const NLP_MODEL = 'claude-3-5-haiku-20241022';
