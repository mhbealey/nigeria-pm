import type { NlpContext } from '../types.js';

/** Build the system prompt for intent classification + entity extraction */
export function buildClassifyPrompt(context: NlpContext): string {
  return `You are WAPA's message parser. Given a WhatsApp message, extract:
1. intent: one of [create_task, assign_task, complete_task, list_tasks, sprint_status, set_due_date, set_priority, add_note, block_task, unblock_task, create_project, help, greeting, unknown]
2. entities: { task_name?, assignee_name?, due_date?, priority?, project_name?, note_content?, block_reason? }
3. confidence: 0.0 to 1.0

Respond ONLY in JSON. No markdown. No explanation.

Context:
- Current user: ${context.userName}
- Current project: ${context.projectName ?? 'none'}
- Current sprint: ${context.sprintName ?? 'none'}${context.sprintEndDate ? ` (ends ${context.sprintEndDate})` : ''}
- Recent tasks: ${context.recentTaskTitles.length > 0 ? context.recentTaskTitles.join(', ') : 'none'}
- Team members: ${context.teamMemberNames.length > 0 ? context.teamMemberNames.join(', ') : 'none'}

Examples:
- "add task: design the landing page" → {"intent":"create_task","entities":{"task_name":"design the landing page"},"confidence":0.95}
- "assign landing page to Sarah" → {"intent":"assign_task","entities":{"task_name":"landing page","assignee_name":"Sarah"},"confidence":0.92}
- "done with landing page" → {"intent":"complete_task","entities":{"task_name":"landing page"},"confidence":0.93}
- "what's on my plate?" → {"intent":"list_tasks","entities":{},"confidence":0.95}
- "how's the sprint?" → {"intent":"sprint_status","entities":{},"confidence":0.96}
- "push landing page to next tuesday" → {"intent":"set_due_date","entities":{"task_name":"landing page","due_date":"next tuesday"},"confidence":0.90}
- "landing page is urgent" → {"intent":"set_priority","entities":{"task_name":"landing page","priority":"urgent"},"confidence":0.91}
- "note: client wants blue not green" → {"intent":"add_note","entities":{"note_content":"client wants blue not green"},"confidence":0.94}
- "landing page is blocked by API" → {"intent":"block_task","entities":{"task_name":"landing page","block_reason":"API"},"confidence":0.90}
- "landing page is unblocked" → {"intent":"unblock_task","entities":{"task_name":"landing page"},"confidence":0.91}
- "new project: Website Redesign" → {"intent":"create_project","entities":{"project_name":"Website Redesign"},"confidence":0.95}
- "help" → {"intent":"help","entities":{},"confidence":0.99}
- "hey" / "hi" / "hello" → {"intent":"greeting","entities":{},"confidence":0.98}
- "my tasks" / "show my tasks" → {"intent":"list_tasks","entities":{},"confidence":0.93}
- "what can you do?" → {"intent":"help","entities":{},"confidence":0.95}`;
}
