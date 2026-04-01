import type { TaskPriority } from '../types/task';
import type { ActivityItem } from '../data/mock-analytics';

export type SideEffect =
  | { type: 'create_task'; title: string }
  | { type: 'complete_task'; title: string }
  | { type: 'update_progress' }
  | { type: 'add_activity'; text: string }
  | { type: 'assign_task'; taskTitle: string; assigneeName: string }
  | { type: 'set_priority'; taskTitle: string; priority: TaskPriority }
  | { type: 'block_task'; taskTitle: string; reason: string }
  | { type: 'add_note'; taskTitle: string; note: string }
  | { type: 'confetti' };

interface ResponseResult {
  text: string;
  quickReplies?: string[];
  sideEffects?: SideEffect[];
}

interface ResponseMatch {
  pattern: RegExp;
  getResponse: (match: RegExpMatchArray) => ResponseResult;
}

const responseMatches: ResponseMatch[] = [
  // Greeting
  {
    pattern: /^(hi|hey|hello|sup|yo|hiya|good morning|good afternoon)/i,
    getResponse: () => ({
      text: "Hey there! \uD83D\uDC4B I'm WAPA, your project assistant. What can I help you with today?",
      quickReplies: ['My tasks', 'Sprint status', 'Add a task', 'Help'],
    }),
  },

  // Add task
  {
    pattern: /add task[:\s]+(.+)/i,
    getResponse: (match) => {
      const title = match[1].trim();
      return {
        text: `\u2705 Task created \u2014 *${title}*\nPriority: Medium | Added to Sprint 4\n\nWho should I assign it to?`,
        quickReplies: ['Alex', 'Maya', 'Jordan', 'Sam', 'Riley', 'Skip'],
        sideEffects: [
          { type: 'create_task', title },
          { type: 'add_activity', text: `New task created: "${title}"` },
        ],
      };
    },
  },

  // Show tasks / what's on my plate
  {
    pattern: /(what'?s on my plate|my tasks|show tasks|show my tasks)/i,
    getResponse: () => ({
      text: "Here's what you've got:\n\n1. \uD83D\uDD04 *Build contact form with validation* \u2014 due Apr 2\n2. \uD83D\uDD04 *SEO meta tags and sitemap* \u2014 due Apr 3\n3. \u2B1C *Write E2E tests for checkout* \u2014 due Apr 6\n4. \u2B1C *Accessibility audit (WCAG 2.1)* \u2014 due Apr 7\n\nAnything you want to update?",
      quickReplies: ['Mark one as done', 'Add a task', 'Sprint status'],
    }),
  },

  // Sprint / status / progress
  {
    pattern: /(sprint|status|progress|how.*sprint|how.*going)/i,
    getResponse: () => ({
      text: "Sprint 4 progress \uD83D\uDD25\n\n\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591 33%\n\n\u2705 Done: 4 | \uD83D\uDD04 In progress: 3 | \u2B1C Todo: 3 | \uD83D\uDEAB Blocked: 2\n\n5 days left \u2014 let's keep pushing!",
      quickReplies: ['Show blocked', 'My tasks', 'Add a task'],
      sideEffects: [{ type: 'update_progress' }],
    }),
  },

  // Complete / done
  {
    pattern: /done (?:with )?(.+)/i,
    getResponse: (match) => {
      const title = match[1].trim();
      return {
        text: `\uD83C\uDF89 Nice work! Marking *${title}* as complete.\n\nYou're on fire \u2014 keep it up!`,
        quickReplies: ['Sprint status', 'My tasks', 'Add a task'],
        sideEffects: [
          { type: 'complete_task', title },
          { type: 'add_activity', text: `Task completed: "${title}"` },
          { type: 'update_progress' },
        ],
      };
    },
  },

  // Assign
  {
    pattern: /assign (.+) to (.+)/i,
    getResponse: (match) => {
      const taskTitle = match[1].trim();
      const assigneeName = match[2].trim();
      return {
        text: `\uD83D\uDC4D Done \u2014 *${taskTitle}* is now assigned to ${assigneeName}.\n\nI'll let them know!`,
        quickReplies: ['My tasks', 'Sprint status'],
        sideEffects: [
          { type: 'assign_task', taskTitle, assigneeName },
          {
            type: 'add_activity',
            text: `${assigneeName} was assigned "${taskTitle}"`,
          },
        ],
      };
    },
  },

  // Set priority
  {
    pattern: /(.+) is (urgent|high|low|medium) priority/i,
    getResponse: (match) => {
      const taskTitle = match[1].trim();
      const priority = match[2].toLowerCase() as TaskPriority;
      const emoji =
        priority === 'urgent'
          ? '\uD83D\uDD34'
          : priority === 'high'
            ? '\uD83D\uDFE0'
            : priority === 'low'
              ? '\uD83D\uDFE2'
              : '\uD83D\uDFE1';
      return {
        text: `${emoji} Updated \u2014 *${taskTitle}* is now ${priority} priority.`,
        quickReplies: ['My tasks', 'Sprint status'],
        sideEffects: [
          { type: 'set_priority', taskTitle, priority },
          {
            type: 'add_activity',
            text: `Priority changed on "${taskTitle}" to ${priority}`,
          },
        ],
      };
    },
  },

  // Add note
  {
    pattern: /note(?:\s+on\s+.+)?[:\s]+(.+)/i,
    getResponse: (match) => {
      const noteContent = match[1].trim();
      return {
        text: `\uD83D\uDCDD Note added: "${noteContent}"\n\nAnything else?`,
        quickReplies: ['My tasks', 'Sprint status'],
        sideEffects: [
          { type: 'add_note', taskTitle: '', note: noteContent },
          { type: 'add_activity', text: `Note added: "${noteContent}"` },
        ],
      };
    },
  },

  // Block task
  {
    pattern: /(.+) is blocked(?: by (.+))?/i,
    getResponse: (match) => {
      const taskTitle = match[1].trim();
      const reason = match[2]?.trim() ?? 'No reason provided';
      return {
        text: `\uD83D\uDEAB Marked *${taskTitle}* as blocked.\nReason: ${reason}\n\nI'll flag this for the team.`,
        quickReplies: ['Sprint status', 'My tasks'],
        sideEffects: [
          { type: 'block_task', taskTitle, reason },
          {
            type: 'add_activity',
            text: `"${taskTitle}" blocked: ${reason}`,
          },
        ],
      };
    },
  },

  // Help
  {
    pattern: /^help$/i,
    getResponse: () => ({
      text: "Here's what I can do:\n\n\u2022 *add task: [title]* \u2014 create a new task\n\u2022 *my tasks* \u2014 see your assignments\n\u2022 *sprint status* \u2014 check progress\n\u2022 *done [task]* \u2014 mark a task complete\n\u2022 *assign [task] to [person]* \u2014 assign work\n\u2022 *[task] is urgent priority* \u2014 set priority\n\u2022 *note: [text]* \u2014 add a note\n\u2022 *[task] is blocked* \u2014 flag a blocker\n\nJust type naturally \u2014 I'll figure it out! \uD83D\uDE04",
      quickReplies: ['My tasks', 'Sprint status', 'Add a task'],
    }),
  },
];

/**
 * Match user input against known patterns and return a response.
 * Falls back to a friendly default if nothing matches.
 */
export function generateResponse(input: string): ResponseResult {
  const trimmed = input.trim();

  for (const { pattern, getResponse } of responseMatches) {
    const match = trimmed.match(pattern);
    if (match) {
      return getResponse(match);
    }
  }

  // Default catch-all
  return {
    text: `I'm not sure I follow \u2014 but I'm here to help! \uD83D\uDE04\n\nTry saying things like:\n\u2022 "add task: Fix login bug"\n\u2022 "my tasks"\n\u2022 "sprint status"\n\nOr type *help* for the full list.`,
    quickReplies: ['Help', 'My tasks', 'Sprint status'],
  };
}

/**
 * Create an ActivityItem from a side effect text.
 */
export function createActivityFromEffect(
  text: string,
  userId: string
): ActivityItem {
  return {
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text,
    timestamp: new Date().toISOString(),
    type: 'task_created',
    userId,
  };
}
