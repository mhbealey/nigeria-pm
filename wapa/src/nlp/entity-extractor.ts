import { anthropic, NLP_MODEL } from '../config/anthropic.js';
import { buildEntityExtractionPrompt } from './prompts/extract-entities.js';
import { logger } from '../utils/logger.js';
import type { Entities, NlpContext } from './types.js';

/** Extract entities from a message when intent is already known */
export async function extractEntities(text: string, intent: string, context: NlpContext): Promise<Entities> {
  try {
    const systemPrompt = buildEntityExtractionPrompt(context, intent);

    const response = await anthropic.messages.create({
      model: NLP_MODEL,
      max_tokens: 256,
      system: systemPrompt,
      messages: [{ role: 'user', content: text }],
    });

    const content = response.content[0];
    if (content.type !== 'text') return {};

    const parsed = JSON.parse(content.text);
    return {
      taskName: parsed.task_name,
      assigneeName: parsed.assignee_name,
      dueDate: parsed.due_date,
      priority: parsed.priority,
      projectName: parsed.project_name,
      noteContent: parsed.note_content,
      blockReason: parsed.block_reason,
    };
  } catch (err) {
    logger.error({ err }, 'Entity extraction failed');
    return {};
  }
}

/** Fuzzy match a task name against a list of known task titles */
export function fuzzyMatchTask(input: string, taskTitles: string[]): string | null {
  if (taskTitles.length === 0) return null;

  const inputLower = input.toLowerCase();
  const inputTokens = new Set(inputLower.split(/\s+/));

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const title of taskTitles) {
    const titleLower = title.toLowerCase();

    // Exact substring match
    if (titleLower.includes(inputLower) || inputLower.includes(titleLower)) {
      return title;
    }

    // Token overlap scoring
    const titleTokens = new Set(titleLower.split(/\s+/));
    let overlap = 0;
    for (const token of inputTokens) {
      if (titleTokens.has(token)) overlap++;
      else {
        // Partial token match
        for (const tToken of titleTokens) {
          if (tToken.includes(token) || token.includes(tToken)) {
            overlap += 0.5;
            break;
          }
        }
      }
    }

    const score = overlap / Math.max(inputTokens.size, titleTokens.size);
    if (score > bestScore && score > 0.3) {
      bestScore = score;
      bestMatch = title;
    }
  }

  // Levenshtein for close matches
  if (!bestMatch) {
    let bestDist = Infinity;
    for (const title of taskTitles) {
      const dist = levenshtein(inputLower, title.toLowerCase());
      const threshold = Math.max(inputLower.length, title.length) * 0.4;
      if (dist < threshold && dist < bestDist) {
        bestDist = dist;
        bestMatch = title;
      }
    }
  }

  return bestMatch;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= a.length; i++) matrix[i] = [i];
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}
