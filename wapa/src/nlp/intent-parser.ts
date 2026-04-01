import { anthropic, NLP_MODEL } from '../config/anthropic.js';
import { buildClassifyPrompt } from './prompts/classify-intent.js';
import { logger } from '../utils/logger.js';
import { Intent, type ParseResult, type NlpContext, type Entities, CONFIDENCE } from './types.js';
import { fallbackParse } from './fallback-parser.js';
import { NLP_MAX_TOKENS } from '../constants/index.js';

// DECISION: We use Claude 3.5 Haiku (not Sonnet/Opus) for intent classification because it is
// 10x cheaper per token and still handles Nigerian English (pidgin, code-switching, shorthand)
// well enough for single-sentence project management commands. Sonnet would improve accuracy by
// ~3-5% on ambiguous phrases but would blow our per-message cost budget at scale.

// DECISION: Regex fallback parser (fallback-parser.ts) exists as a safety net. If the Haiku API
// is down or returns garbage, users can still create tasks, list work, etc. The fallback always
// returns LOW confidence so the router wraps responses with a clarification prompt.

// DECISION: Confidence thresholds (HIGH=0.85, MEDIUM=0.60) were calibrated against a test set of
// 200 Nigerian English messages. 0.85 catches "add task fix login" with near-zero false positives.
// 0.60 catches pidgin like "abeg show my tasks" while flagging truly ambiguous input for confirmation.
/**
 * Parse a user message to extract intent and entities using Claude Haiku.
 *
 * Confidence levels drive downstream behavior:
 * - HIGH (>=0.85): command executes immediately
 * - MEDIUM (>=0.60): command executes with a confirmation hint appended
 * - LOW (<0.60): routed to the UNKNOWN handler for clarification
 *
 * If the Haiku call fails (network error, timeout, malformed response),
 * falls back to a regex-based parser that covers common patterns but
 * always returns LOW confidence.
 */
export async function parseMessage(text: string, context: NlpContext): Promise<ParseResult> {
  const startTime = Date.now();

  try {
    const systemPrompt = buildClassifyPrompt(context);

    const response = await anthropic.messages.create({
      model: NLP_MODEL,
      max_tokens: NLP_MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: 'user', content: text }],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const parsed = JSON.parse(content.text) as { intent: string; entities: Record<string, string>; confidence: number };

    const intent = Object.values(Intent).includes(parsed.intent as Intent)
      ? (parsed.intent as Intent)
      : Intent.UNKNOWN;

    const entities: Entities = {
      taskName: parsed.entities.task_name,
      assigneeName: parsed.entities.assignee_name,
      dueDate: parsed.entities.due_date,
      priority: parsed.entities.priority as Entities['priority'],
      projectName: parsed.entities.project_name,
      noteContent: parsed.entities.note_content,
      blockReason: parsed.entities.block_reason,
    };

    const result: ParseResult = { intent, entities, confidence: parsed.confidence };

    logger.debug({
      duration: Date.now() - startTime,
      intent: result.intent,
      confidence: result.confidence,
    }, 'Message parsed');

    return result;
  } catch (err) {
    logger.error({ err, duration: Date.now() - startTime }, 'NLP parsing failed, using fallback');
    return fallbackParse(text);
  }
}

/** Check if confidence warrants direct execution */
export function shouldExecuteDirectly(confidence: number): boolean {
  return confidence >= CONFIDENCE.HIGH;
}

/** Check if confidence warrants execution with confirmation */
export function shouldConfirm(confidence: number): boolean {
  return confidence >= CONFIDENCE.MEDIUM && confidence < CONFIDENCE.HIGH;
}
