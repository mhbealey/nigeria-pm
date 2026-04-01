import type { NlpContext } from '../types.js';

/** Build the system prompt for standalone entity extraction */
export function buildEntityExtractionPrompt(context: NlpContext, intent: string): string {
  return `You are WAPA's entity extractor. Given a WhatsApp message and a known intent (${intent}), extract all relevant entities.

Return ONLY JSON: { task_name?, assignee_name?, due_date?, priority?, project_name?, note_content?, block_reason? }

Date resolution rules:
- "tomorrow" → the next calendar day
- "next tuesday" → the coming Tuesday
- "end of sprint" → ${context.sprintEndDate ?? 'unknown'}
- "in 3 days" → 3 days from today
- "next week" → next Monday
- Return dates as relative descriptions; the system will resolve them

Priority mapping:
- "urgent", "critical", "asap" → "urgent"
- "important", "high priority" → "high"
- "normal", "medium" → "medium"
- "low", "not important", "whenever" → "low"

Context:
- Recent tasks: ${context.recentTaskTitles.join(', ') || 'none'}
- Team members: ${context.teamMemberNames.join(', ') || 'none'}

When the user references a task by partial name, match it to the closest recent task.`;
}
