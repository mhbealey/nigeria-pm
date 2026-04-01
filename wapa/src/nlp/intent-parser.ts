import { anthropic, NLP_MODEL } from '../config/anthropic.js';
import { buildClassifyPrompt } from './prompts/classify-intent.js';
import { logger } from '../utils/logger.js';
import { Intent, type ParseResult, type NlpContext, type Entities, CONFIDENCE } from './types.js';
import { fallbackParse } from './fallback-parser.js';

/** Parse a user message to extract intent and entities using Claude Haiku */
export async function parseMessage(text: string, context: NlpContext): Promise<ParseResult> {
  const startTime = Date.now();

  try {
    const systemPrompt = buildClassifyPrompt(context);

    const response = await anthropic.messages.create({
      model: NLP_MODEL,
      max_tokens: 256,
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
