import { Intent, type ParseResult } from './types.js';

/** Regex-based fallback parser for when LLM is unavailable */
export function fallbackParse(text: string): ParseResult {
  const lower = text.toLowerCase().trim();

  // Create task
  if (/^(add|create|new)\s+task[:\s]/i.test(lower)) {
    const taskName = text.replace(/^(add|create|new)\s+task[:\s]*/i, '').trim();
    return { intent: Intent.CREATE_TASK, entities: { taskName }, confidence: 0.80 };
  }

  // Assign task
  if (/^assign\s+/i.test(lower)) {
    const match = text.match(/^assign\s+(.+?)\s+to\s+@?(\w+)/i);
    if (match) {
      return { intent: Intent.ASSIGN_TASK, entities: { taskName: match[1], assigneeName: match[2] }, confidence: 0.80 };
    }
  }

  // Complete task
  if (/^(done|complete|finished|close)\s+(with\s+)?/i.test(lower)) {
    const taskName = text.replace(/^(done|complete|finished|close)\s+(with\s+)?/i, '').trim();
    return { intent: Intent.COMPLETE_TASK, entities: { taskName }, confidence: 0.80 };
  }

  // List tasks
  if (/^(my tasks|what'?s on my plate|show tasks|list tasks|tasks)/i.test(lower)) {
    return { intent: Intent.LIST_TASKS, entities: {}, confidence: 0.85 };
  }

  // Sprint status
  if (/^(how'?s the sprint|sprint status|sprint progress|sprint)/i.test(lower)) {
    return { intent: Intent.SPRINT_STATUS, entities: {}, confidence: 0.85 };
  }

  // Set priority
  if (/\b(urgent|critical|high priority|low priority)\b/i.test(lower)) {
    const priorityMap: Record<string, 'urgent' | 'high' | 'low'> = {
      urgent: 'urgent', critical: 'urgent', 'high priority': 'high', 'low priority': 'low',
    };
    for (const [keyword, priority] of Object.entries(priorityMap)) {
      if (lower.includes(keyword)) {
        const taskName = text.replace(new RegExp(`\\b${keyword}\\b`, 'i'), '').replace(/\bis\b/i, '').trim();
        return { intent: Intent.SET_PRIORITY, entities: { taskName, priority }, confidence: 0.75 };
      }
    }
  }

  // Block task
  if (/\bblocked\b/i.test(lower) && !/\bunblock/i.test(lower)) {
    const match = text.match(/(.+?)\s+is\s+blocked/i);
    return { intent: Intent.BLOCK_TASK, entities: { taskName: match?.[1]?.trim() }, confidence: 0.75 };
  }

  // Unblock task
  if (/\bunblock/i.test(lower)) {
    const match = text.match(/(?:unblock\s+)?(.+?)(?:\s+is)?\s*unblocked?/i);
    return { intent: Intent.UNBLOCK_TASK, entities: { taskName: match?.[1]?.trim() }, confidence: 0.75 };
  }

  // Add note
  if (/^note[:\s]/i.test(lower)) {
    const noteContent = text.replace(/^note[:\s]*/i, '').trim();
    return { intent: Intent.ADD_NOTE, entities: { noteContent }, confidence: 0.80 };
  }

  // Create project
  if (/^new project[:\s]/i.test(lower)) {
    const projectName = text.replace(/^new project[:\s]*/i, '').trim();
    return { intent: Intent.CREATE_PROJECT, entities: { projectName }, confidence: 0.80 };
  }

  // Help
  if (/^(help|what can you do|commands|how does this work)/i.test(lower)) {
    return { intent: Intent.HELP, entities: {}, confidence: 0.95 };
  }

  // Greeting
  if (/^(hey|hi|hello|yo|sup|what'?s up|good morning|good afternoon|good evening)/i.test(lower)) {
    return { intent: Intent.GREETING, entities: {}, confidence: 0.90 };
  }

  return { intent: Intent.UNKNOWN, entities: {}, confidence: 0.0 };
}
